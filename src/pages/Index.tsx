import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation, useNavigate } from 'react-router-dom';
import BrowseByCategory from '../components/BrowseByCategory';
import CardGrid from '../components/CardGrid';
import { ECodeData } from '../components/ECode';
import Hero from '../components/Hero';
import InfoSection from '../components/InfoSection';
import MostSearchedECodes from '../components/MostSearchedECodes';
import SearchBar from '../components/SearchBar';
import StatusDistribution from '../components/StatusDistribution';
import AppECodeList from '../components/app/AppECodeList';
import { AppLayout } from '../components/app/AppLayout';
import AppSearchBar from '../components/app/AppSearchBar';
import { WebLayout } from '../components/web/WebLayout';
import { useAppContext } from '../hooks/use-app-context';
import { ThemeProvider } from '../hooks/use-theme';
import { getFeaturedECodes, searchECodes } from '../services/eCodeService';
import {
  buildCanonicalUrl,
  buildECodeMeta,
  buildECodeTitle,
  generateFAQStructuredData,
  generateOrganizationStructuredData,
  generateWebsiteStructuredData,
  getCommonName,
  hasTrackingParams,
} from '../utils/seoHelpers';

const Index = () => {
  const { isInApp, isWeb } = useAppContext();
  const [searchResults, setSearchResults] = useState<ECodeData[]>([]);
  const [filteredResults, setFilteredResults] = useState<ECodeData[]>([]);
  const [featured, setFeatured] = useState<ECodeData[]>([]);
  const [filteredFeatured, setFilteredFeatured] = useState<ECodeData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  const isSingleECodeSearch = searchQuery.trim().split(/\s*,\s*/).length === 1;
  const cleanSearchQuery = searchQuery.trim().toUpperCase();
  const currentECodeData =
    isSingleECodeSearch && searchResults.length === 1 ? searchResults[0] : null;

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('q');
    const filter = params.get('filter');

    if (query) {
      setSearchQuery(query);
      handleSearch(query);
    }

    if (filter) {
      setActiveFilter(filter);
    }
  }, [location.search]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    if (searchQuery) {
      params.set('q', searchQuery);
    } else {
      params.delete('q');
    }

    if (activeFilter) {
      params.set('filter', activeFilter);
    } else {
      params.delete('filter');
    }

    const page = params.get('page');
    if (page) params.set('page', page);

    const newUrl = params.toString() ? `?${params.toString()}` : '';
    navigate(newUrl, { replace: true });
  }, [searchQuery, activeFilter]);

  useEffect(() => {
    try {
      const data = getFeaturedECodes();
      setFeatured(data);
      setFilteredFeatured(data);
    } catch (error) {
      console.error('Error loading featured e-codes:', error);
    }
  }, []);

  useEffect(() => {
    if (activeFilter) {
      if (hasSearched) {
        setFilteredResults(searchResults.filter((item) => item.status === activeFilter));
      } else {
        setFilteredFeatured(featured.filter((item) => item.status === activeFilter));
      }
    } else {
      setFilteredResults(searchResults);
      setFilteredFeatured(featured);
    }
  }, [activeFilter, searchResults, featured, hasSearched]);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setHasSearched(!!query.trim());
    setSearchQuery(query);

    try {
      const results = await searchECodes(query);
      setSearchResults(results);

      if (activeFilter) {
        setFilteredResults(results.filter((item) => item.status === activeFilter));
      } else {
        setFilteredResults(results);
      }
    } catch (error) {
      console.error('Error searching e-codes:', error);
      setSearchResults([]);
      setFilteredResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (status: string | null) => {
    setActiveFilter(status);
  };

  const getPageTitle = () => {
    if (isSingleECodeSearch && currentECodeData) {
      return buildECodeTitle(currentECodeData);
    }
    if (searchQuery) {
      return `E-Code Halal Check: ${cleanSearchQuery} Food Additive Status`;
    }
    return 'Halal Check & Halal Checker for Food Additives & E-Codes | E-Code Halal Check';
  };

  const getPageDescription = () => {
    if (isSingleECodeSearch && currentECodeData) {
      return buildECodeMeta(currentECodeData);
    }
    if (searchQuery) {
      return `Check the halal status of ${cleanSearchQuery} and other food additives. Our database provides reliable information on whether food E-codes are permissible for Muslims.`;
    }
    return 'Free halal checker for food additives and E-codes. Instantly check whether any E-number is halal, haram, or doubtful, with its source and the MUIS ruling.';
  };

  const getStructuredData = () => {
    const structuredDataArray = [];
    structuredDataArray.push(generateWebsiteStructuredData());
    structuredDataArray.push(generateOrganizationStructuredData());

    if (!searchQuery) {
      structuredDataArray.push(generateFAQStructuredData());
    }

    if (isSingleECodeSearch && currentECodeData) {
      structuredDataArray.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: `Is ${currentECodeData.code} (${getCommonName(currentECodeData)}) halal or haram?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `${currentECodeData.code} (${getCommonName(currentECodeData)}) is ${currentECodeData.status} for Muslims. ${currentECodeData.description}`,
            },
          },
        ],
      });
    }

    return structuredDataArray;
  };

  const structuredData = getStructuredData();
  const canonicalUrl = buildCanonicalUrl('/', location.search, ['q']);
  const shouldNoIndex = hasTrackingParams(location.search);

  const displayItems = hasSearched ? filteredResults : filteredFeatured;
  const totalItems = hasSearched ? searchResults : featured;

  const webHomeContent = (
    <>
      <Hero />
      <div className="px-4 py-6">
        <SearchBar onSearch={handleSearch} initialQuery={searchQuery} />
        <div className="text-center text-sm text-muted-foreground mt-3" id="data-source">
          Data source:{' '}
          <a
            href="https://isomer-user-content.by.gov.sg/48/15766cc5-7b0d-4df0-938e-e61f1cb2b91e/FOOD%20ADDITIVE%20LISTING%205.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-primary transition-colors"
          >
            MUIS
          </a>
        </div>
        <StatusDistribution
          items={totalItems}
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
        />
        <CardGrid items={displayItems} isLoading={isLoading} />
      </div>
      {!hasSearched && (
        <>
          <MostSearchedECodes />
          <BrowseByCategory />
        </>
      )}
      <InfoSection />
    </>
  );

  const appHomeContent = (
    <>
      <AppSearchBar onSearch={handleSearch} initialQuery={searchQuery} />
      <div className="px-4 pb-2">
        <StatusDistribution
          items={totalItems}
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
        />
      </div>
      <AppECodeList
        items={displayItems}
        isLoading={isLoading}
        resultsLabel={
          !isLoading && displayItems.length > 0
            ? `${hasSearched ? 'Showing' : 'Featured'} ${displayItems.length} ${
                displayItems.length === 1 ? 'result' : 'results'
              }`
            : undefined
        }
      />
      {!hasSearched && !isLoading && <MostSearchedECodes />}
    </>
  );

  return (
    <ThemeProvider>
      <Helmet>
        <title>{getPageTitle()}</title>
        <meta name="description" content={getPageDescription()} />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={getPageTitle()} />
        <meta property="og:description" content={getPageDescription()} />
        <meta property="og:url" content={canonicalUrl} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={getPageTitle()} />
        <meta name="twitter:description" content={getPageDescription()} />

        <link rel="canonical" href={canonicalUrl} />

        {shouldNoIndex && <meta name="robots" content="noindex, follow" />}

        {structuredData &&
          structuredData.map((data, index) => (
            <script key={index} type="application/ld+json">
              {JSON.stringify(data)}
            </script>
          ))}
      </Helmet>

      {isInApp ? (
        <AppLayout title="Search">{appHomeContent}</AppLayout>
      ) : (
        <WebLayout showInstallPrompt>{webHomeContent}</WebLayout>
      )}
    </ThemeProvider>
  );
};

export default Index;
