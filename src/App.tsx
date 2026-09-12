import { HelmetProvider } from 'react-helmet-async';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import './App.css';
import { ScrollToTop } from './components/ScrollToTop';
import { AppContextProvider } from './hooks/use-app-context';
import { ExperimentsProvider } from './hooks/use-experiments';
import AboutScreen from './pages/AboutScreen';
import AllEcodes from './pages/AllEcodes';
import CategoriesIndex from './pages/CategoriesIndex';
import CategoryPage from './pages/CategoryPage';
import ECodePage from './pages/ECodePage';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import PrivacyPolicy from './pages/PrivacyPolicy';

/**
 * Everything that lives inside a router. Shared by the browser entry
 * (BrowserRouter) and the build-time prerenderer (StaticRouter).
 */
export function AppShell() {
  return (
    <AppContextProvider>
      <ScrollToTop />
      <ExperimentsProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/ecode/:code" element={<ECodePage />} />
          <Route path="/all-ecodes" element={<AllEcodes />} />
          <Route path="/categories" element={<CategoriesIndex />} />
          <Route path="/category/:slug" element={<CategoryPage />} />
          <Route path="/about" element={<AboutScreen />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ExperimentsProvider>
    </AppContextProvider>
  );
}

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
