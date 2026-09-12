import { ArrowLeft, ChevronRight, Share2 } from 'lucide-react';
import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation, useParams } from 'react-router-dom';
import ECode, { ECodeData } from '../components/ECode';
import { AppLayout } from '../components/app/AppLayout';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { WebLayout } from '../components/web/WebLayout';
import { useAppContext } from '../hooks/use-app-context';
import { ThemeProvider } from '../hooks/use-theme';
import { getCategoryForCode } from '../lib/categories';
import { shareContent } from '../lib/native';
import { showToast } from '../lib/toast';
import { getAllECodes } from '../services/eCodeService';
import {
  SITE_LAST_REVIEWED,
  buildECodeHeading,
  buildECodeMeta,
  buildECodeTitle,
  formatReviewedDate,
  generateBreadcrumbStructuredData,
  getCommonName,
  getECodeSubject,
  getHalalReason,
  getLabelTips,
  hasTrackingParams,
} from '../utils/seoHelpers';

const SITE_ORIGIN = 'https://www.ecodehalalcheck.com';
const MUIS_PDF =
  'https://isomer-user-content.by.gov.sg/48/15766cc5-7b0d-4df0-938e-e61f1cb2b91e/FOOD%20ADDITIVE%20LISTING%205.pdf';

const codeNumber = (code: string): number => parseInt(code.replace(/[^0-9]/g, ''), 10);

const normaliseCode = (raw: string | undefined): string => {
  const upper = (raw || '').toUpperCase();
  const digits = upper.startsWith('E') ? upper.slice(1) : upper;
  return `E${digits.replace(/[A-Z]$/, (m) => m.toLowerCase())}`;
};

const ECodePage: React.FC = () => {
  const { code } = useParams<{ code: string }>();
  const location = useLocation();
  const { isInApp, isWeb } = useAppContext();

  // Data is embedded in the bundle, so resolve it synchronously: no loading
  // state, and the page prerenders with its full content.
  const ecodeData = useMemo<ECodeData | null>(() => {
    const target = normaliseCode(code).toLowerCase();
    return getAllECodes().find((item) => item.code.toLowerCase() === target) ?? null;
  }, [code]);

  const canonicalUrl = useMemo(
    () => `${SITE_ORIGIN}/ecode/${(ecodeData?.code ?? normaliseCode(code)).replace(/^E/, '')}`,
    [ecodeData, code],
  );
  const shouldNoIndex = hasTrackingParams(location.search);

  const category = useMemo(
    () => (ecodeData ? getCategoryForCode(ecodeData.code) : undefined),
    [ecodeData],
  );

  const relatedECodes = useMemo<ECodeData[]>(() => {
    if (!ecodeData || !category) return [];
    const num = codeNumber(ecodeData.code);
    return getAllECodes()
      .filter((item) => item.code !== ecodeData.code)
      .filter((item) => {
        const n = codeNumber(item.code);
        return n >= category.rangeStart && n <= category.rangeEnd;
      })
      .sort((a, b) => Math.abs(codeNumber(a.code) - num) - Math.abs(codeNumber(b.code) - num))
      .slice(0, 6)
      .sort((a, b) => codeNumber(a.code) - codeNumber(b.code));
  }, [ecodeData, category]);

  const handleShare = async () => {
    const result = await shareContent({
      title: `Is ${ecodeData?.code} (${ecodeData?.name}) Halal?`,
      text: `${ecodeData?.code} (${ecodeData?.name}) is ${ecodeData?.status} for Muslims. Check it out!`,
      url: canonicalUrl,
      dialogTitle: 'Share E-Code',
    });
    if (result === 'clipboard') {
      showToast('Link copied to clipboard!');
    }
  };

  const commonName = ecodeData ? getCommonName(ecodeData) : '';
  const pageTitle = ecodeData ? buildECodeTitle(ecodeData) : 'E-Code Not Found | E-Code Halal Check';
  const heading = ecodeData ? buildECodeHeading(ecodeData) : 'E-Code Not Found';
  const metaDescription = ecodeData
    ? buildECodeMeta(ecodeData)
    : 'Find the halal status of food additives and E-codes.';
  const statusLabel = ecodeData?.status === 'halal' ? 'halal' : 'doubtful';
  const halalReason = ecodeData ? getHalalReason(ecodeData) : '';
  const labelTips = ecodeData ? getLabelTips(ecodeData) : [];

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

    const intro = `${ecodeData.code} (${ecodeData.name}) is ${statusLabel} for Muslims according to the MUIS food additive listing.`;
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
  }, [ecodeData, statusLabel]);

  const structuredData = useMemo(() => {
    if (!ecodeData || !faqAnswers) return [];

    const faqData = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: `Is ${getECodeSubject(ecodeData)} halal or haram?`,
          acceptedAnswer: { '@type': 'Answer', text: faqAnswers.isHalal },
        },
        {
          '@type': 'Question',
          name: `Why is ${ecodeData.code} ${statusLabel}?`,
          acceptedAnswer: { '@type': 'Answer', text: halalReason },
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

    const breadcrumbItems: Array<{ name: string; url: string }> = [{ name: 'Home', url: SITE_ORIGIN }];
    if (category) {
      breadcrumbItems.push({ name: category.title, url: `${SITE_ORIGIN}/category/${category.slug}` });
    } else {
      breadcrumbItems.push({ name: 'All E-Codes', url: `${SITE_ORIGIN}/all-ecodes` });
    }
    breadcrumbItems.push({ name: `${ecodeData.code} ${commonName}`, url: canonicalUrl });

    return [faqData, generateBreadcrumbStructuredData(breadcrumbItems)];
  }, [ecodeData, canonicalUrl, faqAnswers, commonName, category, halalReason, statusLabel]);

  const notFoundContent = (
    <div className="text-center py-12 px-4">
      <h1 className="text-2xl font-semibold mb-2">E-Code Not Found</h1>
      <p className="text-muted-foreground mb-6">
        We couldn't find information for the requested E-code.
      </p>
      <Link to="/all-ecodes">
        <Button>Browse all E-codes</Button>
      </Link>
    </div>
  );

  const detailContent = ecodeData && (
    <div className="space-y-8 px-4 py-6">
      {isWeb && (
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
          <ol className="flex flex-wrap items-center gap-1">
            <li>
              <Link to="/" className="hover:text-primary hover:underline">
                Home
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="h-4 w-4" />
            </li>
            <li>
              {category ? (
                <Link to={`/category/${category.slug}`} className="hover:text-primary hover:underline">
                  {category.title}
                </Link>
              ) : (
                <Link to="/all-ecodes" className="hover:text-primary hover:underline">
                  All E-Codes
                </Link>
              )}
            </li>
            <li aria-hidden="true">
              <ChevronRight className="h-4 w-4" />
            </li>
            <li aria-current="page" className="text-foreground font-medium">
              {ecodeData.code}
            </li>
          </ol>
        </nav>
      )}

      {isWeb && (
        <div className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">{heading}</h1>
          <p
            className={`text-lg font-semibold ${
              ecodeData.status === 'halal'
                ? 'text-halalDark dark:text-halal'
                : 'text-mushboohDark dark:text-yellow-300'
            }`}
          >
            {ecodeData.status === 'halal'
              ? `Yes — ${ecodeData.code} (${commonName}) is listed as halal by MUIS.`
              : `${ecodeData.code} (${commonName}) is listed as doubtful by MUIS — its source can vary, so verify before consuming.`}
          </p>
        </div>
      )}

      <div className="lg:max-w-3xl mx-auto">
        <ECode data={ecodeData} expanded={true} />
      </div>

      <div className="lg:max-w-3xl mx-auto">
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle as="h2">
                Why is {ecodeData.code} {statusLabel}?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{halalReason}</p>
            </CardContent>
          </Card>

          {ecodeData.detailedDescription && (
            <Card>
              <CardHeader>
                <CardTitle as="h2">About {commonName}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{ecodeData.detailedDescription}</p>
              </CardContent>
            </Card>
          )}

          {ecodeData.commonFoods && ecodeData.commonFoods.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle as="h2">Commonly Found In</CardTitle>
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

          {(ecodeData.origin || ecodeData.source || ecodeData.isVegan || ecodeData.isVegetarian) && (
            <Card>
              <CardHeader>
                <CardTitle as="h2">Source & Origin</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {ecodeData.origin && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-secondary text-secondary-foreground border border-border text-sm font-medium">
                      {ecodeData.origin}
                    </span>
                  )}
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

          <Card>
            <CardHeader>
              <CardTitle as="h2">How to check on the label</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                {labelTips.map((tip, idx) => (
                  <li key={idx}>{tip}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {(() => {
            const healthNotes = (ecodeData as { healthNotes?: string }).healthNotes;
            return healthNotes && healthNotes.trim() ? (
              <Card>
                <CardHeader>
                  <CardTitle as="h2">Health & Dietary Notes</CardTitle>
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
                <CardTitle as="h2">Alternatives</CardTitle>
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
                            to={`/ecode/${ecodeRef.replace('E', '').toLowerCase()}`}
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
          <h2 className="text-2xl font-semibold mb-4">Frequently asked questions</h2>
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle as="h3">Is {getECodeSubject(ecodeData)} halal or haram?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{faqAnswers?.isHalal}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle as="h3">What is {ecodeData.code}?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{faqAnswers?.whatIs}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle as="h3">Where is {ecodeData.code} commonly found?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{faqAnswers?.commonlyFound}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {relatedECodes.length > 0 && (
        <div className="lg:max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4">
            Related {category ? category.title.toLowerCase() : 'E-codes'}
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {relatedECodes.map((eCode) => (
              <li key={eCode.code}>
                <Link
                  to={`/ecode/${eCode.code.replace('E', '')}`}
                  className="flex items-center justify-between gap-3 rounded-xl border bg-card px-4 py-3 hover:shadow-md transition-shadow"
                >
                  <span className="min-w-0">
                    <span className="block font-semibold">{eCode.code}</span>
                    <span className="block text-sm text-muted-foreground truncate">
                      {getCommonName(eCode)}
                    </span>
                  </span>
                  <span
                    className={`shrink-0 text-xs font-medium px-2 py-1 rounded-full ${
                      eCode.status === 'halal'
                        ? 'bg-green-100 text-halalDark dark:bg-green-900 dark:text-green-100'
                        : 'bg-yellow-100 text-mushboohDark dark:bg-yellow-900 dark:text-yellow-100'
                    }`}
                  >
                    {eCode.status === 'halal' ? 'Halal' : 'Doubtful'}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          {category && (
            <p className="mt-4 text-sm">
              <Link to={`/category/${category.slug}`} className="text-primary hover:underline">
                See all {category.title.toLowerCase()} ({category.rangeLabel}) →
              </Link>
            </p>
          )}
        </div>
      )}

      {isWeb && (
        <div className="flex items-center justify-between lg:max-w-3xl mx-auto">
          <Link to="/">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to search
            </Button>
          </Link>
          <Button variant="ghost" size="sm" onClick={handleShare} className="flex items-center gap-2">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        </div>
      )}

      {isWeb && (
        <div className="text-center text-sm text-muted-foreground my-4" id="data-source">
          Halal status source:{' '}
          <a
            href={MUIS_PDF}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-primary transition-colors"
          >
            MUIS Food Additive Listing
          </a>
          {' · '}
          <time dateTime={SITE_LAST_REVIEWED}>Last reviewed {formatReviewedDate()}</time>
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

  const content = ecodeData ? detailContent : notFoundContent;
  const title = ecodeData?.code ?? 'E-Code';

  return (
    <ThemeProvider>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={metaDescription} />
        {ecodeData ? <link rel="canonical" href={canonicalUrl} /> : <meta name="robots" content="noindex" />}
        {ecodeData && shouldNoIndex && <meta name="robots" content="noindex, follow" />}
        {structuredData.map((data, index) => (
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
