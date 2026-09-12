import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.tsx';
import { detectMode } from './hooks/use-app-context';
import './index.css';

// Google Analytics types
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

const root = document.getElementById('root');
if (root) {
  // Pages are prerendered at build time in the plain-browser layout. Hydrate
  // that markup in the browser; in app modes (PWA/TWA/native) the layout
  // differs, so render from scratch instead of fighting a hydration mismatch.
  const canHydrate = root.hasChildNodes() && detectMode() === 'browser';
  if (canHydrate) {
    hydrateRoot(root, <App />);
  } else {
    createRoot(root).render(<App />);
  }
}
