
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

const Index = () => {
  const [searchResults, setSearchResults] = useState<ECodeData[]>([]);
  const [filteredResults, setFilteredResults] = useState<ECodeData[]>([]);
  const [featured, setFeatured] = useState<ECodeData[]>([]);
  const [filteredFeatured, setFilteredFeatured] = useState<ECodeData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

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
    setHasSearched(true);
    
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

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow">
          <Hero />
          
          <div className="container mx-auto px-4 py-8">
            <SearchBar onSearch={handleSearch} />
            
            {hasSearched ? (
              <>
                <h2 className="text-2xl font-bold mt-16 mb-6 text-center">
                  Search Results
                </h2>
                <StatusDistribution 
                  items={searchResults} 
                  activeFilter={activeFilter}
                  onFilterChange={handleFilterChange}
                />
                <CardGrid items={filteredResults} isLoading={isLoading} />
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold mt-16 mb-6 text-center">
                  Common E-Codes
                </h2>
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
