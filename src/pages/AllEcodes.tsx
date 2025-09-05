import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ThemeProvider } from '../hooks/use-theme';
import { getAllECodes } from '../services/eCodeService';
import { ECodeData } from '../components/ECode';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

const Sitemap: React.FC = () => {
  const allECodes = getAllECodes();
  const navigate = useNavigate();

  // Group E-codes by first digit for better organization
  const groupedEcodes = allECodes.reduce((acc: Record<string, ECodeData[]>, eCode: ECodeData) => {
    const firstDigit = eCode.code.charAt(1);
    if (!acc[firstDigit]) {
      acc[firstDigit] = [];
    }
    acc[firstDigit].push(eCode);
    return acc;
  }, {});

  return (
    <ThemeProvider>
      <Helmet>
        <title>All E-Codes | E-Code Halal Check</title>
        <meta name="description" content="Complete list of all E-codes and food additives with their halal status. Browse all E-codes from E100 to E1520." />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-grow container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">All E-Codes Directory</h1>

          <div className="mb-8">
            <p className="text-muted-foreground mb-6">
              Browse our complete database of {allECodes.length} food additives and E-codes.
              Click on any E-code to view detailed information about its halal status.
            </p>
            <div className="flex justify-center">
              <Button 
                onClick={() => navigate('/')}
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                <Search className="h-4 w-4" />
                Search E-Codes
              </Button>
            </div>
          </div>

          {Object.entries(groupedEcodes).sort().map(([digit, codes]) => (
            <div key={digit} className="mb-8">
              <h2 className="text-xl font-semibold mb-4">E{digit}00 Series</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {codes.sort((a, b) => a.code.localeCompare(b.code)).map(eCode => (
                  <Link
                    key={eCode.code}
                    to={`/ecode/${eCode.code.replace('E', '')}`}
                    className="p-3 bg-secondary/50 hover:bg-secondary rounded-md transition-colors"
                  >
                    <div className="font-medium">{eCode.code}</div>
                    <div className="text-sm text-muted-foreground truncate">{eCode.name}</div>
                    <div className={`text-xs mt-1 ${eCode.status === 'halal' ? 'text-green-600' : 'text-orange-600'
                      }`}>
                      {eCode.status}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Sitemap;