import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

type ExperimentsContextType = {
  isExperimentsEnabled: boolean;
};

const ExperimentsContext = createContext<ExperimentsContextType | null>(null);

export function ExperimentsProvider({ children }: { children: React.ReactNode }) {
  const [isExperimentsEnabled, setIsExperimentsEnabled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Check for experiments flag in URL on initial load
    const searchParams = new URLSearchParams(location.search);
    const hasExperimentsFlag = searchParams.get('experiments') === 'true';
    setIsExperimentsEnabled(hasExperimentsFlag);
  }, []); // Only run on mount

  return (
    <ExperimentsContext.Provider value={{ isExperimentsEnabled }}>
      {children}
    </ExperimentsContext.Provider>
  );
}

export function useExperiments() {
  const context = useContext(ExperimentsContext);
  if (!context) {
    throw new Error('useExperiments must be used within an ExperimentsProvider');
  }
  return context;
} 