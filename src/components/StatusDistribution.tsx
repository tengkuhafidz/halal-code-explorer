
import React from 'react';
import { ECodeData } from './ECode';
import { Check, X, AlertTriangle } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

interface StatusDistributionProps {
  items: ECodeData[];
  activeFilter: string | null;
  onFilterChange: (status: string | null) => void;
}

const StatusDistribution: React.FC<StatusDistributionProps> = ({ items, activeFilter, onFilterChange }) => {
  if (!items || items.length === 0) return null;
  
  const counts = {
    halal: items.filter(item => item.status === 'halal').length,
    haram: items.filter(item => item.status === 'haram').length,
    mushbooh: items.filter(item => item.status === 'mushbooh').length
  };
  
  const statusInfo = [
    {
      status: 'halal',
      label: 'Halal',
      count: counts.halal,
      icon: Check,
      color: 'bg-halal'
    },
    {
      status: 'haram',
      label: 'Haram',
      count: counts.haram,
      icon: X,
      color: 'bg-haram'
    },
    {
      status: 'mushbooh',
      label: 'Mushbooh',
      count: counts.mushbooh,
      icon: AlertTriangle,
      color: 'bg-mushbooh'
    }
  ];
  
  return (
    <div className="flex flex-wrap justify-center gap-4 mt-8">
      <Button 
        variant="outline" 
        className={cn(
          "border-2", 
          activeFilter === null ? "border-primary" : "border-transparent"
        )}
        onClick={() => onFilterChange(null)}
      >
        All ({items.length})
      </Button>
      
      {statusInfo.map(({ status, label, count, icon: Icon, color }) => (
        <Button 
          key={status}
          variant="outline"
          className={cn(
            "flex items-center space-x-2 border-2", 
            activeFilter === status ? "border-primary" : "border-transparent"
          )}
          onClick={() => onFilterChange(status)}
        >
          <div className={`${color} p-1.5 rounded-lg text-white`}>
            <Icon className="h-4 w-4" />
          </div>
          <div className="flex gap-2 items-center">
            <span>{label}</span>
            <span className="text-sm font-medium rounded-full px-2 py-0.5 bg-secondary">
              {count}
            </span>
          </div>
        </Button>
      ))}
    </div>
  );
};

export default StatusDistribution;
