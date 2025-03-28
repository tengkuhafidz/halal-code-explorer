
import React from 'react';
import ECode, { ECodeData } from './ECode';

interface CardGridProps {
  items: ECodeData[];
  isLoading: boolean;
}

const CardGrid: React.FC<CardGridProps> = ({ items, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {Array(6).fill(0).map((_, i) => (
          <div key={i} className="bg-card rounded-2xl p-5 border shadow-sm">
            <div className="flex justify-between items-start">
              <div className="w-full">
                <div className="h-7 w-16 bg-secondary animate-shimmer bg-[length:400%_100%] rounded mb-2"></div>
                <div className="h-6 w-40 bg-secondary animate-shimmer bg-[length:400%_100%] rounded"></div>
              </div>
              <div className="h-7 w-20 bg-secondary animate-shimmer bg-[length:400%_100%] rounded-full"></div>
            </div>
            <div className="h-20 w-full bg-secondary animate-shimmer bg-[length:400%_100%] rounded mt-3"></div>
          </div>
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-12 mt-4">
        <div className="mx-auto h-24 w-24 text-muted-foreground opacity-20">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="mt-4 text-xl font-medium text-muted-foreground">No results found</h3>
        <p className="mt-2 text-muted-foreground">
          Try searching for different E-codes or additives, or check your comma-separated format.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
      {items.map((item) => (
        <ECode key={item.code} data={item} />
      ))}
    </div>
  );
};

export default CardGrid;
