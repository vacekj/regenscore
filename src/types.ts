import { Address } from 'viem';
import { ReactNode } from 'react';

export type Token = {
  category: string;
  scoreAdded: number;
};

export type Item = {
  category: string;
  scoreAdded: number;
  tokens?: Token[];
  applies?: Boolean;
  behavior: ReactNode;
};

export interface ScoreRecord {
  id?: number;
  createdAt?: string;
  address: Address;
  score?: number;
  meta?: {
    [key: string]: Item;
  };
  version?: number;
  attestation?: string;
  eas_hash?: string;
  ipfs_hash?: string;
  receipt?: string;
}

export type ResponseData = {
  score?: number;
  meta?: {
    [key: string]: Item;
  };
  version?: number;
};
