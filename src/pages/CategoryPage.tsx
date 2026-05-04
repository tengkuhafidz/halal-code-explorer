import { AlertTriangle, ArrowLeft, Check } from 'lucide-react';
import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import ECodeListTile from '../components/ECodeListTile';
import { ECodeData } from '../components/ECode';
import { AppLayout } from '../components/app/AppLayout';
import { Button } from '../components/ui/button';
import { WebLayout } from '../components/web/WebLayout';
import { useAppContext } from '../hooks/use-app-context';
import { ThemeProvider } from '../hooks/use-theme';
import { ECODE_CATEGORIES, getCategoryBySlug } from '../lib/categories';
import { getAllECodes } from '../services/eCodeService';
import { generateBreadcrumbStructuredData } from '../utils/seoHelpers';

const SITE_ORIGIN = 'https://www.ecodehalalcheck.com';

const compareByCodeNumber = (a: ECodeData, b: ECodeData): number => {
  const an = parseInt(a.code.replace(/[^0-9]/g, ''), 10);
  const bn = parseInt(b.code.replace(/[^0-9]/g, ''), 10);
  if (an !== bn) return an - bn;
  return a.code.localeCompare(b.code);
};

const CategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const category = getCategoryBySlug(slug);
  const { isInApp, isWeb } = useAppContext();

  const codes = useMemo<ECodeData[]>(() => {
    if (!category) return [];
    return getAllECodes()
      .filter((item) => {
        const num = parseInt(item.code.replace(/[^0-9]/g, ''), 10);
        return !Number.isNaN(num) && num >= category.rangeStart && num <= category.rangeEnd;
      })
      .sort(compareByCodeNumber);
  }, [category]);

  if (!category) {
    const notFoundContent = (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-semibold mb-4">Category Not Found</h1>
        <p className="text-muted-foreground mb-6">
          The category you're looking for doesn't exist.
        </p>
        <div className="flex justify-center gap-3 flex-wrap">
          {ECODE_CATEGORIES.map((c) => (
            <Link key={c.slug} to={`/category/${c.slug}`}>
              <Button variant="outline" size="sm">
                {c.title} ({c.rangeLabel})
              </Button>
            </Link>
          ))}
        </div>
      </div>
    );

    return (
      <ThemeProvider>
        <Helmet>
          <title>Category Not Found | E-Code Halal Check</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        {isInApp ? (
          <AppLayout title="Not Found" backLabel="Categories">
            {notFoundContent}
          </AppLayout>
        ) : (
          <WebLayout>{notFoundContent}</WebLayout>
        )}
      </ThemeProvider>
    );
  }

  const halalCount = codes.filter((c) => c.status === 'halal').length;
  const doubtfulCount = codes.length - halalCount;
  const canonicalUrl = `${SITE_ORIGIN}/category/${category.slug}`;
  const pageTitle = `${category.title} (${category.rangeLabel}) Halal Status | E-Code Halal Check`;
  const metaDescription = `Browse all ${category.title.toLowerCase()} food additives (${category.rangeLabel}) and their halal status. ${category.shortDescription}`;

  const breadcrumbData = generateBreadcrumbStructuredData([
    { name: 'Home', url: SITE_ORIGIN },
    { name: 'Categories', url: `${SITE_ORIGIN}/categories` },
    { name: category.title, url: canonicalUrl },
  ]);

  const itemListData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${category.title} E-Codes (${category.rangeLabel})`,
    description: metaDescription,
    numberOfItems: codes.length,
    itemListElement: codes.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: `${c.code} - ${c.name}`,
      url: `${SITE_ORIGIN}/ecode/${c.code.replace('E', '')}`,
    })),
  };

  const content = (
    <div className="container mx-auto px-4 py-6">
      {isWeb && (
        <div className="mb-6">
          <Link to="/">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to search
            </Button>
          </Link>
        </div>
      )}

      <header className="mb-8">
        <p className="text-sm font-medium text-muted-foreground mb-2">{category.rangeLabel}</p>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">
          {category.title} ({category.rangeLabel})
        </h1>
        <p className="text-muted-foreground max-w-3xl">{category.longDescription}</p>
        <div className="flex flex-wrap gap-2 mt-4 text-sm">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-secondary text-secondary-foreground border border-border">
            {codes.length} E-codes
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-halalDark border border-green-200 dark:bg-green-900 dark:text-green-100 dark:border-green-700">
            <Check className="h-3.5 w-3.5 mr-1" />
            {halalCount} halal
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-yellow-100 text-mushboohDark border border-yellow-200 dark:bg-yellow-900 dark:text-yellow-100 dark:border-yellow-700">
            <AlertTriangle className="h-3.5 w-3.5 mr-1" />
            {doubtfulCount} doubtful
          </span>
        </div>
      </header>

      {codes.length === 0 ? (
        <p className="text-muted-foreground">No E-codes are listed in this range.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {codes.map((c) => (
            <li key={c.code}>
              <ECodeListTile data={c} />
            </li>
          ))}
        </ul>
      )}

      <section className="mt-12">
        <h2 className="text-xl font-semibold mb-4">Other Categories</h2>
        <div className="flex flex-wrap gap-2">
          {ECODE_CATEGORIES.filter((c) => c.slug !== category.slug).map((c) => (
            <Link key={c.slug} to={`/category/${c.slug}`}>
              <Button variant="outline" size="sm">
                {c.title} ({c.rangeLabel})
              </Button>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );

  return (
    <ThemeProvider>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <script type="application/ld+json">{JSON.stringify(breadcrumbData)}</script>
        <script type="application/ld+json">{JSON.stringify(itemListData)}</script>
      </Helmet>

      {isInApp ? (
        <AppLayout title={category.title} backLabel="Categories">
          {content}
        </AppLayout>
      ) : (
        <WebLayout>{content}</WebLayout>
      )}
    </ThemeProvider>
  );
};

export default CategoryPage;
