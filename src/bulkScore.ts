import { createScore } from '@/helpers/scoreHelpers';
import { parse } from 'csv-parse';
import { stringify } from 'csv-stringify/sync';
import fs from 'fs';

import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { isAddress, getAddress } from 'viem';
const __dirname = dirname(fileURLToPath(import.meta.url));

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const processFile = async () => {
  const records = [
    [
      'Address',
      'opAirdropScore',
      'TokenBalanceGIV',
      'TokenBalanceOP',
      'GRDonations',
      'EthDeposits',
      'OptimismBridges',
      'OpTreasuryPayouts',
      'IsOptimismDelegate',
      'InteractedWithContracts',
      'CreatedGnosisSafe',
      'OwnsGnosisSafe',
      'ExecutedGnosisTx',
      'isPartOfOPTreasury',
      'IsGitcoinProjectOwner',
      'GitcoinPassportScore',
      'RegenPOAPs',
      'OptimismTxCount',
      'TrustedSeedMember',
      'GivethActivity',
      'TotalScore',
    ],
  ];
  const parser = fs
    .createReadStream(`${__dirname}/../public/data/op_sample_population.csv`)
    .pipe(parse({}));

  for await (const record of parser) {
    const address = record[0];
    if (!isAddress(address)) {
      continue;
    }

    const { score, meta } = await createScore(getAddress(address));
    console.log(address, score);
    const row = [
      address,
      String(meta.opAirdrop?.value || 'false'),
      String(
        meta.tokenBalances.tokens.find((tb: any) => tb.name === 'GIV')?.value ||
          'false',
      ),
      String(
        meta.tokenBalances.tokens.find((tb: any) => tb.name === 'OP')?.value ||
          'false',
      ),
      String(meta.grDonations?.value || 0),
      String(meta.ethDeposits?.value || 'false'),
      String(meta.optimismBridges?.value || 0),
      String(meta.opTreasuryPayouts?.value || 0),
      String(meta.optimismDelegate?.value || 0),
      String(meta.optimismTxHistory?.interactedWithContracts || 'false'),
      String(meta.optimismTxHistory?.createdGnosisSafe || 'false'),
      String(meta.safeOwnerActivity?.ownsSafe || 'false'),
      String(meta.safeOwnerActivity?.hasExecutedTransaction || 'false'),
      String(meta.safeOwnerActivity?.belongsToTreasury || 'false'),
      String(meta.gitcoinProjectOwner?.isProjectOwner || 'false'),
      String(meta.regenPOAPs?.value || 'false'),
      String(meta.txsMadeOnOptimism?.value || 'false'),
      String(meta.trustedSeedMember?.value || 'false'),
      String(meta.givethActivity?.value || 'false'),
      String(score),
    ];
    records.push(row);
    await delay(2000);
  }
  return records;
};

(async () => {
  const records = await processFile();
  const csvText = stringify(records);
  fs.writeFileSync('./op_population.csv', csvText);
})();
