
import React, { useState, useEffect } from 'react';
import { Search as SearchIcon, X } from 'lucide-react';
import { useIsMobile } from '../hooks/use-mobile';

interface SearchBarProps {
  onSearch: (query: string) => void;
  initialQuery?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, initialQuery = '' }) => {
  const [query, setQuery] = useState(initialQuery);
  const isMobile = useIsMobile();
  
  // Update local state when initialQuery changes
  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  // Parse comma-separated values and format them as tags
  const parsedTags = query.split(',')
    .map(tag => tag.trim())
    .filter(tag => tag.length > 0);

  const handleTagRemove = (tagToRemove: string) => {
    const newQuery = parsedTags
      .filter(tag => tag !== tagToRemove)
      .join(', ');
    setQuery(newQuery);
    onSearch(newQuery);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form 
        onSubmit={handleSubmit}
        className="relative group"
      >
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <SearchIcon className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors duration-200" />
        </div>
        <input
          type="text"
          className="w-full py-4 pl-12 pr-24 bg-background border-2 border-border focus:border-primary rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200"
          placeholder={isMobile ? "E100, E200, etc..." : "Search multiple E-codes (e.g., E100, E200, Curcumin)"}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="submit"
          className="absolute inset-y-0 right-0 flex items-center px-4 my-2 mr-2 text-sm font-medium text-white bg-primary rounded-xl opacity-90 hover:opacity-100 transition-opacity"
        >
          Search
        </button>
      </form>

      {/* Display tags for multiple search terms */}
      {parsedTags.length > 1 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {parsedTags.map((tag, index) => (
            <div 
              key={index} 
              className="flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
            >
              <span>{tag}</span>
              <button 
                type="button"
                onClick={() => handleTagRemove(tag)}
                className="rounded-full p-0.5 hover:bg-primary/20 transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
