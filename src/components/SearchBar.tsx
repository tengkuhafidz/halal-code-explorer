
import React, { useState } from 'react';
import { Search as SearchIcon } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
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
          placeholder="Search by E-code or additive name (e.g., E100, Curcumin)"
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
    </div>
  );
};

export default SearchBar;
