import { ReactNode } from 'react';
import { ECodeData } from '../ECode';
import ECodeListRow from './ECodeListRow';

interface AppECodeListProps {
  items: ECodeData[];
  isLoading?: boolean;
  emptyMessage?: string;
  emptyHint?: string;
  resultsLabel?: ReactNode;
}

export default function AppECodeList({
  items,
  isLoading,
  emptyMessage = 'No results found',
  emptyHint = "Try searching for different E-codes or additives, or check your comma-separated format.",
  resultsLabel,
}: AppECodeListProps) {
  if (isLoading) {
    return (
      <div aria-busy="true" aria-label="Loading E-codes">
        {Array(8)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between gap-3 px-4 py-3 border-b border-border/60"
              aria-hidden="true"
            >
              <div className="flex-1 min-w-0">
                <div className="h-4 w-12 bg-secondary animate-pulse rounded mb-1.5"></div>
                <div className="h-3 w-40 bg-secondary animate-pulse rounded"></div>
              </div>
              <div className="h-5 w-16 bg-secondary animate-pulse rounded-full"></div>
            </div>
          ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-16 px-6" role="status" aria-live="polite">
        <h3 className="text-lg font-medium text-foreground mb-1">{emptyMessage}</h3>
        <p className="text-sm text-muted-foreground max-w-xs mx-auto">{emptyHint}</p>
      </div>
    );
  }

  return (
    <>
      {resultsLabel && (
        <div className="px-4 py-2 text-[12px] text-muted-foreground" role="status" aria-live="polite">
          {resultsLabel}
        </div>
      )}
      <div role="list">
        {items.map((item, idx) => (
          <ECodeListRow key={item.code} data={item} showDivider={idx < items.length - 1} />
        ))}
      </div>
    </>
  );
}
