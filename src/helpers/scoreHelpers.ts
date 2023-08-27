import { formatEther, parseUnits, getAddress } from 'viem';
import {
  handleERC20Transactions,
  handleERC721Transactions,
  handleGRDonations,
  handleNormalTransactions,
  handleTokenBalances,
} from './sourceHandlers';
import { getAdressesAirdroppedOP, getAddressesPaidByOpTreasury } from '@/api';

export async function createScore(
  address: string
): Promise<{ score: number; debug: any }> {
  const opAirdropAddresses = await getAdressesAirdroppedOP();
  const treasuryTxs = await getAddressesPaidByOpTreasury();
  address = getAddress(address);
  let score = 0;

  if (opAirdropAddresses[0].includes(address)) score += 100;
  if (opAirdropAddresses[1].includes(address)) score += 50;

  const treasuryPayouts = treasuryTxs
    // tODO: FIX TYPE
    .filter((tx: any) => tx.to === address)
    .map((tx: any) =>
      Number(formatEther(parseUnits(tx.value, parseInt(tx.tokenDecimal))))
    )
    .reduce((acc: any, a: any) => acc + a, 0);
  score += treasuryPayouts;

  const debug = {
    normalTransactions: [],
    erc20Transactions: [],
    erc721Transactions: [],
    tokenBalances: [],
    grDonations: [],
  };

  score += await handleNormalTransactions(address, debug);
  score += await handleERC20Transactions(address, debug);
  score += await handleERC721Transactions(address, debug);
  score += await handleTokenBalances(address, debug);
  score += await handleGRDonations(address, debug);

  return { score, debug };
}
