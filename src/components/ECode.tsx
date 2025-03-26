
import React from 'react';
import { Check, X, AlertTriangle } from 'lucide-react';

export interface ECodeData {
  code: string;
  name: string;
  description: string;
  status: 'halal' | 'haram' | 'mushbooh';
  source?: string;
}

interface ECodeProps {
  data: ECodeData;
}

const ECode: React.FC<ECodeProps> = ({ data }) => {
  const statusConfig = {
    halal: {
      color: 'bg-halal/10 text-halal border-halal/20',
      icon: Check,
      text: 'Halal',
    },
    haram: {
      color: 'bg-haram/10 text-haram border-haram/20',
      icon: X,
      text: 'Haram',
    },
    mushbooh: {
      color: 'bg-mushbooh/10 text-mushbooh border-mushbooh/20',
      icon: AlertTriangle,
      text: 'Mushbooh (Doubtful)',
    },
  };

  const { color, icon: Icon, text } = statusConfig[data.status];

  return (
    <div className="bg-card rounded-2xl p-5 border shadow-sm hover:shadow-md transition-shadow duration-300 animate-scale-in">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold">{data.code}</h3>
          <p className="text-lg font-medium">{data.name}</p>
        </div>
        <div className={`flex items-center px-3 py-1 rounded-full ${color}`}>
          <Icon className="h-4 w-4 mr-1" />
          <span className="text-sm font-medium">{text}</span>
        </div>
      </div>
      
      <p className="mt-3 text-muted-foreground">{data.description}</p>
      
      {data.source && (
        <p className="mt-2 text-xs text-muted-foreground">
          <span className="font-semibold">Source:</span> {data.source}
        </p>
      )}
    </div>
  );
};

export default ECode;
