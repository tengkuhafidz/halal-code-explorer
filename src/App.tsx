import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from './components/ui/toaster';
import { Toaster as SonnerToaster } from 'sonner';
import { ExperimentsProvider } from './hooks/use-experiments';
import { ScrollToTop } from './components/ScrollToTop';
import Index from './pages/Index';
import ECodePage from './pages/ECodePage';
import NotFound from './pages/NotFound';
import './App.css';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <ExperimentsProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/ecode/:code" element={<ECodePage />} />
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
