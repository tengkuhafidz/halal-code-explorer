import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Hero from '../components/Hero';
import SearchBar from '../components/SearchBar';
import CardGrid from '../components/CardGrid';
import InfoSection from '../components/InfoSection';
import StatusDistribution from '../components/StatusDistribution';
import Footer from '../components/Footer';
import { ThemeProvider } from '../hooks/use-theme';
import { searchECodes, getFeaturedECodes } from '../services/eCodeService';
import { ECodeData } from '../components/ECode';
import { useNavigate, useLocation } from 'react-router-dom';
import { useIsMobile } from '../hooks/use-mobile';
import { PWAInstallPrompt } from '../components/PWAInstallPrompt';
import { generateWebsiteStructuredData, generateFAQStructuredData } from '../utils/seoHelpers';

const Index = () => {
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
  const isMobile = useIsMobile();

  // For SEO - determine if it's a single E-code search for page title
  const isSingleECodeSearch = searchQuery.trim().split(/\s*,\s*/).length === 1;
  const cleanSearchQuery = searchQuery.trim().toUpperCase();

  // Get the current E-code data if we're viewing a single result
  const currentECodeData = isSingleECodeSearch && searchResults.length === 1 ? searchResults[0] : null;

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('q');
    const filter = params.get('filter');
    const page = params.get('page');

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
        setFilteredResults(searchResults.filter(item => item.status === activeFilter));
      } else {
        setFilteredFeatured(featured.filter(item => item.status === activeFilter));
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
        setFilteredResults(results.filter(item => item.status === activeFilter));
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

  const isMultiSearch = searchQuery.split(',').filter(t => t.trim()).length > 1;

  // Generate dynamic meta title and description based on search
  const getPageTitle = () => {
    if (isSingleECodeSearch && currentECodeData) {
      return `Is ${cleanSearchQuery} (${currentECodeData.name}) Halal? ${currentECodeData.status === 'halal' ? 'Yes' : 'Doubtful'} | E-Code Halal Check`;
    }
    if (searchQuery) {
      return `E-Code Halal Check: ${cleanSearchQuery} Food Additive Status`;
    }
    return 'E-Code Halal Check | Find Halal Status of Food Additives';
  };

  const getPageDescription = () => {
    if (isSingleECodeSearch && currentECodeData) {
      return `${cleanSearchQuery} (${currentECodeData.name}) is ${currentECodeData.status} for Muslims. ${currentECodeData.description}. Find comprehensive information about this food additive at E-Code Halal Check.`;
    }
    if (searchQuery) {
      return `Check the halal status of ${cleanSearchQuery} and other food additives. Our database provides reliable information on whether food E-codes are permissible for Muslims.`;
    }
    return 'Find the halal status of food additives and E-codes. Comprehensive database of food additives with their halal or doubtful status, sources, and detailed information.';
  };

  // Generate schema.org structured data for rich results
  const getStructuredData = () => {
    const structuredDataArray = [];
    
    // Always include website structured data
    structuredDataArray.push(generateWebsiteStructuredData());
    
    // Include FAQ structured data on homepage
    if (!searchQuery) {
      structuredDataArray.push(generateFAQStructuredData());
    }
    
    // Include specific FAQ for single E-code search
    if (isSingleECodeSearch && currentECodeData) {
      structuredDataArray.push({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [{
          "@type": "Question",
          "name": `Is ${cleanSearchQuery} (${currentECodeData.name}) halal?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `${cleanSearchQuery} (${currentECodeData.name}) is ${currentECodeData.status} for Muslims. ${currentECodeData.description}`
          }
        }]
      });
    }
    
    return structuredDataArray;
  };

  const structuredData = getStructuredData();
  const canonicalUrl = searchQuery
    ? `https://ecodehalalcheck.com?q=${encodeURIComponent(searchQuery)}`
    : 'https://ecodehalalcheck.com';

  return (
    <ThemeProvider>
      <Helmet>
        <title>{getPageTitle()}</title>
        <meta name="description" content={getPageDescription()} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={getPageTitle()} />
        <meta property="og:description" content={getPageDescription()} />
        <meta property="og:url" content={canonicalUrl} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={getPageTitle()} />
        <meta name="twitter:description" content={getPageDescription()} />

        {/* Canonical URL for SEO */}
        <link rel="canonical" href={canonicalUrl} />

        {/* Schema.org structured data */}
        {structuredData && structuredData.map((data, index) => (
          <script key={index} type="application/ld+json">
            {JSON.stringify(data)}
          </script>
        ))}
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />
        <PWAInstallPrompt />
        <main id="main-content" className="flex-grow">
          <div className="content-container">
            <Hero />

            <div className="px-4 py-6">
              <SearchBar onSearch={handleSearch} initialQuery={searchQuery} />

              <div className="text-center text-sm text-muted-foreground mt-3" id="data-source">
                Data source: <a
                  href="https://isomer-user-content.by.gov.sg/48/15766cc5-7b0d-4df0-938e-e61f1cb2b91e/FOOD%20ADDITIVE%20LISTING%205.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-primary transition-colors"
                >
                  MUIS
                </a>
              </div>

              <StatusDistribution
                items={hasSearched ? searchResults : featured}
                activeFilter={activeFilter}
                onFilterChange={handleFilterChange}
              />

              <CardGrid
                items={hasSearched ? filteredResults : filteredFeatured}
                isLoading={isLoading}
              />
            </div>

            <InfoSection />
          </div>
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Index;
