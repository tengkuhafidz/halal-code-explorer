import { HelmetProvider } from 'react-helmet-async';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Toaster as SonnerToaster } from 'sonner';
import './App.css';
import { ScrollToTop } from './components/ScrollToTop';
import { Toaster } from './components/ui/toaster';
import { ExperimentsProvider } from './hooks/use-experiments';
import AllEcodes from './pages/AllEcodes';
import ECodePage from './pages/ECodePage';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import PrivacyPolicy from './pages/PrivacyPolicy';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <ExperimentsProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/ecode/:code" element={<ECodePage />} />
            <Route path="/all-ecodes" element={<AllEcodes />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
          <SonnerToaster position="top-center" closeButton />
        </ExperimentsProvider>
      </Router>
    </HelmetProvider>
  );
}

export default App;
