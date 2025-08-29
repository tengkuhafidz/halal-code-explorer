
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="py-10 mt-20 border-t">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center space-x-3">
              <img
                src="/logo.webp"
                alt="E-Code Halal Check Logo"
                className="h-8 w-8 rounded"
                width="32"
                height="32"
              />
              <h2 className="text-lg font-bold">E-Code <span className="text-halalDark dark:text-halal">Halal</span> Check</h2>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Helping you make informed choices about food additives.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <div className="flex gap-4 mb-2">
              <Link to="/all-ecodes" className="text-sm text-muted-foreground hover:text-primary">
                View All E-Codes
              </Link>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} E-Code Halal Check. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
