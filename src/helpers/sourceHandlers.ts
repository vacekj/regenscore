import { Address, getAddress } from 'viem';
import {
  getAdressesAirdroppedOP,
  getERC20Transactions,
  getNormalTransactions,
  getERC721Transactions,
  getTokenBalance,
  getAddressOPTxHistory,
  fetchGRDonations,
  checkSafeOwnershipAndActivity,
  hasAGitcoinProject,
  fetchGitcoinPassport,
  fetchPOAPsForAddress,
} from './sourceApi';
import {
  NormalTransaction,
  ERC20Transaction,
  GetNormalTransactionsResponse,
  GetERC20TransactionsResponse,
  GetERC721TransactionsResponse,
  POAP,
} from './sourceTypes';
import { CATEGORIES } from '@/constants';
import { getClient } from '@/utils';

import TrustedSeedMembers from '@/data/trusted_seed_members.json';

type ContractDetails = {
  name: string;
  weight: number;
  decimals?: number;
};

type ITransaction = {
  contract: string;
  name: string;
  scoreAdded: number;
};

const REGENSCORE_SQUID_OP =
  'https://squid.subsquid.io/regen-score-squid/v/v3/graphql';
const REGENSCORE_SQUID_ETH =
  'https://squid.subsquid.io/regen-score-squid-eth/v/v3/graphql';

const list_of_contracts: { [key: string]: ContractDetails } = {
  '0x900db999074d9277c5da2a43f252d74366230da0': { name: 'Giveth', weight: 1 },
  '0xD56daC73A4d6766464b38ec6D91eB45Ce7457c44': {
    name: 'Panvala',
    weight: 1,
  },
  '0x4e78011ce80ee02d2c3e649fb657e45898257815': {
    name: 'Klima DAO',
    weight: 1,
  },
  '0xb0C22d8D350C67420f06F48936654f567C73E8C8': {
    name: 'Staked Klima',
    weight: 1,
  },
  '0xDe30da39c46104798bB5aA3fe8B9e0e1F348163F': {
    name: 'Gitcoin',
    weight: 1,
  },
  '0x1Ee05530f2BEB59E7D6f2838fCc7D9c9464C253d': {
    name: 'Unknown',
    weight: 1,
  },
  '0x82C7c02a52B75387DB14FA375938496cbb984388': { name: 'EthBot', weight: 1 },
  '0x42dCbA5dA33CDDB8202CC182A443a3e7b299dADb': {
    name: 'Moloch',
    weight: 100,
  },
  '0x8b13e88EAd7EF8075b58c94a7EB18A89FD729B18': {
    name: 'MoonShotBots',
    weight: 100,
  },
  '0xf5918382Dd20Ecba89747c50f80fB7f9f1e0524C': {
    name: 'Rainbow Rolls',
    weight: 100,
  },
  '0xe785E82358879F061BC3dcAC6f0444462D4b5330': {
    name: 'World of Women',
    weight: 100,
  },
  '0x90B3832e2F2aDe2FE382a911805B6933C056D6ed': { name: 'Pooly', weight: 25 },
  '0x3545192b340F50d77403DC0A64cf2b32F03d00A9': {
    name: 'Pooly Lawyer',
    weight: 50,
  },
  '0x5663e3E096f1743e77B8F71b5DE0CF9Dfd058523': {
    name: 'Pooly Judge',
    weight: 100,
  },
  '0xC5E9dDebb09Cd64DfaCab4011A0D5cEDaf7c9BDb': {
    name: 'ProofOfHumanity',
    weight: 10,
  },
};

const list_of_balance_contract_mainnet: { [key: string]: ContractDetails } = {
  '0x900dB999074d9277c5DA2A43F252D74366230DA0': {
    name: 'GIV',
    weight: 10,
    decimals: 18,
  },
  '0xDe30da39c46104798bB5aA3fe8B9e0e1F348163F': {
    name: 'GTC',
    weight: 10,
    decimals: 18,
  },
};

const list_of_balance_contract_optimism: { [key: string]: ContractDetails } = {
  '0x528CDc92eAB044E1E39FE43B9514bfdAB4412B98': {
    name: 'GIV',
    weight: 10,
    decimals: 18,
  },
  '0x4200000000000000000000000000000000000042': {
    name: 'OP',
    weight: 10,
    decimals: 18,
  },
  // '0x68f5c0a2de713a54991e01858fd27a3832401849': {
  //   name: 'OP/WETH v3',
  //   weight: 10,
  // },
};

const REGEN_POAP_EVENT_IDS = [
  6736, 27649, 30186, 100689, 45205, 45207, 65866, 66627, 127435, 144936,
  148447, 74498, 136490, 74201, 109068, 102147, 28643, 39093, 28576, 39095,
  39096, 39097, 66020, 28689, 102289, 102175,
];

const GRAPHQL_OPTIONS = (query: string) => {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  };
};

const handleTransaction = (
  transaction: { to: string; from: string },
  metaArray: ITransaction[],
  contractsList: { [key: string]: ContractDetails },
) => {
  for (let key in contractsList) {
    if (transaction.to === key || transaction.from === key) {
      const contractDetail = contractsList[key];
      metaArray.push({
        contract: key,
        name: contractDetail.name,
        scoreAdded: contractDetail.weight,
      });
      return contractDetail.weight;
    }
  }
  return 0;
};

export async function handleNormalTransactions(
  address: string,
  meta: any,
): Promise<number> {
  let score = 0;
  try {
    const normalTransactions = (await getNormalTransactions(
      address,
    )) as GetNormalTransactionsResponse;
    normalTransactions.result.forEach((tx: NormalTransaction) => {
      score += handleTransaction(
        tx,
        meta.normalTransactions,
        list_of_contracts,
      );
    });
  } catch (error) {
    console.error('Error fetching normal transactions:', error);
  }
  return score;
}

export async function handleERC20Transactions(
  address: string,
  meta: any,
): Promise<number> {
  let score = 0;
  try {
    const erc20Transactions = (await getERC20Transactions(
      address,
    )) as GetERC20TransactionsResponse;
    erc20Transactions.result.forEach((tx: ERC20Transaction) => {
      score += handleTransaction(tx, meta.erc20Transactions, list_of_contracts);
    });
  } catch (error) {
    console.error('Error fetching ERC20 transactions:', error);
  }
  return score;
}

export async function handleERC721Transactions(
  address: string,
  meta: any,
): Promise<number> {
  let score = 0;
  try {
    const erc721Transactions = (await getERC721Transactions(
      address,
    )) as GetERC721TransactionsResponse;
    erc721Transactions.result.forEach((tx) => {
      score += handleTransaction(
        tx,
        meta.erc721Transactions,
        list_of_contracts,
      );
    });
  } catch (error) {
    console.error('Error fetching ERC721 transactions:', error);
  }
  return score;
}

export async function handleTokenBalances(
  address: string,
  meta: any,
): Promise<number> {
  let score = 0;

  for (let key in list_of_balance_contract_mainnet) {
    try {
      const token = list_of_balance_contract_mainnet[key];
      const balanceResponse = (await getTokenBalance(
        key as Address,
        getAddress(address),
        token.decimals!,
        'mainnet',
      )) as any;
      if (balanceResponse !== '0') {
        const balance = Number(balanceResponse);
        if (balance > 0) {
          const addedScore = token.weight;
          score += addedScore;
          meta.tokenBalances.tokens = [
            ...meta.tokenBalances.tokens,
            {
              contract: key,
              network: 'Mainnet',
              name: list_of_balance_contract_mainnet[key].name,
              behavior: `Holds ${token.name} tokens`,
              scoreAdded: addedScore,
              category: CATEGORIES.Outreach,
              value: balance.toFixed(2),
              applies: true,
            },
          ];
        }
      }
    } catch (error) {
      console.error(`Error fetching token balance for contract ${key}:`, error);
    }
  }
  for (let key in list_of_balance_contract_optimism) {
    try {
      const token = list_of_balance_contract_optimism[key];
      const balanceResponse = await getTokenBalance(
        key as Address,
        getAddress(address),
        token.decimals!,
        'optimism',
      );
      if (balanceResponse !== '0') {
        const balance = Number(balanceResponse);
        if (balance > 0) {
          const addedScore = token.weight;
          score += addedScore;
          meta.tokenBalances.tokens = [
            ...meta.tokenBalances.tokens,
            {
              contract: key,
              network: 'Optimism',
              behavior: `Holds ${token.name} tokens`,
              name: list_of_balance_contract_optimism[key].name,
              scoreAdded: addedScore,
              category: CATEGORIES.Outreach,
              value: balance.toFixed(2),
              applies: true,
            },
          ];
        }
      }
    } catch (error) {
      console.error(`Error fetching token balance for contract ${key}:`, error);
    }
  }

  return score;
}

export async function handleGRDonations(
  address: string,
  meta: any,
): Promise<number> {
  let scoreAdded = 0;
  try {
    const grDonations = await fetchGRDonations(address);
    if (grDonations.length > 0) {
      scoreAdded += 10;
      meta.grDonations = {
        ...meta.grDonations,
        scoreAdded,
        value: grDonations.length,
        applies: !!scoreAdded,
      };
    }
    return scoreAdded;
  } catch (error) {
    console.error('Error fetching GR donations:', error);
    return 0;
  }
}

export async function handleIsGTCHolder() {}

export async function handleEthStaker(
  address: string,
  meta: any,
  points: number,
) {
  const url = REGENSCORE_SQUID_ETH;
  const query = `
    query MyQuery {
      ethDeposits(limit: 10, where: {from_eq: "${address}"}) {
        id
        blockNumber
        from
        transactionHash
        blockTimestamp
      }
    }
  `;

  const options = GRAPHQL_OPTIONS(query);

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json();
    const ethDeposits = result?.data?.ethDeposits;
    const scoreAdded = ethDeposits?.length > 0 ? points : 0;
    meta.ethDeposits = {
      ...meta.ethDeposits,
      ethDeposits,
      scoreAdded,
      applies: !!scoreAdded,
      value: ethDeposits?.length,
    };
    return scoreAdded;
  } catch (error) {
    console.error('There was an error fetching the data:', error);
    return 0;
  }
}

export async function handleOPBridge(
  address: string,
  meta: any,
  points: number,
) {
  const url = REGENSCORE_SQUID_ETH;
  const query = `
    query MyQuery {
      bridges(limit: 10, where: {from_eq: "${address}"}) {
        id
        from
        amount
        blockNumber
        localToken
        remoteToken
        transactionHash
        to
        eventType
      }
    }
  `;

  const options = GRAPHQL_OPTIONS(query);

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json();
    const opBridges = result?.data?.bridges;
    const scoreAdded = opBridges?.length > 0 ? points : 0;
    meta.optimismBridges = {
      ...meta.optimismBridges,
      opBridges,
      scoreAdded,
      applies: !!scoreAdded,
      value: opBridges?.length,
    };
    return scoreAdded;
  } catch (error) {
    console.error('There was an error fetching the data:', error);
    return 0;
  }
}

export async function handleOPTreasuryPayouts(
  address: string,
  meta: any,
  points: number,
): Promise<number> {
  const url = REGENSCORE_SQUID_OP;
  const query = `
      query MyQuery {
          transfers(where: {to_eq: "${address}"}) {
              blockNumber
              blockTimestamp
              description
              from
              eventName
              id
              to
              transactionHash
              value
          }
      }
  `;

  const options = GRAPHQL_OPTIONS(query);

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json();
    const transfers = result?.data?.transfers;
    const scoreAdded = transfers?.length > 0 ? points : 0;

    meta.opTreasuryPayouts = {
      ...meta.opTreasuryPayouts,
      transfers,
      scoreAdded,
      applies: !!scoreAdded,
      value: transfers?.length,
    };

    return scoreAdded;
  } catch (error) {
    console.error('There was an error fetching OPTreasuryPayouts:', error);
    return 0;
  }
}

export async function handleDelegate(
  address: string,
  meta: any,
  points: number,
) {
  const url = REGENSCORE_SQUID_OP;
  const query = `
      query MyQuery {
          delegates(where: {address_eq: "${address}"}) {
              id
              balance
              address
          }
      }
  `;

  const options = GRAPHQL_OPTIONS(query);

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json();
    const delegates = result?.data?.delegates;
    const isDelegate = delegates?.length > 0;
    const scoreAdded = isDelegate ? points : 0;
    meta.optimismDelegate = {
      ...meta.optimismDelegate,
      isDelegate,
      scoreAdded,
      value: !!isDelegate,
    };
    return scoreAdded;
  } catch (error) {
    console.error('There was an error fetching delegate data:', error);
    return 0;
  }
}

export async function handleTxsMadeOnOptimism(
  address: string,
  meta: any,
  points: number,
) {
  const client = await getClient('optimism');
  const transactionCount = await client.getTransactionCount({
    address: address as Address,
  });
  const scoreAdded = transactionCount > 0 ? points : 0;
  meta.txsMadeOnOptimism = {
    ...meta.txsMadeOnOptimism,
    scoreAdded,
    transactionCount,
    applies: !!scoreAdded,
    value: transactionCount,
  };
  return scoreAdded;
}

export async function handleOPContractsInteractions(
  address: string,
  meta: any,
  points: number,
) {
  const { interactedWithContracts, deployedContracts, createdGnosisSafe } =
    await getAddressOPTxHistory(address);
  let scoreAdded = 0;
  if (interactedWithContracts) scoreAdded += points;
  if (deployedContracts) scoreAdded += points;
  // if (createdGnosisSafe) scoreAdded += 10; // Commented as it's being checked in handleSafeOwnershipAndActivity
  meta.optimismTxHistory = {
    ...meta.optimismTxHistory,
    interactedWithContracts,
    deployedContracts,
    createdGnosisSafe,
    scoreAdded,
    applies: !!scoreAdded,
    value: interactedWithContracts || deployedContracts,
  };
  return scoreAdded;
}

export async function handleSafeOwnershipAndActivity(
  address: string,
  meta: any,
  points: number,
) {
  let scoreAdded = 0;
  const { ownsSafe, hasExecutedTransaction, belongsToTreasury } =
    await checkSafeOwnershipAndActivity(address);

  if (hasExecutedTransaction) scoreAdded += points;
  if (belongsToTreasury) scoreAdded += points;
  if (ownsSafe) scoreAdded += points;

  meta.safeOwnerActivity = {
    ...meta.safeOwnerActivity,
    ownsSafe: !!ownsSafe,
    hasExecutedTransaction: !!hasExecutedTransaction,
    belongsToTreasury: !!belongsToTreasury,
    scoreAdded,
    applies: !!scoreAdded,
    value: hasExecutedTransaction || ownsSafe,
  };
  return scoreAdded;
}

export async function handleOPAirdropReceiver(
  address: string,
  meta: any,
  points: number,
) {
  const opAirdropAddresses = await getAdressesAirdroppedOP();
  let score = 0;
  if (opAirdropAddresses[0].includes(address.toLowerCase())) {
    score = points;
    meta.opAirdrop = { ...meta.opAirdrop, firstDrop: true };
  }
  if (opAirdropAddresses[1].includes(address.toLowerCase())) {
    score = points;
    meta.opAirdrop = { ...meta.opAirdrop, secondDrop: true };
  }

  meta.opAirdrop = {
    ...meta.opAirdrop,
    scoreAdded: score,
    applies: !!score,
    value: !!score,
  };

  return score;
}

export async function handleGitcoinProjectOwner(address: string, meta: any) {
  let scoreAdded = 0;
  const isProjectOwner = await hasAGitcoinProject(address);
  if (isProjectOwner) scoreAdded += 10;
  meta.gitcoinProjectOwner = {
    ...meta.gitcoinProjectOwner,
    isProjectOwner,
    scoreAdded,
    applies: !!scoreAdded,
    value: isProjectOwner,
  };
  return scoreAdded;
}

export async function handleGitcoinPassport(
  address: string,
  meta: any,
  points: number,
) {
  let scoreAdded = 0;
  const gitcoinPassport = await fetchGitcoinPassport(getAddress(address));
  if (gitcoinPassport.score > 0) scoreAdded += points;
  meta.gitcoinPassport = {
    ...meta.gitcoinPassport,
    passport: gitcoinPassport,
    scoreAdded,
    applies: !!scoreAdded,
    value: isNaN(gitcoinPassport.score)
      ? 'false'
      : parseFloat(gitcoinPassport.score).toFixed(2),
  };
  return scoreAdded;
}

export async function handleRegenPOAPs(
  address: string,
  meta: any,
  points: number,
) {
  let scoreAdded = 0;
  try {
    const poaps = await fetchPOAPsForAddress(address);
    const matchingRegenPOAPs = poaps.filter((poap: POAP) =>
      REGEN_POAP_EVENT_IDS.includes(poap.event.id),
    );
    const hasRegenPOAP = matchingRegenPOAPs.length > 0;
    if (hasRegenPOAP) scoreAdded += points * matchingRegenPOAPs.length;

    meta.regenPOAPs = {
      ...meta.regenPOAPs,
      poaps: matchingRegenPOAPs,
      hasRegenPOAP,
      scoreAdded,
      applies: !!scoreAdded,
      value: matchingRegenPOAPs.length,
    };

    return scoreAdded;
  } catch (error) {
    console.log({ error });
    return scoreAdded;
  }
}

export async function handleGivethActivity(address: string, meta: any) {
  let scoreAdded = 0;
  const query = `
    query {
      walletAddressUsed(address: "${address}")
    }
  `;

  try {
    const response = await fetch('https://mainnet.serve.giveth.io/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    console.log({ result });
    return scoreAdded;
  } catch (error) {
    console.error('Error fetching wallet address usage:', error);
    return false;
  }
}

export async function handleTrustedSeedMember(
  address: string,
  meta: any,
  points: number,
) {
  let scoreAdded = 0;
  const addressInfo = TrustedSeedMembers.find(
    (item) => item.address.toLowerCase() === address.toLowerCase(),
  );
  if (
    addressInfo &&
    (!!addressInfo.onChainScore || !!addressInfo.offChainScore)
  ) {
    scoreAdded += points;
    meta.trustedSeedMember = {
      ...meta.trustedSeedMember,
      ...addressInfo,
      scoreAdded,
      applies: !!scoreAdded,
      value: addressInfo.onChainScore || addressInfo.offChainScore,
    };
  }
  return scoreAdded;
}
