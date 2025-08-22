import React from 'react';

const ECodeSkeleton: React.FC = () => {
  return (
    <article className="bg-card rounded-2xl p-5 border shadow-sm animate-pulse h-full">
      <div>
        {/* Header with code and name */}
        <div className="mb-3">
          <div className="h-7 w-16 bg-secondary rounded mb-2"></div>
          <div className="h-6 w-48 bg-secondary rounded"></div>
        </div>
        
        {/* Status badge */}
        <div className="mb-3">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-secondary h-8 w-20"></div>
        </div>
      </div>
      
      {/* Usage */}
      <div className="mt-3">
        <div className="h-4 w-full bg-secondary rounded mb-2"></div>
        <div className="h-4 w-3/4 bg-secondary rounded"></div>
      </div>
      
      {/* Category */}
      <div className="mt-2">
        <div className="h-4 w-32 bg-secondary rounded"></div>
      </div>
      
      {/* Description */}
      <div className="mt-2">
        <div className="h-4 w-full bg-secondary rounded mb-2"></div>
        <div className="h-4 w-5/6 bg-secondary rounded"></div>
      </div>
    </article>
  );
};

export default ECodeSkeleton;