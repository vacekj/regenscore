import { fetchRequest } from '@/utils';

// const ETHERSCAN_API_KEY = 'GB821FZCS37WSXM8GJCCUUD3ZQUTZZY9RX';
const ETHERSCAN_API_KEY = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY;
const apikey = '&apikey=' + ETHERSCAN_API_KEY;
// "&apikey=6JEC4FAII8AIEUQFI28C765AC4Y1K54ME2"
export type ERC20Transaction = {
  blockNumber: string;
  timeStamp: string;
  hash: string;
  nonce: string;
  blockHash: string;
  from: string;
  contractAddress: string;
  to: string;
  value: string;
  tokenName: string;
  tokenSymbol: string;
  tokenDecimal: string;
  transactionIndex: string;
  gas: string;
  gasPrice: string;
  gasUsed: string;
  cumulativeGasUsed: string;
  input: string;
  confirmations: string;
};

export type GetERC20TransactionsResponse = {
  result: ERC20Transaction[];
};

export type GetNormalTransactionsResponse = {
  result: NormalTransaction[];
};

export type NormalTransaction = {
  blockNumber: string;
  timeStamp: string;
  hash: string;
  nonce: string;
  blockHash: string;
  transactionIndex: string;
  from: string;
  to: string;
  value: string;
  gas: string;
  gasPrice: string;
  isError: string;
  txreceipt_status: string;
  gasUsed: string;
  contractAddress: string;
  cumulativeGasUsed: string;
  input: string;
  confirmations: string;
};

export type ERC721Transaction = {
  blockNumber: string;
  timeStamp: string;
  hash: string;
  nonce: string;
  blockHash: string;
  from: string;
  contractAddress: string;
  to: string;
  tokenID: string;
  value: string;
  tokenName: string;
  tokenSymbol: string;
  tokenDecimal: string;
  transactionIndex: string;
  gas: string;
  gasPrice: string;
  gasUsed: string;
  cumulativeGasUsed: string;
  input: string;
  confirmations: string;
};

export type GetERC721TransactionsResponse = {
  result: ERC721Transaction[];
};

export type GetTokenBalanceResponse = {
  result: string;
  status: string;
};

export type IGRDonation = {
  id: string;
  amountUSD: number;
  scoreAdded: number;
  transaction: string;
  roundName: string;
  projectTitle: string;
};

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
        apikey
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
        apikey
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
        apikey
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

// fetch token balance for a given contract address from Etherscan
export async function getTokenBalance(
  contractAddress: string,
  address: string
) {
  /*
    https://api.etherscan.io/api
     ?module=account
     &action=tokenBalance
     &address=0x2c1ba59d6f58433fb1eaee7d20b26ed83bda51a3
     &apikey=YourApiKeyToken
    */
  try {
    const response = await fetchRequest(
      'https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=' +
        contractAddress +
        '&address=' +
        address +
        apikey
    );

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

export async function fetchGRDonations(address: string) {
  const addressParts = address.match(/.{1,6}/g) ?? [];
  if (!addressParts) {
    throw new Error('Invalid address');
  }

  const scores = await Promise.all(
    [1, 10, 250, 424].map(async (chainId) => {
      const url = `https://indexer-production.fly.dev/data/${chainId}/contributors/${addressParts.join(
        '/'
      )}.json`;
      const response = await fetch(url);
      if (response.ok) {
        return await response.json();
      } else {
        console.error(await response.text());
        return [];
      }
    })
  );

  return scores.flat();
}
