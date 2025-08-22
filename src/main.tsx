
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Initialize Google Analytics
declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

// Initialize Google Analytics only after user interaction for maximum performance
const initializeGoogleAnalytics = () => {
  if (import.meta.env.VITE_GA_ID && typeof import.meta.env.VITE_GA_ID === 'string' && import.meta.env.VITE_GA_ID.trim()) {
    try {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${import.meta.env.VITE_GA_ID}`;
      script.onerror = () => console.warn('Failed to load Google Analytics');
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      window.gtag = function(...args: unknown[]) {
        window.dataLayer.push(args);
      };
      window.gtag('js', new Date());
      window.gtag('config', import.meta.env.VITE_GA_ID);
    } catch (error) {
      console.warn('Google Analytics initialization failed:', error);
    }
  }
};

// Super aggressive deferral - only load GA after first user interaction
let gaInitialized = false;
const initGAOnInteraction = () => {
  if (!gaInitialized) {
    gaInitialized = true;
    setTimeout(initializeGoogleAnalytics, 2000);
    // Remove listeners after first interaction
    document.removeEventListener('click', initGAOnInteraction);
    document.removeEventListener('scroll', initGAOnInteraction);
    document.removeEventListener('keydown', initGAOnInteraction);
    document.removeEventListener('touchstart', initGAOnInteraction);
  }
};

// Wait for page load, then set up interaction listeners
if (document.readyState === 'loading') {
  window.addEventListener('load', () => {
    setTimeout(() => {
      document.addEventListener('click', initGAOnInteraction, { passive: true });
      document.addEventListener('scroll', initGAOnInteraction, { passive: true });
      document.addEventListener('keydown', initGAOnInteraction, { passive: true });
      document.addEventListener('touchstart', initGAOnInteraction, { passive: true });
    }, 3000);
  });
} else {
  setTimeout(() => {
    document.addEventListener('click', initGAOnInteraction, { passive: true });
    document.addEventListener('scroll', initGAOnInteraction, { passive: true });
    document.addEventListener('keydown', initGAOnInteraction, { passive: true });
    document.addEventListener('touchstart', initGAOnInteraction, { passive: true });
  }, 3000);
}

const root = document.getElementById("root");
if (root) {
  createRoot(root).render(<App />);
}
