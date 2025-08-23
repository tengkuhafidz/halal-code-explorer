import React from 'react';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from '../hooks/use-theme';
import { Link } from 'react-router-dom';

const Header = () => {
  const { theme, setTheme } = useTheme();

  return (
    <>
      {/* Skip Navigation Link for Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
      >
        Skip to main content
      </a>
      <header className="py-4 w-full bg-background sticky top-0 z-50 border-b shadow-sm">
        <div className="content-container px-4 sm:px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <img
              src="/logo.webp"
              alt="E-Code Halal Check Logo"
              className="h-10 w-auto rounded"
              width="40"
              height="40"
            />
            <h1 className="text-xl font-bold">E-Code <span className="text-halalDark dark:text-halal">Halal</span> Check</h1>
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
    </>
  );
};

export default Header;
