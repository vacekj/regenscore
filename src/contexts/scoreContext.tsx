import { createContext, useContext } from 'react';
import { Item, ResponseData } from '@/types';
import { Hex } from 'viem';
import { useScore } from '@/hooks';

type ScoreContextType = {
  fetchScore: (endpoint: string) => Promise<void>;
  score: number;
  meta?: { [key: string]: Item };
  data: ResponseData | null;
  version: number;
  categories: { category: string; scoreAdded: number }[];
  loading: boolean;
  error: Error | null;
};

const defaultScoreContext: ScoreContextType = {
  fetchScore: async () => {},
  score: 0,
  meta: {},
  data: null, // Here's the change
  version: 0,
  categories: [],
  loading: false,
  error: null,
};

export const ScoreContext = createContext<ScoreContextType | undefined>(
  defaultScoreContext,
);

export const useScoreContext = (address: string | Hex | undefined) => {
  const context = useContext(ScoreContext);

  if (!context) {
    throw new Error('useScoreContext must be used within a ScoreProvider');
  }

  return useScore(address);
};
