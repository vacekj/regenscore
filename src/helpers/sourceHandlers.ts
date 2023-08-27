import {
  getERC20Transactions,
  getNormalTransactions,
  getERC721Transactions,
  getTokenBalance,
  fetchGRDonations,
} from './sourceApi';
import {
  NormalTransaction,
  ERC20Transaction,
  GetNormalTransactionsResponse,
  GetERC20TransactionsResponse,
  GetERC721TransactionsResponse,
  GetTokenBalanceResponse,
} from './sourceTypes';

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

const handleTransaction = (
  transaction: { to: string; from: string },
  debugArray: ITransaction[],
  contractsList: { [key: string]: ContractDetails }
) => {
  for (let key in contractsList) {
    if (transaction.to === key || transaction.from === key) {
      const contractDetail = contractsList[key];
      debugArray.push({
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
  debug: any
): Promise<number> {
  let score = 0;
  try {
    const normalTransactions = (await getNormalTransactions(
      address
    )) as GetNormalTransactionsResponse;
    normalTransactions.result.forEach((tx: NormalTransaction) => {
      score += handleTransaction(
        tx,
        debug.normalTransactions,
        list_of_contracts
      );
    });
  } catch (error) {
    console.error('Error fetching normal transactions:', error);
  }
  return score;
}

export async function handleERC20Transactions(
  address: string,
  debug: any
): Promise<number> {
  let score = 0;
  try {
    const erc20Transactions = (await getERC20Transactions(
      address
    )) as GetERC20TransactionsResponse;
    erc20Transactions.result.forEach((tx: ERC20Transaction) => {
      score += handleTransaction(
        tx,
        debug.erc20Transactions,
        list_of_contracts
      );
    });
  } catch (error) {
    console.error('Error fetching ERC20 transactions:', error);
  }
  return score;
}

export async function handleERC721Transactions(
  address: string,
  debug: any
): Promise<number> {
  let score = 0;
  try {
    const erc721Transactions = (await getERC721Transactions(
      address
    )) as GetERC721TransactionsResponse;
    erc721Transactions.result.forEach((tx) => {
      score += handleTransaction(
        tx,
        debug.erc721Transactions,
        list_of_contracts
      );
    });
  } catch (error) {
    console.error('Error fetching ERC721 transactions:', error);
  }
  return score;
}

export async function handleTokenBalances(
  address: string,
  debug: any
): Promise<number> {
  let score = 0;
  for (let key in list_of_balance_contracts) {
    try {
      const balanceResponse = (await getTokenBalance(
        key,
        address
      )) as GetTokenBalanceResponse;
      if (balanceResponse?.status !== '0') {
        const balanceInWei = BigInt(balanceResponse.result);
        const balanceInEth = Number(balanceInWei) / 10 ** 18;
        if (!isNaN(balanceInEth) && balanceInEth > 0) {
          const addedScore =
            balanceInEth * list_of_balance_contracts[key].weight;
          score += addedScore;
          debug.tokenBalances.push({
            contract: key,
            name: list_of_balance_contracts[key].name,
            scoreAdded: addedScore,
          });
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
  debug: any
): Promise<number> {
  let score = 0;
  try {
    const grDonations = await fetchGRDonations(address);
    grDonations.forEach((donation) => {
      const donationScore = donation.amountUSD;
      score += donationScore;
      debug.grDonations.push({
        ...donation,
        scoreAdded: donationScore,
      });
    });
  } catch (error) {
    console.error('Error fetching GR donations:', error);
  }
  return score;
}
