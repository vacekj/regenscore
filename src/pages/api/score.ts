import { NextApiRequest, NextApiResponse } from "next";

const ETHERSCAN_API_KEY = "1P8AVX4G8VPIJ12VQ7YSTGZ3VKS247PGHB";
const apikey = "&apikey=" + ETHERSCAN_API_KEY;

const list_of_contracts = {
  "0x900db999074d9277c5da2a43f252d74366230da0": 1,
  "0xD56daC73A4d6766464b38ec6D91eB45Ce7457c44": 1,
  "0x4e78011ce80ee02d2c3e649fb657e45898257815": 1,
  "0xb0C22d8D350C67420f06F48936654f567C73E8C8": 1,
  "0xde30da39c46104798bb5aa3fe8b9e0e1f348163f": 1,
  "0x1Ee05530f2BEB59E7D6f2838fCc7D9c9464C253d": 1,
  "0x82C7c02a52B75387DB14FA375938496cbb984388": 1,
  "0x42dCbA5dA33CDDB8202CC182A443a3e7b299dADb": 100,
  "0x8b13e88EAd7EF8075b58c94a7EB18A89FD729B18": 100,
  "0xf5918382Dd20Ecba89747c50f80fB7f9f1e0524C": 100,
  "0xe785E82358879F061BC3dcAC6f0444462D4b5330": 100,
  "0x90B3832e2F2aDe2FE382a911805B6933C056D6ed": 25,
  "0x3545192b340F50d77403DC0A64cf2b32F03d00A9": 50,
  "0x5663e3E096f1743e77B8F71b5DE0CF9Dfd058523": 100,
  "0xC5E9dDebb09Cd64DfaCab4011A0D5cEDaf7c9BDb": 10,
};

const list_of_balance_contracts = {
  "0x900db999074d9277c5da2a43f252d74366230da0": 1,
  "0xD56daC73A4d6766464b38ec6D91eB45Ce7457c44": 1,
  "0x4e78011ce80ee02d2c3e649fb657e45898257815": 1,
  "0xb0C22d8D350C67420f06F48936654f567C73E8C8": 1,
  "0xde30da39c46104798bb5aa3fe8b9e0e1f348163f": 1,
};

async function fetchRequest(url: string) {
  var req = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
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
      "https://api.etherscan.io/api?module=account&action=tokentx&address=" + address + apikey,
    );

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }

    const result = (await response.json()) as GetERC20TransactionsResponse;

    console.log("result is: ", JSON.stringify(result, null, 4));

    return result;
  } catch (error) {
    if (error instanceof Error) {
      console.log("error message: ", error.message);
      return error.message;
    } else {
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
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
      "https://api.etherscan.io/api?module=account&action=txlist&address=" + address + apikey,
    );

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }

    const result = (await response.json()) as GetNormalTransactionsResponse;

    console.log("result is: ", JSON.stringify(result, null, 4));

    return result;
  } catch (error) {
    if (error instanceof Error) {
      console.log("error message: ", error.message);
      return error.message;
    } else {
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
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
      "https://api.etherscan.io/api?module=account&action=tokennfttx&address=" + address + apikey,
    );

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }

    const result = (await response.json()) as GetERC721TransactionsResponse;

    console.log("result is: ", JSON.stringify(result, null, 4));

    return result;
  } catch (error) {
    if (error instanceof Error) {
      console.log("error message: ", error.message);
      return error.message;
    } else {
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
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
      "https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress="
        + contractAddress + "&address=" + address + apikey,
    );

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }

    const result = (await response.json()) as GetTokenBalanceResponse;

    console.log("result is: ", JSON.stringify(result, null, 4));

    return result;
  } catch (error) {
    if (error instanceof Error) {
      console.log("error message: ", error.message);
      return error.message;
    } else {
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
}

export async function createScore(address: string) {
  var score = 0;
  const normaltxs = await getNormalTransactions(address) as GetNormalTransactionsResponse;
  const erc20txs = await getERC20Transactions(address) as GetERC20TransactionsResponse;
  const erc721tx = await getERC721Transactions(address) as GetERC721TransactionsResponse;

  var normaltxmatch: string[] = [];
  for (var i = 0; i < normaltxs.result.length; i++) {
    for (let key in list_of_contracts) {
      if (!normaltxmatch.includes(key)) {
        let checkto, checkfrom;
        checkto = key.match(normaltxs.result[i].to);
        checkfrom = key.match(normaltxs.result[i].from);
        if (checkto || checkfrom) {
          // return the matched element like "email" only
          // res = check;
          // return the element which contains "email" in "key"
          // @ts-ignore
          score += list_of_contracts[key];
          normaltxmatch.push(key);
        }
      }
    }
  }

  var erc20txmatch: string[] = [];
  for (var i = 0; i < erc20txs.result.length; i++) {
    for (let key in list_of_contracts) {
      if (!erc20txmatch.includes(key)) {
        let checkto, checkfrom;
        checkto = key.match(erc20txs.result[i].to);
        checkfrom = key.match(erc20txs.result[i].from);
        if (checkto || checkfrom) {
          // return the matched element like "email" only
          // res = check;
          // return the element which contains "email" in "key"
          // @ts-ignore
          score += list_of_contracts[key];
          erc20txmatch.push(key);
        }
      }
    }
  }

  var erc721txmatch: string[] = [];
  for (var i = 0; i < erc721tx.result.length; i++) {
    for (let key in list_of_contracts) {
      if (!erc721txmatch.includes(key)) {
        let checkto, checkfrom;
        checkto = key.match(erc721tx.result[i].to);
        checkfrom = key.match(erc721tx.result[i].from);
        if (checkto || checkfrom) {
          // return the matched element like "email" only
          // res = check;
          // return the element which contains "email" in "key"
          // @ts-ignore
          score += list_of_contracts[key];
          erc721txmatch.push(key);
        }
      }
    }
  }

  for (let key in list_of_balance_contracts) {
    let balance = await getTokenBalance(key, address) as GetTokenBalanceResponse;
    if (Number(balance.result) > 0) {
      // @ts-ignore
      score += Number(balance.result) * list_of_balance_contracts[key];
    }
  }
  return score;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body as Request;
  // @ts-ignore
  const score = await createScore(body.address);

  try {
    return res.status(200).send(score);
  } catch (e) {
    return res.status(200).send(0);
  }
};
