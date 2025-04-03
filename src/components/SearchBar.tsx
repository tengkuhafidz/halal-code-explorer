import React, { useState, useEffect, useRef } from 'react';
import { Search as SearchIcon, X, Upload, Loader2 } from 'lucide-react';
import { useIsMobile } from '../hooks/use-mobile';
import { useNavigate } from 'react-router-dom';
import { useExperiments } from '../hooks/use-experiments';
import { toast } from '@/components/ui/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SearchBarProps {
  onSearch: (query: string) => void;
  initialQuery?: string;
}

const UPLOAD_NOTIFICATION_KEY = 'upload_notification_shown';

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, initialQuery = '' }) => {
  const [query, setQuery] = useState(initialQuery);
  const [isUploading, setIsUploading] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
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
    onSearch(query);
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
      if (data.additives && Array.isArray(data.additives) && data.additives.length > 0) {
        const additivesList = data.additives.join(', ');
        setQuery(additivesList);
        onSearch(additivesList);
      } else {
        toast({
          variant: "default",
          title: "No additives found in the image",
          description: "Please key in the E-codes manually if this is an error.",
        });
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      if (error instanceof Error && error.message?.toLowerCase().indexOf('rate limit') > -1) {
        toast({
          variant: "destructive",
          title: "Rate Limit Exceeded",
          description: "Please try again later.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Upload Failed",
          description: "Failed to process the image. Please try again later.",
        });
      }
    } finally {
      setIsUploading(false);
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleUploadClick = () => {
    // Check if the notification has been shown before
    const hasShownNotification = localStorage.getItem(UPLOAD_NOTIFICATION_KEY) === 'true';

    if (!hasShownNotification) {
      setShowUploadModal(true);
    } else {
      fileInputRef.current?.click();
    }
  };

  const handleModalClose = () => {
    setShowUploadModal(false);
    // Store in localStorage that we've shown the notification
    localStorage.setItem(UPLOAD_NOTIFICATION_KEY, 'true');
    // Open file picker after modal is closed
    fileInputRef.current?.click();
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
        className="relative group flex items-center gap-2 bg-background border-2 border-border focus-within:border-primary rounded-2xl shadow-sm focus-within:ring-2 focus-within:ring-primary/20 transition-all duration-200"
      >
        <div className="flex items-center pl-4 text-muted-foreground group-focus-within:text-primary transition-colors duration-200 flex-shrink-0">
          <SearchIcon className="h-5 w-5" />
        </div>
        <input
          type="text"
          className="flex-1 py-4 bg-transparent focus:outline-none min-w-0 text-ellipsis"
          placeholder={isMobile ? "E100, E200, etc..." : "Search multiple E-codes (e.g., E100, E200, Curcumin)"}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search for E-codes or additives"
        />
        <div className="flex items-center gap-2 pr-2 flex-shrink-0">
          <>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              aria-label="Ingredient list image input"
            />
            <Dialog open={showUploadModal} onOpenChange={setShowUploadModal}>
              <DialogTrigger asChild>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        type="button"
                        onClick={handleUploadClick}
                        disabled={isUploading}
                        className="flex items-center px-4 py-2 text-sm font-medium bg-secondary text-primary hover:text-white border border-primary hover:border-white rounded-xl opacity-90 hover:opacity-100 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Upload image"
                      >
                        {isUploading ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Upload className="h-4 w-4" />
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Upload an image of ingredients to automatically detect E-codes</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Notice</DialogTitle>
                  <DialogDescription>
                    <p className="mt-2">
                      When you upload an image, it will be sent to our server for AI processing to extract the additives list.
                    </p>
                    <p className="mt-2 font-bold">
                      Please ensure you do not upload any images containing personal or sensitive information.
                    </p>
                    <div className="mt-4 flex justify-center">
                      <Button onClick={handleModalClose}>I Understand</Button>
                    </div>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </>
          <Button
            type="submit"
            className="px-4 py-1.5 text-sm font-medium text-white bg-halal rounded-xl opacity-90 hover:opacity-100 transition-opacity"
          >
            Search
          </Button>
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
