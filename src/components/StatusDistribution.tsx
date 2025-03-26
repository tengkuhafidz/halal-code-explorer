
import React from 'react';
import { ECodeData } from './ECode';
import { Check, X, AlertTriangle } from 'lucide-react';

interface StatusDistributionProps {
  items: ECodeData[];
}

const StatusDistribution: React.FC<StatusDistributionProps> = ({ items }) => {
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
      {statusInfo.map(({ status, label, count, icon: Icon, color }) => (
        <div 
          key={status}
          className="flex items-center space-x-2 bg-card border rounded-xl py-2 px-4 shadow-sm"
        >
          <div className={`${color} p-1.5 rounded-lg text-white`}>
            <Icon className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-medium">{label}</p>
            <p className="text-2xl font-semibold">{count}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatusDistribution;
