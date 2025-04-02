
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from './components/ui/toaster';
import { Toaster as SonnerToaster } from 'sonner';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import './App.css';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
        <SonnerToaster position="top-center" closeButton />
      </Router>
    </HelmetProvider>
  );
}

export default App;
