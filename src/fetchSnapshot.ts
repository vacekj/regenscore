import { createScore } from '@/helpers/scoreHelpers';
import { parse } from 'csv-parse';
import { stringify } from 'csv-stringify/sync';
import fs from 'fs';
import z from 'zod';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const schema = z.object({
  data: z.object({
    votes: z.array(
      z.object({
        id: z.string(),
        voter: z.string(),
        created: z.number(),
      }),
    ),
  }),
});

const processFile = async () => {
  let resultsArr = [];
  let currentTimestamp = 0;
  let stop = false;
  while (!stop) {
    const response = await fetch(`https://hub.snapshot.org/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `query Votes {
            votes (
              first: 1000, 
              where: {
                space: "opcollective.eth",
                created_gt: ${currentTimestamp}
              },
              orderBy: "created",
              orderDirection: asc
            ) {
              id
              created
              voter
            }
          }`,
      }),
    }).then((res) => res.json());

    const results = schema.parse(response);
    console.log(`Got ${results.data.votes.length} votes`);
    console.log('timestamp:', currentTimestamp);
    resultsArr.push(...results.data.votes);
    console.log(
      ...results.data.votes.map((vote) => vote.voter).filter(onlyUnique),
    );
    if (results.data.votes.length === 0) {
      stop = true;
      continue;
    }
    currentTimestamp =
      results.data.votes[results.data.votes.length - 1].created;
  }

  return resultsArr;
};

(async () => {
  const votes = await processFile();

  /* Array of unique voters */
  const voters = votes.map((vote) => vote.voter).filter(onlyUnique);

  console.log(voters); // 0xa, 0xa, 0xb

  fs.writeFileSync('./op_snapshot_voters.txt', voters.join(','));
})();

function onlyUnique(value: any, index: any, array: string | any[]) {
  return array.indexOf(value) === index;
}
