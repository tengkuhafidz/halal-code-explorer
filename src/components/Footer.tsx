
import { Suspense, lazy } from 'react';
import { Link, useLocation } from 'react-router-dom';
const CommunityAppsDialog = lazy(() =>
  import('./CommunityAppsDialog').then((m) => ({ default: m.CommunityAppsDialog })),
);

const Footer = () => {
  const location = useLocation();

  return (
    <footer className="py-10 mt-20 border-t">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
        <div className="grid gap-8 md:grid-cols-2 items-start">
          <div className="items-center md:items-start flex flex-col text-center md:text-left">
            <div className="flex items-center space-x-3">
              <img
                src="/logo.webp"
                alt="E-Code Halal Check Logo"
                className="h-8 w-8 rounded"
                width="32"
                height="32"
                loading="lazy"
              />
              <h2 className="text-lg font-bold">E-Code <span className="text-halalDark dark:text-halal">Halal</span> Check</h2>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Helping you make informed choices about food additives.
            </p>
            <p className="text-sm text-muted-foreground mt-1 hidden md:block">
              Built for the community by{' '}
              <a href="https://10kb.co" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: '#049164' }}>10kb.co</a>
              <span className="mx-2 text-muted-foreground/40" aria-hidden="true">|</span>
              <Suspense fallback={<span className="text-muted-foreground">More details</span>}>
                <CommunityAppsDialog />
              </Suspense>
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end text-center md:text-right">
            <div className="flex flex-wrap justify-center md:justify-end gap-4 mb-2">
              <Link
                to="/all-ecodes"
                className="text-sm text-muted-foreground hover:text-primary"
                aria-current={location.pathname === '/all-ecodes' ? 'page' : undefined}
              >
                View All E-Codes
              </Link>
              <Link
                to="/categories"
                className="text-sm text-muted-foreground hover:text-primary"
                aria-current={location.pathname === '/categories' ? 'page' : undefined}
              >
                Browse by Category
              </Link>
              <details className="relative group">
                <summary
                  onClick={() =>
                    window.gtag?.('event', 'advertise_inquiry_click', {
                      event_category: 'footer',
                      event_label: 'advertise_with_us_link',
                    })
                  }
                  className="list-none cursor-pointer text-sm text-muted-foreground hover:text-primary [&::-webkit-details-marker]:hidden"
                >
                  Advertise with us
                </summary>
                <div className="absolute right-0 z-20 mt-2 w-72 rounded-md border bg-popover p-4 text-sm text-left text-popover-foreground shadow-md">
                  <div className="font-semibold mb-1">Advertise with us</div>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    Reach Muslims globally — <span className="font-medium text-foreground">6.5k–10k+ monthly active users</span> researching halal products. Drop us a note at{' '}
                    <a
                      href="mailto:hi@10kb.co?subject=Advertise%20on%20E-Code%20Halal%20Check"
                      onClick={() =>
                        window.gtag?.('event', 'advertise_email_click', {
                          event_category: 'footer',
                          event_label: 'advertise_email_footer',
                        })
                      }
                      className="font-medium text-primary underline"
                    >
                      hi@10kb.co
                    </a>{' '}
                    and we'll get back to you with placements and pricing.
                  </p>
                </div>
              </details>
              <Link
                to="/privacy-policy"
                className="text-sm text-muted-foreground hover:text-primary"
                aria-current={location.pathname === '/privacy-policy' ? 'page' : undefined}
              >
                Privacy Policy
              </Link>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} E-Code Halal Check. All rights reserved.
            </p>
          </div>
        </div>

        <div className="mt-6 pt-5 border-t w-full text-center md:hidden">
          <p className="text-sm font-medium text-muted-foreground">
            Built for the community by{' '}
            <a href="https://10kb.co" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: '#049164' }}>10kb.co</a>
            <span className="mx-2 text-muted-foreground/40" aria-hidden="true">|</span>
            <Suspense fallback={<span className="text-muted-foreground">More details</span>}>
                <CommunityAppsDialog />
              </Suspense>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
