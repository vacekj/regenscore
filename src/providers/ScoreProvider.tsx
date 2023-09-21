import { ScoreContext } from '@/contexts/scoreContext';
import { useScore } from '@/hooks';
import { ReactNode, useState } from 'react';
import { Hex } from 'viem';

interface ScoreProviderProps {
  children: ReactNode;
}

export const ScoreProvider: React.FC<ScoreProviderProps> = ({ children }) => {
  const [currentAddress, setCurrentAddress] = useState<
    string | Hex | undefined
  >();

  const scoreData = useScore(currentAddress);

  const contextValue = {
    ...scoreData,
    setAddress: setCurrentAddress,
  };

  return (
    <ScoreContext.Provider value={contextValue}>
      {children}
    </ScoreContext.Provider>
  );
};
