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

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow">
          <Hero />
          
          <div className="container mx-auto px-4 py-6">
            <SearchBar onSearch={handleSearch} initialQuery={searchQuery} />
            
            <div className="text-center text-sm text-muted-foreground mt-3">
              Data sourced from <a 
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
        </main>
        
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Index;
