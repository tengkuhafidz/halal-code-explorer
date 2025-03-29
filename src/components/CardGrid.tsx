
import React, { useEffect, useState } from 'react';
import ECode, { ECodeData } from './ECode';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from './ui/pagination';

interface CardGridProps {
  items: ECodeData[];
  isLoading: boolean;
}

const ITEMS_PER_PAGE = 9;

const CardGrid: React.FC<CardGridProps> = ({ items, isLoading }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedItems, setPaginatedItems] = useState<ECodeData[]>([]);
  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
  
  // Reset to page 1 when items change (e.g., when filters are applied)
  useEffect(() => {
    setCurrentPage(1);
  }, [items]);

  // Update paginated items when page or items change
  useEffect(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    setPaginatedItems(items.slice(startIndex, endIndex));
    
    // Scroll to top when page changes
    window.scrollTo({
      top: document.getElementById('results-top')?.offsetTop || 0,
      behavior: 'smooth',
    });
  }, [currentPage, items]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderPaginationItems = () => {
    const items = [];
    const maxVisiblePages = 5; // Maximum number of page numbers to show

    // Always show first page
    items.push(
      <PaginationItem key="page-1">
        <PaginationLink 
          isActive={currentPage === 1} 
          onClick={() => handlePageChange(1)}
        >
          1
        </PaginationLink>
      </PaginationItem>
    );

    // Calculate range of pages to show
    let startPage = Math.max(2, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 3);
    
    if (endPage - startPage < maxVisiblePages - 3) {
      startPage = Math.max(2, endPage - (maxVisiblePages - 3) + 1);
    }

    // Show ellipsis if needed
    if (startPage > 2) {
      items.push(
        <PaginationItem key="ellipsis-1">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    // Show page numbers
    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={`page-${i}`}>
          <PaginationLink 
            isActive={currentPage === i} 
            onClick={() => handlePageChange(i)}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    // Show ellipsis if needed
    if (endPage < totalPages - 1) {
      items.push(
        <PaginationItem key="ellipsis-2">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    // Always show last page if there is more than one page
    if (totalPages > 1) {
      items.push(
        <PaginationItem key={`page-${totalPages}`}>
          <PaginationLink 
            isActive={currentPage === totalPages} 
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  };

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
    <div className="pt-4" id="results-top">
      <div className="mb-4 text-sm text-muted-foreground">
        Showing {paginatedItems.length} of {items.length} {items.length === 1 ? 'result' : 'results'}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedItems.map((item) => (
          <ECode key={item.code} data={item} />
        ))}
      </div>
      
      {totalPages > 1 && (
        <Pagination className="my-8">
          <PaginationContent>
            {currentPage > 1 && (
              <PaginationItem>
                <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)} />
              </PaginationItem>
            )}
            
            {renderPaginationItems()}
            
            {currentPage < totalPages && (
              <PaginationItem>
                <PaginationNext onClick={() => handlePageChange(currentPage + 1)} />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default CardGrid;
