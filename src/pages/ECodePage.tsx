import { ArrowLeft, Share2 } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import ECode, { ECodeData } from '../components/ECode';
import ECodeSkeleton from '../components/ECodeSkeleton';
import { AppLayout } from '../components/app/AppLayout';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { WebLayout } from '../components/web/WebLayout';
import { useAppContext } from '../hooks/use-app-context';
import { ThemeProvider } from '../hooks/use-theme';
import { shareContent } from '../lib/native';
import { searchECodes } from '../services/eCodeService';
import {
  generateBreadcrumbStructuredData,
  generateProductStructuredData,
  hasTrackingParams,
} from '../utils/seoHelpers';

const ECodePage: React.FC = () => {
  const { code } = useParams<{ code: string }>();
  const location = useLocation();
  const { isInApp, isWeb } = useAppContext();
  const [ecodeData, setEcodeData] = useState<ECodeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedECodes, setRelatedECodes] = useState<ECodeData[]>([]);
  const canonicalUrl = useMemo(() => {
    const baseUrl = 'https://www.ecodehalalcheck.com';
    const cleanCode = code?.toUpperCase().replace('E', '');
    return `${baseUrl}/ecode/${cleanCode}`;
  }, [code]);
  const shouldNoIndex = hasTrackingParams(location.search);

  const [currentUrl] = useState(() => window.location.href);

  useEffect(() => {
    const fetchECodeData = async () => {
      setLoading(true);
      try {
        const searchCode = code?.toUpperCase().startsWith('E')
          ? code.toUpperCase()
          : `E${code?.toUpperCase()}`;

        const results = await searchECodes(searchCode);

        if (results.length > 0) {
          setEcodeData(results[0]);

          if (results[0].category) {
            const relatedResults = await searchECodes(results[0].category);
            setRelatedECodes(
              relatedResults
                .filter((item) => item.code !== results[0].code)
                .slice(0, 3),
            );
          }
        }
      } catch (error) {
        console.error('Error fetching E-code data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (code) {
      fetchECodeData();
    }
  }, [code]);

  const handleShare = async () => {
    const result = await shareContent({
      title: `Is ${ecodeData?.code} (${ecodeData?.name}) Halal?`,
      text: `${ecodeData?.code} (${ecodeData?.name}) is ${ecodeData?.status} for Muslims. Check it out!`,
      url: currentUrl,
      dialogTitle: 'Share E-Code',
    });
    if (result === 'clipboard') {
      toast.success('Link copied to clipboard!');
    }
  };

  const pageTitle = useMemo(() => {
    if (!ecodeData) return 'E-Code Information | E-Code Halal Check';
    return `Is ${ecodeData.code} (${ecodeData.name}) Halal? ${
      ecodeData.status === 'halal' ? 'Yes' : 'Doubtful'
    } | E-Code Halal Check`;
  }, [ecodeData]);

  const metaDescription = useMemo(() => {
    if (!ecodeData) return 'Find the halal status of food additives and E-codes.';
    return `${ecodeData.code} (${ecodeData.name}) is ${ecodeData.status} for Muslims. ${
      ecodeData.description || ''
    } Find comprehensive information about this food additive at E-Code Halal Check.`;
  }, [ecodeData]);

  const faqAnswers = useMemo(() => {
    if (!ecodeData) return null;

    const formatList = (items: string[] | undefined): string => {
      if (!items || items.length === 0) return '';
      if (items.length === 1) return items[0];
      if (items.length === 2) return `${items[0]} and ${items[1]}`;
      return `${items.slice(0, -1).join(', ')}, and ${items[items.length - 1]}`;
    };

    const firstSentence = (text: string | undefined): string => {
      if (!text) return '';
      const m = text.match(/^[^.!?]+[.!?]/);
      return (m ? m[0] : text).trim();
    };

    const statusLabel = ecodeData.status === 'halal' ? 'halal' : 'doubtful';
    const intro = `${ecodeData.code} (${ecodeData.name}) is ${statusLabel} for Muslims.`;
    const detailedFirst = firstSentence(ecodeData.detailedDescription);

    const isHalal = detailedFirst
      ? `${intro} ${detailedFirst}`
      : `${intro}${ecodeData.description ? ` ${ecodeData.description}` : ''}`;

    const whatIs =
      ecodeData.detailedDescription ||
      `${ecodeData.code} (${ecodeData.name}) is a food additive used in various products.${
        ecodeData.description ? ` ${ecodeData.description}` : ''
      }`;

    const foodsList = formatList(ecodeData.commonFoods);
    const commonlyFound = foodsList
      ? `${ecodeData.code} is commonly found in ${foodsList}.`
      : `${ecodeData.code} (${ecodeData.name}) may be found in various processed foods. Always read ingredient lists if you're concerned about specific additives.`;

    return { isHalal, whatIs, commonlyFound };
  }, [ecodeData]);

  const structuredData = useMemo(() => {
    if (!ecodeData || !faqAnswers) return [];

    const faqData = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: `Is ${ecodeData.code} (${ecodeData.name}) halal?`,
          acceptedAnswer: { '@type': 'Answer', text: faqAnswers.isHalal },
        },
        {
          '@type': 'Question',
          name: `What is ${ecodeData.code}?`,
          acceptedAnswer: { '@type': 'Answer', text: faqAnswers.whatIs },
        },
        {
          '@type': 'Question',
          name: `Where is ${ecodeData.code} commonly found?`,
          acceptedAnswer: { '@type': 'Answer', text: faqAnswers.commonlyFound },
        },
      ],
    };

    const categoryLabel = ecodeData.category || ecodeData.source;
    const breadcrumbItems: Array<{ name: string; url: string }> = [
      { name: 'Home', url: 'https://www.ecodehalalcheck.com' },
    ];
    if (categoryLabel) {
      breadcrumbItems.push({
        name: categoryLabel,
        url: `https://www.ecodehalalcheck.com/all-ecodes`,
      });
    }
    breadcrumbItems.push({
      name: `${ecodeData.code} ${ecodeData.name}`,
      url: canonicalUrl,
    });
    const breadcrumbData = generateBreadcrumbStructuredData(breadcrumbItems);

    const productData = generateProductStructuredData({
      code: ecodeData.code,
      name: ecodeData.name,
      description: ecodeData.description,
      status: ecodeData.status as 'halal' | 'doubtful',
      category: ecodeData.category,
    });

    return [faqData, breadcrumbData, productData];
  }, [ecodeData, canonicalUrl, faqAnswers]);

  const loadingContent = (
    <div className="space-y-8 px-4 py-6">
      <div className="lg:max-w-3xl mx-auto">
        <ECodeSkeleton />
      </div>
      <div className="mt-8 lg:max-w-3xl mx-auto">
        <div className="h-8 w-64 bg-secondary rounded mb-4 animate-pulse"></div>
        <div className="grid gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-6 w-48 bg-secondary rounded"></div>
              </CardHeader>
              <CardContent>
                <div className="h-4 w-full bg-secondary rounded mb-2"></div>
                <div className="h-4 w-3/4 bg-secondary rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  const notFoundContent = (
    <div className="text-center py-12 px-4">
      <h2 className="text-2xl font-semibold mb-2">E-Code Not Found</h2>
      <p className="text-muted-foreground mb-6">
        We couldn't find information for the requested E-code.
      </p>
      <Link to="/">
        <Button>Return to Search</Button>
      </Link>
    </div>
  );

  const detailContent = ecodeData && (
    <div className="space-y-8 px-4 py-6">
      {isWeb && (
        <div className="flex items-center justify-between">
          <Link to="/">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to search
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleShare}
            className="flex items-center gap-2"
          >
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        </div>
      )}

      {isWeb && (
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">
          Is {ecodeData.code} Halal?
        </h1>
      )}

      <div className="lg:max-w-3xl mx-auto">
        <ECode data={ecodeData} expanded={true} />
      </div>

      <div className="lg:max-w-3xl mx-auto">
        <div className="grid gap-6">
          {ecodeData.detailedDescription && (
            <Card>
              <CardHeader>
                <CardTitle>About {ecodeData.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{ecodeData.detailedDescription}</p>
              </CardContent>
            </Card>
          )}

          {ecodeData.commonFoods && ecodeData.commonFoods.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Commonly Found In</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  {ecodeData.commonFoods.map((food, idx) => (
                    <li key={idx}>{food}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {(ecodeData.source || ecodeData.isVegan || ecodeData.isVegetarian) && (
            <Card>
              <CardHeader>
                <CardTitle>Source & Origin</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {ecodeData.source && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-secondary text-secondary-foreground border border-border text-sm font-medium">
                      {ecodeData.source}
                    </span>
                  )}
                  {ecodeData.isVegan && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 border border-green-200 dark:border-green-700 text-sm font-medium">
                      Vegan
                    </span>
                  )}
                  {ecodeData.isVegetarian && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 border border-green-200 dark:border-green-700 text-sm font-medium">
                      Vegetarian
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {(() => {
            const healthNotes = (ecodeData as { healthNotes?: string }).healthNotes;
            return healthNotes && healthNotes.trim() ? (
              <Card>
                <CardHeader>
                  <CardTitle>Health & Dietary Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{healthNotes}</p>
                </CardContent>
              </Card>
            ) : null;
          })()}

          {ecodeData.alternatives && ecodeData.alternatives.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Alternatives</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {ecodeData.alternatives.map((alt, idx) => {
                    const match = alt.match(/E\d+[a-z]?/i);
                    const isLast = idx === ecodeData.alternatives!.length - 1;
                    const separator = isLast ? '' : ', ';
                    if (match) {
                      const ecodeRef = match[0].toUpperCase();
                      return (
                        <React.Fragment key={idx}>
                          <Link
                            to={`/ecode/${ecodeRef.replace('E', '')}`}
                            className="text-primary hover:underline"
                          >
                            {alt}
                          </Link>
                          {separator}
                        </React.Fragment>
                      );
                    }
                    return (
                      <React.Fragment key={idx}>
                        {alt}
                        {separator}
                      </React.Fragment>
                    );
                  })}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {isWeb && (
        <div className="lg:max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4">Additional Information</h2>
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Is {ecodeData.code} halal?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{faqAnswers?.isHalal}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>What is {ecodeData.code}?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{faqAnswers?.whatIs}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Where is {ecodeData.code} commonly found?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{faqAnswers?.commonlyFound}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {relatedECodes.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Related E-Codes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relatedECodes.map((eCode) => (
              <Link to={`/ecode/${eCode.code.replace('E', '')}`} key={eCode.code}>
                <ECode data={eCode} />
              </Link>
            ))}
          </div>
        </div>
      )}

      {isWeb && (
        <div className="text-center text-sm text-muted-foreground my-4" id="data-source">
          Data source:{' '}
          <a
            href="https://isomer-user-content.by.gov.sg/48/15766cc5-7b0d-4df0-938e-e61f1cb2b91e/FOOD%20ADDITIVE%20LISTING%205.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-primary transition-colors"
          >
            MUIS
          </a>
        </div>
      )}

      {isWeb && (
        <p className="text-center text-xs text-muted-foreground max-w-2xl mx-auto">
          Information on this page is for general reference only. Halal-status data is sourced from
          MUIS. For current regulatory status, allergen warnings, or dietary advice, please consult
          your local food safety authority or a qualified professional.
        </p>
      )}
    </div>
  );

  const content = loading ? loadingContent : ecodeData ? detailContent : notFoundContent;
  const title = ecodeData?.code ?? 'E-Code';

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
        {shouldNoIndex && <meta name="robots" content="noindex, follow" />}
        {structuredData &&
          structuredData.map((data, index) => (
            <script key={index} type="application/ld+json">
              {JSON.stringify(data)}
            </script>
          ))}
      </Helmet>

      {isInApp ? (
        <AppLayout title={title} backLabel="Search" onShare={ecodeData ? handleShare : undefined}>
          {content}
        </AppLayout>
      ) : (
        <WebLayout>{content}</WebLayout>
      )}
    </ThemeProvider>
  );
};

export default ECodePage;
