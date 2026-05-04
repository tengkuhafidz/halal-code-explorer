import { Helmet } from 'react-helmet-async';
import BrowseByCategory from '../components/BrowseByCategory';
import { AppLayout } from '../components/app/AppLayout';
import { WebLayout } from '../components/web/WebLayout';
import { useAppContext } from '../hooks/use-app-context';
import { ThemeProvider } from '../hooks/use-theme';

const SITE_URL = 'https://www.ecodehalalcheck.com';

function CategoriesContent() {
  return (
    <div className="px-4 py-6 sm:py-8">
      <header className="max-w-3xl mx-auto mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Browse by category</h1>
        <p className="text-muted-foreground text-sm sm:text-base">
          Explore food additives grouped by their function — colours, preservatives,
          antioxidants, emulsifiers and more.
        </p>
      </header>
      <BrowseByCategory />
    </div>
  );
}

export default function CategoriesIndex() {
  const { isInApp } = useAppContext();

  return (
    <ThemeProvider>
      <Helmet>
        <title>Categories | E-Code Halal Check</title>
        <meta
          name="description"
          content="Browse halal food additives grouped by category — colours, preservatives, antioxidants, emulsifiers, sweeteners and more."
        />
        <link rel="canonical" href={`${SITE_URL}/categories`} />
      </Helmet>

      {isInApp ? (
        <AppLayout title="Categories">
          <CategoriesContent />
        </AppLayout>
      ) : (
        <WebLayout>
          <CategoriesContent />
        </WebLayout>
      )}
    </ThemeProvider>
  );
}
