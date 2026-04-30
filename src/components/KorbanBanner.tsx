import React from 'react';
import { Popover, PopoverTrigger, PopoverContent } from './ui/popover';

const KorbanBanner = () => {
  return (
    <div className="px-4 pt-4">
      <div className="max-w-3xl mx-auto">
        <a
          href="https://meem.to/korban-mini-apps"
          target="_blank"
          rel="noopener noreferrer sponsored"
          onClick={() =>
            window.gtag?.('event', 'korban_banner_click', {
              event_category: 'banner',
              event_label: 'korban_2026_palestine',
            })
          }
          className="relative block rounded-xl overflow-hidden border border-emerald-200 dark:border-emerald-900/60 bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-950/40 dark:to-emerald-900/30 hover:shadow-md transition-shadow"
        >
          <span
            aria-label="Sponsored"
            className="absolute top-2 right-2 z-10 rounded-sm bg-emerald-900/10 dark:bg-emerald-50/10 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-emerald-900/60 dark:text-emerald-100/60"
          >
            Ad
          </span>
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
        <div className="mt-1.5 text-right">
          <Popover>
            <PopoverTrigger
              onClick={() =>
                window.gtag?.('event', 'advertise_inquiry_click', {
                  event_category: 'banner',
                  event_label: 'advertise_here_link',
                })
              }
              className="text-[11px] text-muted-foreground hover:text-primary transition-colors"
            >
              Want to advertise here? →
            </PopoverTrigger>
            <PopoverContent align="end" className="w-72 text-sm">
              <div className="font-semibold mb-1">Advertise with us</div>
              <p className="text-muted-foreground text-xs leading-relaxed">
                Reach Muslims globally — <span className="font-medium text-foreground">6.5k–10k+ monthly active users</span> researching halal products. Drop us a note at{' '}
                <a
                  href="mailto:hi@10kb.co?subject=Advertise%20on%20E-Code%20Halal%20Check"
                  onClick={() =>
                    window.gtag?.('event', 'advertise_email_click', {
                      event_category: 'banner',
                      event_label: 'advertise_email_banner',
                    })
                  }
                  className="font-medium text-primary underline"
                >
                  hi@10kb.co
                </a>{' '}
                and we'll get back to you with placements and pricing.
              </p>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default KorbanBanner;
