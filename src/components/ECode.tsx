
import React from 'react';
import { Check, AlertTriangle } from 'lucide-react';

export interface ECodeData {
  code: string;        // Will map to "E-Code" in the original schema
  name: string;        // Will map to "Chemical_Name"
  description: string; // Will map to "Description" + "Remarks"
  status: 'halal' | 'doubtful'; // Will map to "HALAL" boolean
  source?: string;     // Will be derived from "Remarks"
  category?: string;   // Category of the E-code
}

interface ECodeProps {
  data: ECodeData;
  expanded?: boolean;  // Optional prop to show expanded view
}

const ECode: React.FC<ECodeProps> = ({ data, expanded = false }) => {
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

  return (
    <article className={`${bgColor} rounded-2xl p-5 border shadow-sm hover:shadow-md transition-shadow duration-300 animate-scale-in h-full text-left`} itemScope itemType="https://schema.org/Thing">
      <div>
        {/* Header with code and name */}
        <div className="mb-3">
          <h3 className="text-xl font-semibold" itemProp="name">{data.code}</h3>
          <p className="text-lg font-medium break-words" itemProp="alternateName">{data.name}</p>
        </div>
        
        {/* Status badge */}
        <div className="mb-3">
          <div className={`inline-flex items-center px-3 py-1 rounded-full ${color}`} itemProp="additionalProperty" itemScope itemType="https://schema.org/PropertyValue">
            <meta itemProp="name" content="Status" />
            <meta itemProp="value" content={text} />
            <Icon className="h-4 w-4 mr-1" />
            <span className="text-sm font-medium">{text}</span>
          </div>
        </div>
      </div>
      
      {/* Usage (from the rawData's Description) */}
      {data.source && (
        <div className="mt-3" itemProp="additionalProperty" itemScope itemType="https://schema.org/PropertyValue">
          <meta itemProp="name" content="Usage" />
          <meta itemProp="value" content={data.source} />
          <p className="text-sm text-muted-foreground"><strong>Usage:</strong> {data.source}</p>
        </div>
      )}
      
      {/* Category if available */}
      {data.category && (
        <div className="mt-2" itemProp="additionalProperty" itemScope itemType="https://schema.org/PropertyValue">
          <meta itemProp="name" content="Category" />
          <meta itemProp="value" content={data.category} />
          <p className="text-sm text-muted-foreground"><strong>Category:</strong> {data.category}</p>
        </div>
      )}
      
      {/* Remarks as a separate section */}
      <div className="mt-2" itemProp="description">
        <p className="text-sm text-muted-foreground">{data.description}</p>
      </div>
    </article>
  );
};

export default ECode;
