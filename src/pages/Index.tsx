
import React, { useState, useEffect } from 'react';
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

  // Parse URL parameters on initial load
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

  // Update URL when search or filter changes
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (searchQuery) {
      params.set('q', searchQuery);
    }
    
    if (activeFilter) {
      params.set('filter', activeFilter);
    }
    
    const newUrl = params.toString() ? `?${params.toString()}` : '';
    navigate(newUrl, { replace: true });
  }, [searchQuery, activeFilter, navigate]);

  useEffect(() => {
    const loadFeatured = async () => {
      setIsLoading(true);
      try {
        const data = await getFeaturedECodes();
        setFeatured(data);
        setFilteredFeatured(data);
      } catch (error) {
        console.error('Error loading featured e-codes:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadFeatured();
  }, []);

  useEffect(() => {
    // Apply filters when activeFilter changes
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
      
      // Apply current filter to new search results
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

  // Determine if search is using multiple terms
  const isMultiSearch = searchQuery.split(',').filter(t => t.trim()).length > 1;

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow">
          <Hero />
          
          <div className="container mx-auto px-4 py-6">
            <SearchBar onSearch={handleSearch} initialQuery={searchQuery} />
            
            {hasSearched ? (
              <>
                <div className={`flex justify-between items-center ${isMobile ? 'mt-6 mb-2' : 'mt-16 mb-6'}`}>
                  <h2 className="text-2xl font-bold">
                    Search Results {isMultiSearch && " (Multiple E-codes)"}
                  </h2>
                </div>
                <StatusDistribution 
                  items={searchResults} 
                  activeFilter={activeFilter}
                  onFilterChange={handleFilterChange}
                />
                <CardGrid items={filteredResults} isLoading={isLoading} />
              </>
            ) : (
              <>
                <div className={`flex justify-between items-center ${isMobile ? 'mt-6 mb-2' : 'mt-16 mb-6'}`}>
                  <h2 className="text-2xl font-bold">
                    Common E-Codes
                  </h2>
                </div>
                <StatusDistribution 
                  items={featured} 
                  activeFilter={activeFilter}
                  onFilterChange={handleFilterChange}
                />
                <CardGrid items={filteredFeatured} isLoading={isLoading} />
              </>
            )}
          </div>
          
          <InfoSection />
        </main>
        
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Index;
