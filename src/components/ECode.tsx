
import React from 'react';
import { Check, AlertTriangle, Share2 } from 'lucide-react';
import { toast } from 'sonner';

export interface ECodeData {
  code: string;
  name: string;
  description: string;
  status: 'halal' | 'doubtful';
  source?: string;
}

interface ECodeProps {
  data: ECodeData;
}

const ECode: React.FC<ECodeProps> = ({ data }) => {
  const statusConfig = {
    halal: {
      color: 'bg-halal/10 text-halal border-halal/20',
      bgColor: 'bg-halal/5',
      icon: Check,
      text: 'Halal',
    },
    doubtful: {
      color: 'bg-mushbooh/10 text-mushbooh border-mushbooh/20',
      bgColor: 'bg-mushbooh/5',
      icon: AlertTriangle,
      text: 'Doubtful',
    },
  };

  const { color, icon: Icon, text, bgColor } = statusConfig[data.status];

  const handleShare = () => {
    // Get current URL and add this specific E-code as a search parameter
    const url = new URL(window.location.href);
    url.searchParams.set('q', data.code);
    
    navigator.clipboard.writeText(url.toString())
      .then(() => {
        toast.success(`Copied link to ${data.code}`);
      })
      .catch(() => {
        toast.error("Failed to copy link. Please try again.");
      });
  };

  return (
    <div className={`${bgColor} rounded-2xl p-5 border shadow-sm hover:shadow-md transition-shadow duration-300 animate-scale-in`}>
      <div className="relative">
        {/* Header with code, name and share button */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex-grow pr-8">
            <h3 className="text-xl font-semibold">{data.code}</h3>
            <p className="text-lg font-medium truncate w-full">{data.name}</p>
          </div>
          <div className="absolute right-0 top-0">
            <button 
              onClick={handleShare}
              className="p-1.5 rounded-full hover:bg-background/80 transition-colors"
              aria-label={`Share ${data.code}`}
            >
              <Share2 className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
        </div>
        
        {/* Status badge */}
        <div className="mb-3">
          <div className={`inline-flex items-center px-3 py-1 rounded-full ${color}`}>
            <Icon className="h-4 w-4 mr-1" />
            <span className="text-sm font-medium">{text}</span>
          </div>
        </div>
      </div>
      
      {/* Description */}
      <p className="mt-3 text-muted-foreground">{data.description}</p>
      
      {/* Source */}
      {data.source && (
        <p className="mt-2 text-xs text-muted-foreground">
          <span className="font-semibold">Source:</span> {data.source}
        </p>
      )}
    </div>
  );
};

export default ECode;
