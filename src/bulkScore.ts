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
      meta.opAirdrop?.value || 'false',
      meta.tokenBalances.tokens.find((tb: any) => tb.name === 'GIV')?.value ||
        'false',
      meta.tokenBalances.tokens.find((tb: any) => tb.name === 'OP')?.value ||
        'false',
      meta.grDonations?.value || 0,
      meta.ethDeposits?.value || 'false',
      meta.optimismBridges?.value || 0,
      meta.opTreasuryPayouts?.value || 0,
      meta.optimismDelegate?.value || 0,
      meta.optimismTxHistory?.interactedWithContracts || 'false',
      meta.optimismTxHistory?.createdGnosisSafe || 'false',
      meta.safeOwnerActivity?.ownsSafe || 'false',
      meta.safeOwnerActivity?.hasExecutedTransaction || 'false',
      meta.safeOwnerActivity?.belongsToTreasury || 'false',
      meta.gitcoinProjectOwner?.isProjectOwner || 'false',
      meta.gitcoinPassport?.value || 'false',
      meta.regenPOAPs?.value || 'false',
      meta.txsMadeOnOptimism?.value || 'false',
      meta.trustedSeedMember?.value || 'false',
      meta.givethActivity?.value || 'false',
      score,
    ];
    records.push(row);
  }
  return records;
};

(async () => {
  const records = await processFile();
  const csvText = stringify(records);
  fs.writeFileSync('./op_population.csv', csvText);
})();
