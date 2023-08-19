import { createScore } from "@/pages/api/score";
import { parse } from "csv-parse";
import { stringify } from "csv-stringify/sync";
import fs from "fs";

import { getAddressesPaidByOpTreasury, getAdressesAirdroppedOP } from "@/api";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { isAddress } from "viem";
const __dirname = dirname(fileURLToPath(import.meta.url));

const processFile = async () => {
  const opAirdropAddresses = await getAdressesAirdroppedOP();
  const treasuryAddresses = await getAddressesPaidByOpTreasury();
  console.log(treasuryAddresses.length);
  const records = [];
  const parser = fs
    .createReadStream(`${__dirname}/../data/delegates.csv`)
    .pipe(parse({}));
  for await (const record of parser) {
    const address = record[0];
    if (!isAddress(address)) {
      console.warn("Not an address", address);
      continue;
    }
    const score = await createScore(address, opAirdropAddresses, treasuryAddresses);
    console.log(record[0], score.score);
    records.push([...record, score.score]);
  }
  return records;
};

(async () => {
  const records = await processFile();
  const csvText = stringify(records);
  fs.writeFileSync("./delegates_with_score.csv", csvText);
})();
