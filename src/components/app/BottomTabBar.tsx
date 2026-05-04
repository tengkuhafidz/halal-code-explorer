import { Info, LayoutGrid, List, Search } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const TABS = [
  { to: '/', icon: Search, label: 'Search', match: (p: string) => p === '/' || p.startsWith('/ecode') },
  { to: '/all-ecodes', icon: List, label: 'Browse', match: (p: string) => p === '/all-ecodes' },
  { to: '/categories', icon: LayoutGrid, label: 'Categories', match: (p: string) => p.startsWith('/category') || p === '/categories' },
  { to: '/about', icon: Info, label: 'About', match: (p: string) => p === '/about' || p === '/privacy-policy' },
];

export function BottomTabBar() {
  const { pathname } = useLocation();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="h-[49px] flex">
        {TABS.map(({ to, icon: Icon, label, match }) => {
          const active = match(pathname);
          return (
            <Link
              key={to}
              to={to}
              className={`flex-1 flex flex-col items-center justify-center gap-0.5 active:opacity-60 transition-opacity ${
                active ? 'text-primary' : 'text-muted-foreground'
              }`}
              aria-current={active ? 'page' : undefined}
            >
              <Icon className="h-6 w-6" strokeWidth={active ? 2.25 : 2} />
              <span className={`text-[10px] ${active ? 'font-semibold' : 'font-medium'}`}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
