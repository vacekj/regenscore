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

export type SafeInfo = {
  address: string;
  nonce: number;
  threshold: number;
  owners: string[];
  masterCopy: string;
  modules: any[];
  fallbackHandler: string;
  guard: string;
  version: string;
};
export type GitcoinProject = {
  id: string;
  projectNumber: number;
  metaPtr: string;
  metadata: {
    title: string;
    description: string;
    website: string;
    projectTwitter: string;
    userGithub: string;
    projectGithub: string;
    logoImg: string;
    bannerImg: string;
    bannerImgData: object;
    logoImgData: object;
    credentials: {
      github: {
        credentialSubject: {
          id: string;
        };
      };
    };
  };
  owners: string[];
};
