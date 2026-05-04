import { ReactNode } from 'react';
import Footer from '../Footer';
import Header from '../Header';
import { PWAInstallPrompt } from '../PWAInstallPrompt';

interface WebLayoutProps {
  children: ReactNode;
  showInstallPrompt?: boolean;
}

export function WebLayout({ children, showInstallPrompt }: WebLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      {showInstallPrompt && <PWAInstallPrompt />}
      <main id="main-content" className="flex-grow">
        <div className="content-container">{children}</div>
      </main>
      <Footer />
    </div>
  );
}
