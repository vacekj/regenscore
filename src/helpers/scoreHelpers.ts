import { Address } from 'viem';
import {
  // handleERC20Transactions,
  // handleERC721Transactions,
  // handleNormalTransactions,
  handleGRDonations,
  handleTokenBalances,
  handleEthStaker,
  handleOPBridge,
  handleOPTreasuryPayouts,
  handleDelegate,
  handleTxsMadeOnOptimism,
  handleOPContractsInteractions,
  handleSafeOwnershipAndActivity,
  handleOPAirdropReceiver,
  handleGitcoinProjectOwner,
  handleGitcoinPassport,
  handleRegenPOAPs,
  handleTrustedSeedMember,
  handleGivethActivity,
} from './sourceHandlers';
import { CATEGORIES } from '@/constants';

export async function createScore(
  address: Address,
): Promise<{ score: number; meta: any }> {
  let score = 0;
  const meta = {
    // normalTransactions: null,
    // erc20Transactions: null,
    // erc721Transactions:null,
    opAirdrop: {
      source: 'Optimism',
      category: CATEGORIES.Contributor,
      behavior: 'Received OP Airdrop',
    },
    tokenBalances: {
      tokens: [],
      category: CATEGORIES.Outreach,
    },
    txsMadeOnOptimism: {
      source: 'Optimism',
      category: CATEGORIES.Utilization,
      behavior: 'Made transactions on the Optimism network',
    },
    grDonations: {
      source: 'Gitcoin',
      category: CATEGORIES.Outreach,
      behavior: 'Donated on Gitcoin Grants',
    },
    ethDeposits: {
      source: 'Mainnet',
      category: CATEGORIES.Security,
      behavior: 'Staked ETH',
    },
    optimismBridges: {
      source: 'Optimism',
      category: CATEGORIES.Utilization,
      behavior: 'Bridged Ethereum Mainnet to Optimism',
    },
    opTreasuryPayouts: {
      source: 'Optimism',
      category: CATEGORIES.Contributor,
      behavior: 'Got paid from the Optimism Treasury',
    },
    optimismDelegate: {
      source: 'Optimism',
      category: CATEGORIES.Governance,
      behavior: 'Is an Optimism Delegate',
    },
    optimismTxHistory: {
      source: 'Optimism',
      category: CATEGORIES.Utilization,
      behavior: 'Made transactions on the Optimism network',
    },
    safeOwnerActivity: {
      source: 'Gnosis Safe',
      category: CATEGORIES.Utilization,
      behavior: 'Interacted with a Gnosis Safe',
    },
    gitcoinProjectOwner: {
      source: 'Gitcoin',
      category: CATEGORIES.Outreach,
      behavior: 'Owns a project in Gitcoin',
    },
    gitcoinPassport: {
      source: 'Gitcoin',
      category: CATEGORIES.Outreach,
      behavior: 'Owns a Gitcoin Passport',
    },
    regenPOAPs: {
      source: 'Mainnet',
      category: CATEGORIES.Outreach,
      behavior: 'Assisted to regen events and got a POAP',
    },
    trustedSeedMember: {
      source: 'Trusted Seed',
      category: CATEGORIES.Outreach,
      behavior: 'Is a Trusted Seed Member',
    },
    givethActivity: {
      source: 'Giveth',
      category: CATEGORIES.Outreach,
      behavior: 'Giveth project owner and/or contributor',
    },
  };
  const results = await Promise.all([
    handleTokenBalances(address, meta), // points depend on the token hold
    // handleNormalTransactions(address, meta),
    // handleERC20Transactions(address, meta),
    // handleERC721Transactions(address, meta),
    handleGRDonations(address, meta, 100), // TODO: gotta modify this
    handleEthStaker(address, meta, 500),
    handleOPBridge(address, meta, 300),
    handleOPTreasuryPayouts(address, meta, 400),
    handleDelegate(address, meta, 500),
    handleTxsMadeOnOptimism(address, meta, 100),
    handleOPContractsInteractions(address, meta), // 200 for interaction, 500 for deployment
    handleSafeOwnershipAndActivity(address, meta), // 500 on execution, 400 for owner, 500 for being on OP treasury
    handleOPAirdropReceiver(address, meta),
    handleGitcoinProjectOwner(address, meta, 200),
    handleGitcoinPassport(address, meta, 300),
    handleRegenPOAPs(address, meta, 20),
    handleTrustedSeedMember(address, meta, 200),
    handleGivethActivity(address, meta),
  ]);
  score += results.reduce((acc, current) => acc + current, 0);
  return { score, meta };
}
