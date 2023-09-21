import { ReactNode } from 'react';
import { ScoreContext } from '@/contexts/scoreContext';
import { Hex } from 'viem';
import { useScore } from '@/hooks';

interface ScoreProviderProps {
  children: ReactNode;
  address: string | Hex | undefined;
}

export const ScoreProvider: React.FC<ScoreProviderProps> = ({
  children,
  address,
}) => {
  const scoreData = useScore(address);

  return (
    <ScoreContext.Provider value={scoreData}>{children}</ScoreContext.Provider>
  );
};
