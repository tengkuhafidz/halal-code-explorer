
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ThemeProvider } from '../hooks/use-theme';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center px-4 py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-primary/10 text-primary">
              <span className="text-2xl font-bold">404</span>
            </div>
            <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-md mx-auto">
              Sorry, the page you're looking for doesn't exist or has been moved.
            </p>
            <a 
              href="/" 
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Return Home
            </a>
          </div>
        </main>
        
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default NotFound;
