import React, { useState, useEffect, useRef } from 'react';
import { Search as SearchIcon, X, Upload, Loader2 } from 'lucide-react';
import { useIsMobile } from '../hooks/use-mobile';
import { useNavigate } from 'react-router-dom';
import { useExperiments } from '../hooks/use-experiments';
import { toast } from '@/components/ui/use-toast';

interface SearchBarProps {
  onSearch: (query: string) => void;
  initialQuery?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, initialQuery = '' }) => {
  const [query, setQuery] = useState(initialQuery);
  const [isUploading, setIsUploading] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isExperimentsEnabled } = useExperiments();
  
  // Update local state when initialQuery changes
  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if it's a single E-code query for direct navigation
    const cleanQuery = query.trim();
    const isSingleECode = !cleanQuery.includes(',') && /^E?\d+$/i.test(cleanQuery);
    
    if (isSingleECode) {
      // Direct navigation to the E-code page
      const codeNumber = cleanQuery.toUpperCase().replace('E', '');
      navigate(`/ecode/${codeNumber}`);
    } else {
      // Normal search with multiple terms
      onSearch(query);
    }
  };

  const processImage = (file: File): Promise<File> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }

        // Calculate new dimensions maintaining aspect ratio
        const maxWidth = 512;
        const scale = maxWidth / img.width;
        const newWidth = maxWidth;
        const newHeight = img.height * scale;

        canvas.width = newWidth;
        canvas.height = newHeight;

        // Draw and resize image
        ctx.drawImage(img, 0, 0, newWidth, newHeight);

        // Convert to JPEG with 0.8 quality
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Could not convert image to blob'));
              return;
            }
            const processedFile = new File([blob], file.name.replace(/\.[^/.]+$/, '.jpg'), {
              type: 'image/jpeg',
            });
            resolve(processedFile);
          },
          'image/jpeg',
          0.8
        );
      };
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = URL.createObjectURL(file);
    });
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();

    try {
      // Process the image before uploading
      const processedFile = await processImage(file);
      formData.append('image', processedFile);

      const response = await fetch('https://additives-extractor.ruqqq.sg', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const data = await response.json();
      if (data.additives && Array.isArray(data.additives)) {
        const additivesList = data.additives.join(', ');
        setQuery(additivesList);
        onSearch(additivesList);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        variant: "destructive",
        title: "Upload Failed",
        description: "Failed to process the image. Please try again later.",
      });
    } finally {
      setIsUploading(false);
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
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
          className="w-full py-4 pl-12 pr-48 bg-background border-2 border-border focus:border-primary rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200"
          placeholder={isMobile ? "E100, E200, etc..." : "Search multiple E-codes (e.g., E100, E200, Curcumin)"}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search for E-codes or additives"
        />
        <div className="absolute inset-y-0 right-0 flex items-center gap-2 my-2 mr-2">
          {isExperimentsEnabled && (
            <>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                aria-label="Ingredient list image input"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="flex items-center px-4 py-2 text-sm font-medium text-white bg-halal rounded-xl opacity-90 hover:opacity-100 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Upload image"
              >
                {isUploading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Upload className="h-4 w-4" />
                )}
              </button>
            </>
          )}
          <button
            type="submit"
            className="px-4 py-1.5 text-sm font-medium text-white bg-halal rounded-xl opacity-90 hover:opacity-100 transition-opacity"
          >
            Search
          </button>
        </div>
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
                aria-label={`Remove ${tag} from search`}
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
