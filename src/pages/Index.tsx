
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
  const [featured, setFeatured] = useState<ECodeData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const loadFeatured = async () => {
      setIsLoading(true);
      try {
        const data = await getFeaturedECodes();
        setFeatured(data);
      } catch (error) {
        console.error('Error loading featured e-codes:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadFeatured();
  }, []);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setHasSearched(true);
    
    try {
      const results = await searchECodes(query);
      setSearchResults(results);
    } catch (error) {
      console.error('Error searching e-codes:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
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
                <StatusDistribution items={searchResults} />
                <CardGrid items={searchResults} isLoading={isLoading} />
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold mt-16 mb-6 text-center">
                  Common E-Codes
                </h2>
                <StatusDistribution items={featured} />
                <CardGrid items={featured} isLoading={isLoading} />
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
