import React, { useState, useContext, createContext } from 'react';

interface ScoreProviderProps {
  children: React.ReactNode;
}
interface ScoreContextProps {
  globalLoading: boolean;
  setGlobalLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

// TODO: improve this and use it for actual model
const ScoreContext = createContext<ScoreContextProps>({
  globalLoading: false,
  setGlobalLoading: () => {},
});

export const ScoreProvider = ({ children }: ScoreProviderProps) => {
  const [globalLoading, setGlobalLoading] = useState(false);

  return (
    <ScoreContext.Provider value={{ globalLoading, setGlobalLoading }}>
      {children}
    </ScoreContext.Provider>
  );
};

export const useScoreContext = (): ScoreContextProps => {
  const context = useContext(ScoreContext);
  if (!context) {
    throw new Error('useScoreContext must be used within a ScoreProvider');
  }
  return context;
};
