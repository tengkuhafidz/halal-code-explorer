import React from 'react';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from '../hooks/use-theme';
import { Link } from 'react-router-dom';

const Header = () => {
  const { theme, setTheme } = useTheme();

  return (
    <header className="py-4 w-full bg-background sticky top-0 z-50 border-b shadow-sm">
      <div className="content-container px-4 sm:px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3">
          <img
            src="https://media.publit.io/file/projectassets/ehc-logo.webp"
            alt="E-Code Halal Check Logo"
            className="h-10 w-auto rounded"
          />
          <h1 className="text-xl font-bold">E-Code <span className="text-halal">Halal</span> Check</h1>
        </Link>

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
