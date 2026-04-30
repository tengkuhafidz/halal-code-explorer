import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ThemeProvider } from '../hooks/use-theme';
import { getAllECodes } from '../services/eCodeService';
import { ECodeData } from '../components/ECode';
import ECodeListTile from '../components/ECodeListTile';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { generateBreadcrumbStructuredData, hasTrackingParams } from '../utils/seoHelpers';

const Sitemap: React.FC = () => {
  const allECodes = getAllECodes();
  const navigate = useNavigate();
  const location = useLocation();
  const shouldNoIndex = hasTrackingParams(location.search);

  const breadcrumbData = generateBreadcrumbStructuredData([
    { name: "Home", url: "https://www.ecodehalalcheck.com" },
    { name: "All E-Codes", url: "https://www.ecodehalalcheck.com/all-ecodes" }
  ]);

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
        <link rel="canonical" href="https://www.ecodehalalcheck.com/all-ecodes" />
        {shouldNoIndex && <meta name="robots" content="noindex, follow" />}
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbData)}
        </script>
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
            <div className="flex justify-start">
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
              <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {codes.sort((a, b) => a.code.localeCompare(b.code)).map(eCode => (
                  <li key={eCode.code}>
                    <ECodeListTile data={eCode} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Sitemap;