
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Google Analytics types
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

const root = document.getElementById("root");
if (root) {
  createRoot(root).render(<App />);
}
