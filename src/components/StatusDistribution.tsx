
import React from 'react';
import { ECodeData } from './ECode';
import { Check, AlertTriangle } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { useIsMobile } from '../hooks/use-mobile';

interface StatusDistributionProps {
  items: ECodeData[];
  activeFilter: string | null;
  onFilterChange: (status: string | null) => void;
}

const StatusDistribution: React.FC<StatusDistributionProps> = ({ items, activeFilter, onFilterChange }) => {
  const isMobile = useIsMobile();
  
  if (!items || items.length === 0) {
    return <div className={`flex flex-wrap ${isMobile ? 'justify-start gap-2' : 'justify-center gap-4'} mt-4 mb-2 ${isMobile ? 'h-10' : 'h-12'}`}></div>;
  }
  
  const counts = {
    halal: items.filter(item => item.status === 'halal').length,
    doubtful: items.filter(item => item.status === 'doubtful').length
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
      status: 'doubtful',
      label: 'Doubtful',
      count: counts.doubtful,
      icon: AlertTriangle,
      color: 'bg-mushbooh'
    }
  ];
  
  return (
    <div className={`flex flex-wrap ${isMobile ? 'justify-start gap-2' : 'justify-center gap-4'} mt-4 mb-2`}>
      <Button 
        variant="outline" 
        size={isMobile ? "sm" : "default"}
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
          size={isMobile ? "sm" : "default"}
          className={cn(
            "flex items-center space-x-2 border-2", 
            activeFilter === status ? "border-primary" : "border-transparent"
          )}
          onClick={() => onFilterChange(status)}
        >
          <div className={`${color} p-1.5 rounded-lg text-white`}>
            <Icon className="h-3 w-3" />
          </div>
          <div className="flex gap-1 items-center">
            <span>{isMobile ? "" : label}</span>
            <span className={`text-xs font-medium rounded-full ${isMobile ? "px-1" : "px-2"} py-0.5 bg-secondary`} >
              {count}
            </span>
          </div>
        </Button>
      ))}
    </div>
  );
};

export default StatusDistribution;
