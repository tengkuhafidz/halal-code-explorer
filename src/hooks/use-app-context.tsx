import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type AppMode = 'browser' | 'pwa' | 'twa' | 'native';

type AppContextType = {
  mode: AppMode;
  isInApp: boolean;
  isWeb: boolean;
};

const AppContext = createContext<AppContextType | null>(null);

function detectMode(): AppMode {
  if (typeof window === 'undefined') return 'browser';

  if ((window as any).Capacitor?.isNativePlatform?.()) return 'native';

  const search = new URLSearchParams(window.location.search);
  if (search.get('source') === 'twa') return 'twa';
  if (document.referrer.startsWith('android-app://')) return 'twa';

  const isStandalone =
    window.matchMedia?.('(display-mode: standalone)').matches ||
    (navigator as any).standalone === true;
  if (isStandalone) return 'pwa';

  return 'browser';
}

export function AppContextProvider({ children }: { children: React.ReactNode }) {
  const [mode] = useState<AppMode>(() => detectMode());

  useEffect(() => {
    document.documentElement.setAttribute('data-app-mode', mode);
  }, [mode]);

  const value = useMemo<AppContextType>(
    () => ({
      mode,
      isInApp: mode !== 'browser',
      isWeb: mode === 'browser',
    }),
    [mode]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
}
