import React from 'react';

const KorbanBanner = () => {
  return (
    <div className="px-4 pt-4">
      <a
        href="https://korban.usemeem.com/select-livestock?type=palestine&ref=tengku-hafidz"
        target="_blank"
        rel="noopener noreferrer"
        onClick={() =>
          window.gtag?.('event', 'korban_banner_click', {
            event_category: 'banner',
            event_label: 'korban_2026_palestine',
          })
        }
        className="block max-w-3xl mx-auto rounded-xl overflow-hidden border border-emerald-200 dark:border-emerald-900/60 bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-950/40 dark:to-emerald-900/30 hover:shadow-md transition-shadow"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 p-4 md:p-5">
          <div className="flex items-center gap-3 md:gap-4 min-w-0">
            <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white text-xl sm:text-2xl">
              🐑
            </div>
            <div className="min-w-0 text-left">
              <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
                <span>Korban 2026 · For Palestine</span>
                <span aria-label="Palestine flag">🇵🇸</span>
              </div>
              <div className="text-sm md:text-base font-medium text-emerald-950 dark:text-emerald-50 text-left">
                Share the blessings of Eid with families in Palestine
              </div>
            </div>
          </div>
          <span className="shrink-0 self-stretch sm:self-auto inline-flex items-center justify-center rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-4 py-2 transition-colors">
            Book Korban →
          </span>
        </div>
      </a>
    </div>
  );
};

export default KorbanBanner;
