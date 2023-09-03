import { createScore } from '@/helpers/scoreHelpers';
import { parse } from 'csv-parse';
import { stringify } from 'csv-stringify/sync';
import fs from 'fs';

import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { isAddress, getAddress } from 'viem';
const __dirname = dirname(fileURLToPath(import.meta.url));

const processFile = async () => {
  const records = [
    [
      'Address',
      'opAirdropScore',
      'TokenBalanceGIV',
      'TokenBalanceOP',
      'EthDeposits',
      'OpTreasuryPayouts',
      'IsOptimismDelegate',
      'InteractedWithContracts',
      'CreatedGnosisSafe',
      'OwnsGnosisSafe',
      'ExecutedGnosisTx',
      'IsGitcoinProjectOwner',
      'GitcoinPassportScore',
      'OptimismTxCount',
      'TotalScore',
    ],
  ];
  const parser = fs
    .createReadStream(`${__dirname}/../data/delegates.csv`)
    .pipe(parse({}));

  for await (const record of parser) {
    const address = record[0];
    if (!isAddress(address)) {
      continue;
    }

    const { score, debug } = await createScore(getAddress(address));
    console.log(address, score);
    const row = [
      address,
      debug.opAirdrop?.scoreAdded || 0,
      debug.tokenBalances.find((tb: any) => tb.name === 'GIV')?.scoreAdded || 0,
      debug.tokenBalances.find((tb: any) => tb.name === 'OP')?.scoreAdded || 0,
      debug.ethDeposits?.scoreAdded || 0,
      debug.opTreasuryPayouts?.scoreAdded || 0,
      debug.optimismDelegate?.scoreAdded || 0,
      debug.optimismTxHistory?.interactedWithContracts ? 10 : 0,
      debug.optimismTxHistory?.createdGnosisSafe ? 10 : 0,
      debug.safeOwnerActivity?.ownsSafe ? 10 : 0,
      debug.safeOwnerActivity?.hasExecutedTransaction ? 10 : 0,
      debug.gitcoinProjectOwner?.isProjectOwner ? 10 : 0,
      debug.gitcoinPassport?.scoreAdded || 0,
      debug.txsMadeOnOptimism?.scoreAdded || 0,
      score,
    ];
    records.push(row);
  }
  return records;
};

(async () => {
  const records = await processFile();
  const csvText = stringify(records);
  fs.writeFileSync('./delegates_with_score.csv', csvText);
})();
