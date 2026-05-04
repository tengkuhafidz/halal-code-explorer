import { ReactNode } from 'react';
import { AppHeader } from './AppHeader';
import { BottomTabBar } from './BottomTabBar';

const HEADER_HEIGHT = 44;
const TAB_BAR_HEIGHT = 49;

interface AppLayoutProps {
  title: string;
  backLabel?: string;
  onBack?: () => void;
  onShare?: () => void;
  hideTabBar?: boolean;
  children: ReactNode;
}

export function AppLayout({ title, backLabel, onBack, onShare, hideTabBar, children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <AppHeader title={title} backLabel={backLabel} onBack={onBack} onShare={onShare} />
      <main
        id="main-content"
        className="overflow-x-hidden"
        style={{
          paddingTop: `calc(${HEADER_HEIGHT}px + env(safe-area-inset-top))`,
          paddingBottom: hideTabBar
            ? 'env(safe-area-inset-bottom)'
            : `calc(${TAB_BAR_HEIGHT}px + env(safe-area-inset-bottom))`,
        }}
      >
        {children}
      </main>
      {!hideTabBar && <BottomTabBar />}
    </div>
  );
}
