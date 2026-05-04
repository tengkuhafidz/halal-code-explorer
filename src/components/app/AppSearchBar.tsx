import { Camera, Loader2, Search as SearchIcon, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from '@/components/ui/use-toast';

const UPLOAD_NOTIFICATION_KEY = 'upload_notification_shown';
const UPLOAD_ENDPOINT = 'https://additives-extractor.ruqqq.sg';

interface AppSearchBarProps {
  onSearch: (query: string) => void;
  initialQuery?: string;
}

const AppSearchBar: React.FC<AppSearchBarProps> = ({ onSearch, initialQuery = '' }) => {
  const [query, setQuery] = useState(initialQuery);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const processImage = (file: File): Promise<File> =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }
        const maxWidth = 512;
        const scale = maxWidth / img.width;
        canvas.width = maxWidth;
        canvas.height = img.height * scale;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Could not convert image to blob'));
              return;
            }
            resolve(
              new File([blob], file.name.replace(/\.[^/.]+$/, '.jpg'), {
                type: 'image/jpeg',
              }),
            );
          },
          'image/jpeg',
          0.8,
        );
      };
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = URL.createObjectURL(file);
    });

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    try {
      const processedFile = await processImage(file);
      formData.append('image', processedFile);
      const response = await fetch(UPLOAD_ENDPOINT, { method: 'POST', body: formData });
      if (!response.ok) throw new Error('Failed to upload image');
      const data = await response.json();
      if (data.additives && Array.isArray(data.additives) && data.additives.length > 0) {
        const additivesList = data.additives.join(', ');
        setQuery(additivesList);
        onSearch(additivesList);
      } else {
        toast({
          variant: 'default',
          title: 'No additives found in the image',
          description:
            'Please ensure the image is clear and contains the ingredient list. Alternatively, you can key in the E-codes manually.',
        });
      }
    } catch (error) {
      if (error instanceof Error && error.message?.toLowerCase().includes('rate limit')) {
        toast({ variant: 'destructive', title: 'Rate Limit Exceeded', description: 'Please try again later.' });
      } else {
        toast({ variant: 'destructive', title: 'Upload Failed', description: 'Failed to process the image. Please try again later.' });
      }
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleUploadClick = () => {
    if (localStorage.getItem(UPLOAD_NOTIFICATION_KEY) !== 'true') {
      const consent = window.confirm(
        'When you upload an image of the ingredient list, it will be sent to our server for AI processing to extract the additives list.\n\nPlease ensure you do not upload any images containing personal or sensitive information.',
      );
      if (!consent) return;
      localStorage.setItem(UPLOAD_NOTIFICATION_KEY, 'true');
    }
    fileInputRef.current?.click();
  };

  const parsedTags = query
    .split(',')
    .map((tag) => tag.trim())
    .filter((tag) => tag.length > 0);

  const handleTagRemove = (tagToRemove: string) => {
    const newQuery = parsedTags.filter((tag) => tag !== tagToRemove).join(', ');
    setQuery(newQuery);
    onSearch(newQuery);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <div className="w-full px-4 pt-3 pb-2">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSearch(query);
          (document.activeElement as HTMLElement)?.blur();
        }}
        className="flex items-center gap-2"
      >
        <div className="flex-1 flex items-center gap-2 h-10 px-3 rounded-xl bg-secondary/80">
          <SearchIcon className="h-4 w-4 text-muted-foreground shrink-0" aria-hidden="true" />
          <input
            type="text"
            inputMode="search"
            enterKeyHint="search"
            className="flex-1 min-w-0 bg-transparent text-[15px] text-foreground placeholder:text-muted-foreground focus:outline-none"
            placeholder="E100, E200, Curcumin…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search for E-codes or additives"
          />
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="text-muted-foreground active:opacity-60"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
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
          onClick={handleUploadClick}
          disabled={isUploading}
          className="h-10 w-10 flex items-center justify-center rounded-xl bg-secondary/80 text-primary active:opacity-60 disabled:opacity-50"
          aria-label="Scan ingredient list"
        >
          {isUploading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Camera className="h-4 w-4" />
          )}
        </button>
      </form>

      {parsedTags.length > 1 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {parsedTags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 px-2.5 py-1 bg-primary/10 text-primary text-xs rounded-full"
            >
              {tag}
              <button
                type="button"
                onClick={() => handleTagRemove(tag)}
                className="rounded-full active:opacity-60"
                aria-label={`Remove ${tag}`}
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default AppSearchBar;
