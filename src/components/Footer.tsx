
import React from 'react';

const Footer = () => {
  return (
    <footer className="py-10 mt-20 border-t">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">E</span>
              </div>
              <h2 className="text-lg font-bold">E-Code <span className="text-primary">Halal</span> Check</h2>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Helping you make informed choices about food additives.
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} E-Code Halal Check. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-2">
              <a href="#" className="text-sm text-foreground hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-foreground hover:text-primary transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-foreground hover:text-primary transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
