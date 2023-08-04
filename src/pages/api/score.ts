import { NextApiRequest, NextApiResponse } from 'next';

const ETHERSCAN_API_KEY = 'GB821FZCS37WSXM8GJCCUUD3ZQUTZZY9RX';
const apikey = '&apikey=' + ETHERSCAN_API_KEY;

type ContractDetails = {
  name: string;
  weight: number;
};

type ITransaction = {
  contract: string;
  name: string;
  scoreAdded: number;
};

const list_of_contracts: { [key: string]: ContractDetails } = {
  '0x900db999074d9277c5da2a43f252d74366230da0': { name: 'Giveth', weight: 1 },
  '0xD56daC73A4d6766464b38ec6D91eB45Ce7457c44': { name: 'Panvala', weight: 1 },
  '0x4e78011ce80ee02d2c3e649fb657e45898257815': {
    name: 'Klima DAO',
    weight: 1,
  },
  '0xb0C22d8D350C67420f06F48936654f567C73E8C8': {
    name: 'Staked Klima',
    weight: 1,
  },
  '0xde30da39c46104798bb5aa3fe8b9e0e1f348163f': { name: 'Gitcoin', weight: 1 },
  '0x1Ee05530f2BEB59E7D6f2838fCc7D9c9464C253d': { name: 'Unknown', weight: 1 },
  '0x82C7c02a52B75387DB14FA375938496cbb984388': { name: 'EthBot', weight: 1 },
  '0x42dCbA5dA33CDDB8202CC182A443a3e7b299dADb': { name: 'Moloch', weight: 100 },
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

const list_of_balance_contracts: { [key: string]: ContractDetails } = {
  '0x900db999074d9277c5da2a43f252d74366230da0': { name: 'GIV', weight: 1 },
  '0xD56daC73A4d6766464b38ec6D91eB45Ce7457c44': { name: 'PAN', weight: 1 },
  '0x4e78011ce80ee02d2c3e649fb657e45898257815': { name: 'KLIMA', weight: 1 },
  '0xb0C22d8D350C67420f06F48936654f567C73E8C8': { name: 'sKLIMA', weight: 1 },
  '0xde30da39c46104798bb5aa3fe8b9e0e1f348163f': { name: 'GTC', weight: 1 },
};
async function fetchRequest(url: string) {
  let req = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  });
  return req;
}

type ERC20Transaction = {
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

type GetERC20TransactionsResponse = {
  result: ERC20Transaction[];
};

type GetNormalTransactionsResponse = {
  result: NormalTransaction[];
};

type NormalTransaction = {
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

type ERC721Transaction = {
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

type GetERC721TransactionsResponse = {
  result: ERC721Transaction[];
};

type GetTokenBalanceResponse = {
  result: string;
  status: string;
};

async function getERC20Transactions(address: string) {
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

async function getNormalTransactions(address: string) {
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

async function getERC721Transactions(address: string) {
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

async function getTokenBalance(contractAddress: string, address: string) {
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

export async function createScore(address: string) {
  let score = 0;
  var debug = {
    normalTransactions: [] as ITransaction[],
    erc20Transactions: [] as ITransaction[],
    erc721Transactions: [] as ITransaction[],
    tokenBalances: [] as ITransaction[],
  };
  const normaltxs = (await getNormalTransactions(
    address
  )) as GetNormalTransactionsResponse;
  const erc20txs = (await getERC20Transactions(
    address
  )) as GetERC20TransactionsResponse;
  const erc721tx = (await getERC721Transactions(
    address
  )) as GetERC721TransactionsResponse;

  const handleTransaction = (
    transaction: { to: string; from: string },
    debugArray: ITransaction[],
    contractsList: { [key: string]: ContractDetails }
  ) => {
    for (let key in contractsList) {
      if (transaction.to === key || transaction.from === key) {
        score += contractsList[key].weight; // Fix here
        debugArray.push({
          contract: key,
          name: contractsList[key].name, // Fix here
          scoreAdded: contractsList[key].weight, // Fix here
        });
      }
    }
  };

  // Handle normal transactions
  let normaltxmatch: string[] = [];
  for (let i = 0; i < normaltxs.result.length; i++) {
    handleTransaction(
      normaltxs.result[i],
      debug.normalTransactions,
      list_of_contracts
    );
  }

  // Handle ERC-20 transactions
  let erc20txmatch: string[] = [];
  for (let i = 0; i < erc20txs.result.length; i++) {
    handleTransaction(
      erc20txs.result[i],
      debug.erc20Transactions,
      list_of_contracts
    );
  }

  // Handle ERC-721 transactions
  let erc721txmatch: string[] = [];
  for (let i = 0; i < erc721tx.result.length; i++) {
    handleTransaction(
      erc721tx.result[i],
      debug.erc721Transactions,
      list_of_contracts
    );
  }

  // Handle token balances
  for (let key in list_of_balance_contracts) {
    let balance = (await getTokenBalance(
      key,
      address
    )) as GetTokenBalanceResponse;
    if (balance?.status === '0') continue; // if the rate was exceeded, skip this contract
    let balanceInWei = BigInt(balance.result); // Using BigInt for accurate arithmetic
    let balanceInEth = Number(balanceInWei) / 10 ** 18; // Converting to ETH
    if (isNaN(balanceInEth)) {
      console.log(`Invalid balance for key ${key}:`, balance.result);
      continue;
    }
    if (balanceInEth > 0) {
      let addedScore = balanceInEth * list_of_balance_contracts[key].weight;
      score += addedScore;
      debug.tokenBalances.push({
        contract: key,
        name: list_of_balance_contracts[key].name,
        scoreAdded: addedScore,
      });
    }
  }

  console.log({ score, address, debug }); // log the debug object
  return { score, debug }; // return the debug object along with the score
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body as Request;
  // @ts-ignore
  const result = await createScore(body.address);
  try {
    return res.status(200).json(result); // send the entire result object as JSON
  } catch (e) {
    return res.status(200).send({ score: 0, debug: {} }); // send an empty debug object on error
  }
};
