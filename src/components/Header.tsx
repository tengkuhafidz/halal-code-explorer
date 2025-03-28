
import React from 'react';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from '../hooks/use-theme';

const Header = () => {
  const { theme, setTheme } = useTheme();
  
  return (
    <header className="py-6 w-full glass-morphism sticky top-0 z-50 border-b">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img 
            src="https://media.publit.io/file/projectassets/ehc-logo.webp" 
            alt="ECodes Halal Check Logo" 
            className="h-10 w-auto"
          />
          <h1 className="text-xl font-bold">E-Code <span className="text-primary">Halal</span> Check</h1>
        </div>
        
        <div className="flex items-center space-x-6">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
