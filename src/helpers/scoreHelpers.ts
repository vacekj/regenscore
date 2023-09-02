import { formatEther, parseUnits, getAddress } from 'viem';
import {
  handleERC20Transactions,
  handleERC721Transactions,
  handleGRDonations,
  handleNormalTransactions,
  handleTokenBalances,
  handleEthStaker,
  handleOPTreasuryPayouts,
  handleDelegate,
} from './sourceHandlers';
import { getAdressesAirdroppedOP, getAddressesPaidByOpTreasury } from '@/api';

export async function createScore(
  address: string,
): Promise<{ score: number; debug: any }> {
  const opAirdropAddresses = await getAdressesAirdroppedOP();
  const treasuryTxs = await getAddressesPaidByOpTreasury();
  address = getAddress(address);
  let score = 0;

  if (opAirdropAddresses[0].includes(address)) score += 100;
  if (opAirdropAddresses[1].includes(address)) score += 50;

  // const treasuryPayouts = treasuryTxs
  //   // tODO: FIX TYPE
  //   .filter((tx: any) => tx.to === address)
  //   .map((tx: any) =>
  //     Number(formatEther(parseUnits(tx.value, parseInt(tx.tokenDecimal))))
  //   )
  //   .reduce((acc: any, a: any) => acc + a, 0);
  // score += treasuryPayouts;

  const debug = {
    normalTransactions: [],
    erc20Transactions: [],
    erc721Transactions: [],
    tokenBalances: [],
    grDonations: [],
    ethDeposits: [],
    opTreasuryPayouts: [],
  };
  const results = await Promise.all([
    handleTokenBalances(address, debug),
    // handleNormalTransactions(address, debug),
    // handleERC20Transactions(address, debug),
    // handleERC721Transactions(address, debug),
    handleGRDonations(address, debug),
    handleEthStaker(address, debug),
    handleOPTreasuryPayouts(address, debug),
    handleDelegate(address, debug),
  ]);

  score += results.reduce((acc, current) => acc + current, 0);

  return { score, debug };
}
