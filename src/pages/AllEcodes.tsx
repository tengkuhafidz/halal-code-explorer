import { Search } from 'lucide-react';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation, useNavigate } from 'react-router-dom';
import ECodeListTile from '../components/ECodeListTile';
import { ECodeData } from '../components/ECode';
import AppECodeList from '../components/app/AppECodeList';
import { AppLayout } from '../components/app/AppLayout';
import { Button } from '@/components/ui/button';
import { WebLayout } from '../components/web/WebLayout';
import { useAppContext } from '../hooks/use-app-context';
import { ThemeProvider } from '../hooks/use-theme';
import { getAllECodes } from '../services/eCodeService';
import { generateBreadcrumbStructuredData, hasTrackingParams } from '../utils/seoHelpers';

const AllEcodes: React.FC = () => {
  const allECodes = getAllECodes();
  const navigate = useNavigate();
  const location = useLocation();
  const { isInApp, isWeb } = useAppContext();
  const shouldNoIndex = hasTrackingParams(location.search);

  const breadcrumbData = generateBreadcrumbStructuredData([
    { name: 'Home', url: 'https://www.ecodehalalcheck.com' },
    { name: 'All E-Codes', url: 'https://www.ecodehalalcheck.com/all-ecodes' },
  ]);

  const groupedEcodes = allECodes.reduce(
    (acc: Record<string, ECodeData[]>, eCode: ECodeData) => {
      const firstDigit = eCode.code.charAt(1);
      if (!acc[firstDigit]) {
        acc[firstDigit] = [];
      }
      acc[firstDigit].push(eCode);
      return acc;
    },
    {},
  );

  const sortedGroups = Object.entries(groupedEcodes)
    .sort()
    .map(([digit, codes]) => ({
      digit,
      codes: codes.sort((a, b) => a.code.localeCompare(b.code)),
    }));

  const webContent = (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      <h1 className="text-3xl font-bold mb-6">All E-Codes Directory</h1>
      <div className="mb-8">
        <p className="text-muted-foreground mb-6">
          Browse our complete database of {allECodes.length} food additives and E-codes. Click
          on any E-code to view detailed information about its halal status.
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
      {sortedGroups.map(({ digit, codes }) => (
        <div key={digit} className="mb-8">
          <h2 className="text-xl font-semibold mb-4">E{digit}00 Series</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {codes.map((eCode) => (
              <li key={eCode.code}>
                <ECodeListTile data={eCode} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );

  const appContent = (
    <div className="pb-4">
      {sortedGroups.map(({ digit, codes }) => (
        <section key={digit}>
          <div className="sticky top-0 z-10 bg-secondary/40 backdrop-blur-sm px-4 py-2 border-b border-border/40">
            <h2 className="text-[12px] font-semibold uppercase tracking-wide text-muted-foreground">
              E{digit}00 Series · {codes.length}
            </h2>
          </div>
          <AppECodeList items={codes} />
        </section>
      ))}
    </div>
  );

  return (
    <ThemeProvider>
      <Helmet>
        <title>All E-Codes | E-Code Halal Check</title>
        <meta
          name="description"
          content="Complete list of all E-codes and food additives with their halal status. Browse all E-codes from E100 to E1520."
        />
        <link rel="canonical" href="https://www.ecodehalalcheck.com/all-ecodes" />
        {shouldNoIndex && <meta name="robots" content="noindex, follow" />}
        <script type="application/ld+json">{JSON.stringify(breadcrumbData)}</script>
      </Helmet>

      {isInApp ? (
        <AppLayout title="All E-Codes">{appContent}</AppLayout>
      ) : (
        <WebLayout>{webContent}</WebLayout>
      )}
    </ThemeProvider>
  );
};

export default AllEcodes;
