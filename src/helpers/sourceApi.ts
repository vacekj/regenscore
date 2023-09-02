import { Address, createPublicClient, http, formatUnits } from 'viem';
import { mainnet, optimism } from 'viem/chains';
import { fetchRequest } from '@/utils';
import {
  GetERC20TransactionsResponse,
  GetNormalTransactionsResponse,
  GetERC721TransactionsResponse,
  GetTokenBalanceResponse,
} from './sourceTypes';
import ERC20 from '@/abi/ERC20';

// const ETHERSCAN_API_KEY = 'GB821FZCS37WSXM8GJCCUUD3ZQUTZZY9RX';
const ETHERSCAN_API_KEY = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY;
const apikey = '&apikey=' + ETHERSCAN_API_KEY;
// "&apikey=6JEC4FAII8AIEUQFI28C765AC4Y1K54ME2"

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
  network: 'mainnet' | 'optimism',
): Promise<string> {
  const isMainnet = network === 'mainnet';
  const abi = ERC20;
  const client = createPublicClient({
    chain: isMainnet ? mainnet : optimism,
    transport: http(),
  });
  const decimals = await client.readContract({
    address: contractAddress,
    abi,
    functionName: 'decimals',
  });
  const balance: any = await client.readContract({
    address: contractAddress,
    abi,
    functionName: 'balanceOf',
    args: [address],
  });

  return balance ? formatUnits(balance, Number(decimals)) : '0';
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
      const response = await fetch(url);
      if (response.ok) {
        return await response.json();
      } else {
        console.error(await response.text());
        return [];
      }
    }),
  );

  return scores.flat();
}
