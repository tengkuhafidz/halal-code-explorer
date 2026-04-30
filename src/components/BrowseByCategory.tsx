import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ECODE_CATEGORIES, ECodeCategory } from '../lib/categories';
import { getAllECodes } from '../services/eCodeService';

interface CategoryWithCounts extends ECodeCategory {
  total: number;
  halalCount: number;
  doubtfulCount: number;
}

const BrowseByCategory: React.FC = () => {
  const categories = useMemo<CategoryWithCounts[]>(() => {
    const all = getAllECodes();
    return ECODE_CATEGORIES.map((c) => {
      const inRange = all.filter((item) => {
        const num = parseInt(item.code.replace(/[^0-9]/g, ''), 10);
        return (
          !Number.isNaN(num) && num >= c.rangeStart && num <= c.rangeEnd
        );
      });
      const halalCount = inRange.filter((i) => i.status === 'halal').length;
      return {
        ...c,
        total: inRange.length,
        halalCount,
        doubtfulCount: inRange.length - halalCount,
      };
    });
  }, []);

  return (
    <section
      aria-labelledby="browse-by-category-heading"
      className="py-12 px-4"
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h2
            id="browse-by-category-heading"
            className="text-2xl sm:text-3xl font-bold mb-2"
          >
            Browse by Category
          </h2>
          <p className="text-muted-foreground">
            Explore food additives grouped by their function.
          </p>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <li key={c.slug}>
              <Link
                to={`/category/${c.slug}`}
                className="group block h-full bg-card rounded-2xl p-5 border shadow-sm hover:shadow-md transition-shadow duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                aria-label={`Browse ${c.title} (${c.rangeLabel})`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-lg font-semibold">{c.title}</h3>
                  <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">
                    {c.rangeLabel}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  {c.shortDescription}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-3 text-xs text-muted-foreground">
                    <span>
                      <span className="font-semibold text-halalDark dark:text-halal">
                        {c.halalCount}
                      </span>{' '}
                      halal
                    </span>
                    <span>
                      <span className="font-semibold text-mushboohDark dark:text-mushbooh">
                        {c.doubtfulCount}
                      </span>{' '}
                      doubtful
                    </span>
                  </div>
                  <span className="inline-flex items-center text-xs text-primary opacity-80 group-hover:opacity-100">
                    Browse
                    <ArrowRight
                      className="h-3 w-3 ml-1 transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default BrowseByCategory;
