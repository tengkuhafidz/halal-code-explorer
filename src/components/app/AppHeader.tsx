import { ChevronLeft, Share2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AppHeaderProps {
  title: string;
  backLabel?: string;
  onBack?: () => void;
  onShare?: () => void;
}

export function AppHeader({ title, backLabel, onBack, onShare }: AppHeaderProps) {
  const navigate = useNavigate();
  const handleBack = onBack ?? (() => navigate(-1));
  const showBack = Boolean(backLabel || onBack);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-background border-b"
      style={{ paddingTop: 'env(safe-area-inset-top)' }}
    >
      <div className="h-11 flex items-center justify-between px-4">
        <div className="flex items-center w-20">
          {showBack && (
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center gap-0.5 text-primary -ml-1 active:opacity-60 transition-opacity"
              aria-label="Back"
            >
              <ChevronLeft className="h-6 w-6" />
              {backLabel && <span className="text-[17px]">{backLabel}</span>}
            </button>
          )}
        </div>
        <h1 className="text-[17px] font-semibold text-foreground truncate flex-1 text-center">
          {title}
        </h1>
        <div className="flex items-center justify-end w-20 gap-4">
          {onShare && (
            <button
              type="button"
              onClick={onShare}
              className="text-primary active:opacity-60 transition-opacity"
              aria-label="Share"
            >
              <Share2 className="h-[22px] w-[22px]" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
