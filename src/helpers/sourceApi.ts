import { ethers } from 'ethers';
import { Address, formatUnits } from 'viem';
import { fetchRequest, getClient, loadCSV } from '@/utils';
import {
  GetERC20TransactionsResponse,
  GetNormalTransactionsResponse,
  GetERC721TransactionsResponse,
  GetTokenBalanceResponse,
  SafeInfo,
  GitcoinProject,
} from './sourceTypes';
import ERC20 from '@/abi/ERC20';

// CONSTANTS
const GICOIN_SCORER_ID = '1603'; // Giveth's ID and API
const GITCOIN_PASSPORT_SCORER_API_KEY =
  process.env.GITCOIN_PASSPORT_SCORER_API_KEY;
const GNOSIS_SAFE_PROXY = '0xc22834581ebc8527d974f8a1c97e1bea4ef910bc';
const ETHERSCAN_API_KEY = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY;
const apikey = '&apikey=' + ETHERSCAN_API_KEY;

/** Gets all addresses that have received a payout from the OP treasury */
export async function getAdressesAirdroppedOP(): Promise<[string[], string[]]> {
  /* First record is a header, so we drop it */
  const [, ...op1] = await loadCSV('../public/data/op_airdrop_1.csv');
  const [, ...op2] = await loadCSV('../public/data/op_airdrop_2.csv');
  return [op1.map((records) => records[0]), op2.map((records) => records[0])];
}

// fetch ERC20 transactions from Etherscan
export async function getERC20Transactions(address: string) {
  /*
    https://api.etherscan.io/api
     ?module=account
     &action=tokentx
     &address=0x2c1ba59d6f58433fb1eaee7d20b26ed83bda51a3
     &apikey=YourApiKeyToken
    */
  try {
    const response = await fetchRequest(
      'https://api.etherscan.io/api?module=account&action=tokentx&address=' +
        address +
        apikey,
    );

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }

    const result = (await response.json()) as GetERC20TransactionsResponse;

    return result;
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    } else {
      return 'An unexpected error occurred';
    }
  }
}

// fetch normal transactions from Etherscan
export async function getNormalTransactions(address: string) {
  /*
    https://api.etherscan.io/api
     ?module=account
     &action=txlist
     &address=0x2c1ba59d6f58433fb1eaee7d20b26ed83bda51a3
     &apikey=YourApiKeyToken
    */
  try {
    const response = await fetchRequest(
      'https://api.etherscan.io/api?module=account&action=txlist&address=' +
        address +
        apikey,
    );

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }

    const result = (await response.json()) as GetNormalTransactionsResponse;

    return result;
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    } else {
      return 'An unexpected error occurred';
    }
  }
}

// fetch ERC721 transactions from Etherscan
export async function getERC721Transactions(address: string) {
  /*
    https://api.etherscan.io/api
     ?module=account
     &action=tokennfttx
     &address=0x2c1ba59d6f58433fb1eaee7d20b26ed83bda51a3
     &apikey=YourApiKeyToken
    */
  try {
    const response = await fetchRequest(
      'https://api.etherscan.io/api?module=account&action=tokennfttx&address=' +
        address +
        apikey,
    );

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }

    const result = (await response.json()) as GetERC721TransactionsResponse;

    return result;
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    } else {
      return 'An unexpected error occurred';
    }
  }
}

// experimental: not used so far etherscan fetch
export async function etherscanGetTokenBalance(
  contractAddress: string,
  address: string,
  network: 'mainnet' | 'optimism',
) {
  let apiUrl: string;

  switch (network) {
    case 'mainnet':
      apiUrl = 'https://api.etherscan.io/api';
      break;
    case 'optimism':
      apiUrl = 'https://api-optimistic.etherscan.io/api';
      break;
    default:
      throw new Error(`Unsupported network: ${network}`);
  }

  const query = `${apiUrl}?module=account&action=tokenbalance&contractaddress=${contractAddress}&address=${address}${apikey}`;

  try {
    const response = await fetchRequest(query);

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }

    const result = (await response.json()) as GetTokenBalanceResponse;

    return result;
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    } else {
      return 'An unexpected error occurred';
    }
  }
}

// fetch token balance for a given contract address from Etherscan
export async function getTokenBalance(
  contractAddress: Address,
  address: string,
  decimals: number,
  network: 'mainnet' | 'optimism',
): Promise<string> {
  try {
    const isMainnet = network === 'mainnet';
    const abi = ERC20;
    const client = await getClient(isMainnet ? 'mainnet' : 'optimism');
    const balance: any = await client.readContract({
      address: contractAddress,
      abi,
      functionName: 'balanceOf',
      args: [address],
    });

    return balance ? formatUnits(balance, decimals) : '0';
  } catch (error) {
    console.log({ error });
    return '0';
  }
}

export async function fetchGRDonations(address: string) {
  const addressParts = address.match(/.{1,6}/g) ?? [];
  if (!addressParts) {
    throw new Error('Invalid address');
  }

  const scores = await Promise.all(
    [1, 10, 250, 424].map(async (chainId) => {
      const url = `https://indexer-production.fly.dev/data/${chainId}/contributors/${addressParts.join(
        '/',
      )}.json`;
      try {
        const response = await fetch(url);
        if (response.ok) {
          return await response.json();
        } else {
          return [];
        }
      } catch (error) {
        return [];
      }
    }),
  );
  return scores.flat();
}

async function optimismTxHistoryCheck(txs: any) {
  let interactedWithContracts, deployedContracts, createdGnosisSafe;
  for (let tx of txs) {
    // Checks any contract interaction
    if (tx.data && tx.data !== '0x') {
      interactedWithContracts = true;
      // Checks if it created a Gnosis Safe
      if (tx?.to?.toLowerCase() === GNOSIS_SAFE_PROXY.toLowerCase()) {
        createdGnosisSafe = true;
      }
    }
    // Checks if any contract was deployed
    if (tx.to === null) {
      deployedContracts = true;
    }
    // Checks if any tx was executed in a Gnosis Safe
  }
  return {
    interactedWithContracts,
    deployedContracts,
    createdGnosisSafe,
  };
}

export async function getAddressOPTxHistory(address: string) {
  const provider = new ethers.providers.EtherscanProvider(
    'optimism',
    ETHERSCAN_API_KEY,
  );
  const history = await provider.getHistory(address as Address);

  const { interactedWithContracts, deployedContracts, createdGnosisSafe } =
    await optimismTxHistoryCheck(history);
  return {
    history,
    interactedWithContracts,
    deployedContracts,
    createdGnosisSafe,
  };
}

async function fetchSafesOwnedByUser(userAddress: string): Promise<string[]> {
  const response = await fetch(
    `https://safe-transaction-optimism.safe.global/api/v1/owners/${userAddress}/safes/`,
  );
  const data = await response.json();
  return data.safes || [];
}

async function fetchSafeInfo(safeAddress: string): Promise<SafeInfo> {
  const response = await fetch(
    `https://safe-transaction-optimism.safe.global/api/v1/safes/${safeAddress}/`,
  );
  return await response.json();
}

export async function checkSafeOwnershipAndActivity(
  userAddress: string,
): Promise<{
  ownsSafe: boolean;
  hasExecutedTransaction: boolean;
  belongsToTreasury: boolean;
}> {
  const safesOwnedByUser = await fetchSafesOwnedByUser(userAddress);
  if (safesOwnedByUser.length === 0) {
    return {
      ownsSafe: false,
      hasExecutedTransaction: false,
      belongsToTreasury: false,
    };
  }

  let safeHistory = {
    ownsSafe: true,
    hasExecutedTransaction: false,
    belongsToTreasury: false,
  };

  if (safesOwnedByUser.includes('0x2501c477D0A35545a387Aa4A3EEe4292A9a8B3F0')) {
    safeHistory = { ...safeHistory, belongsToTreasury: true };
  }

  for (const safe of safesOwnedByUser) {
    const safeInfo = await fetchSafeInfo(safe);
    if (safeInfo.owners.includes(userAddress) && safeInfo.nonce > 0) {
      safeHistory = {
        ...safeHistory,
        ownsSafe: true,
        hasExecutedTransaction: true,
      };
    }
  }

  return safeHistory;
}

async function fetchGitcoinProjectsData(
  number: number,
): Promise<GitcoinProject[]> {
  const response = await fetch(
    `https://indexer-production.fly.dev/data/${number}/projects.json`,
  );
  if (!response.ok) {
    throw new Error(
      `Failed to fetch data for number: ${number}. Status: ${response.status}`,
    );
  }
  return await response.json();
}

export async function hasAGitcoinProject(address: string): Promise<boolean> {
  const networksToCheck = [1, 10, 250, 424];

  try {
    for (let number of networksToCheck) {
      const projects = await fetchGitcoinProjectsData(number);
      for (let project of projects) {
        if (project.owners.includes(address)) {
          return true;
        }
      }
    }
  } catch (error) {
    return false;
  }
  return false;
}

export async function fetchGitcoinPassport(address: string) {
  const url = `https://api.scorer.gitcoin.co/registry/score/${GICOIN_SCORER_ID}/${address}`;

  try {
    const headers: HeadersInit = {};
    const API_KEY = GITCOIN_PASSPORT_SCORER_API_KEY;
    if (API_KEY) {
      headers['X-API-KEY'] = API_KEY;
    }
    const response = await fetch(url, {
      method: 'GET',
      headers,
    });
    const passport = await response.json();
    return passport;
  } catch (error) {
    throw error;
  }
}

export async function fetchPOAPsForAddress(address: string) {
  const url = `https://api.poap.tech/actions/scan/${address}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'x-api-key': process.env.POAP_API_KEY!, // Your API key
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch POAPs');
  }

  return await response.json();
}
