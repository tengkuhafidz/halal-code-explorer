import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.tsx';
import { detectMode } from './hooks/use-app-context';
import './index.css';

// Google Analytics types
declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

const root = document.getElementById('root');
if (root) {
  // Pages are prerendered at build time in the plain-browser layout. Hydrate
  // that markup in the browser; in app modes (PWA/TWA/native) the layout
  // differs, so render from scratch instead of fighting a hydration mismatch.
  const canHydrate = root.hasChildNodes() && detectMode() === 'browser';
  if (canHydrate) {
    // The prerendered HTML is complete and its links work without JS, so
    // hydrate once the main thread is idle instead of competing with the
    // user's first tap (Interaction to Next Paint).
    const hydrate = () => hydrateRoot(root, <App />);
    if (typeof window.requestIdleCallback === 'function') {
      window.requestIdleCallback(hydrate, { timeout: 1500 });
    } else {
      window.setTimeout(hydrate, 0);
    }
  } else {
    createRoot(root).render(<App />);
  }
}
