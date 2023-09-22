import { ScoreContext } from '@/contexts/scoreContext';
import { useScore } from '@/hooks';
import { ReactNode, useEffect, useState } from 'react';
import { Hex } from 'viem';
import { useAccount } from 'wagmi';

interface ScoreProviderProps {
  children: ReactNode;
}

export const ScoreProvider: React.FC<ScoreProviderProps> = ({ children }) => {
  const { isDisconnected } = useAccount();
  const [currentAddress, setCurrentAddress] = useState<
    string | Hex | undefined
  >();

  const scoreData = useScore(currentAddress);

  useEffect(() => {
    if (isDisconnected) {
      setCurrentAddress(undefined);
    }
  }, [isDisconnected]);

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
