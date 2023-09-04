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
      'OptimismBridges',
      'OpTreasuryPayouts',
      'IsOptimismDelegate',
      'InteractedWithContracts',
      'CreatedGnosisSafe',
      'OwnsGnosisSafe',
      'ExecutedGnosisTx',
      'IsGitcoinProjectOwner',
      'GitcoinPassportScore',
      'RegenPOAPs',
      'OptimismTxCount',
      'TotalScore',
    ],
  ];
  const parser = fs
    .createReadStream(`${__dirname}/../public/data/delegates.csv`)
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
      meta.opAirdrop?.scoreAdded || 0,
      meta.tokenBalances.tokens.find((tb: any) => tb.name === 'GIV')
        ?.scoreAdded || 0,
      meta.tokenBalances.tokens.find((tb: any) => tb.name === 'OP')
        ?.scoreAdded || 0,
      meta.ethDeposits?.scoreAdded || 0,
      meta.optimismBridges?.scoreAdded || 0,
      meta.opTreasuryPayouts?.scoreAdded || 0,
      meta.optimismDelegate?.scoreAdded || 0,
      meta.optimismTxHistory?.interactedWithContracts ? 10 : 0,
      meta.optimismTxHistory?.createdGnosisSafe ? 10 : 0,
      meta.safeOwnerActivity?.ownsSafe ? 10 : 0,
      meta.safeOwnerActivity?.hasExecutedTransaction ? 10 : 0,
      meta.gitcoinProjectOwner?.isProjectOwner ? 10 : 0,
      meta.gitcoinPassport?.scoreAdded || 0,
      meta.regenPOAPs?.scoreAdded || 0,
      meta.txsMadeOnOptimism?.scoreAdded || 0,
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
