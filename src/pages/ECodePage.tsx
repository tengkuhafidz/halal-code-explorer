import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link } from 'react-router-dom';
import { searchECodes } from '../services/eCodeService';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ECode from '../components/ECode';
import { ECodeData } from '../components/ECode';
import { ThemeProvider } from '../hooks/use-theme';
import { ArrowLeft, Share2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';

const ECodePage: React.FC = () => {
  const { code } = useParams<{ code: string }>();
  const [ecodeData, setEcodeData] = useState<ECodeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedECodes, setRelatedECodes] = useState<ECodeData[]>([]);

  useEffect(() => {
    const fetchECodeData = async () => {
      setLoading(true);
      try {
        // Clean up code in case it includes "E" prefix
        const searchCode = code?.toUpperCase().startsWith('E')
          ? code.toUpperCase()
          : `E${code?.toUpperCase()}`;

        const results = await searchECodes(searchCode);

        if (results.length > 0) {
          setEcodeData(results[0]);

          // Find related E-codes (same category or status)
          if (results[0].category) {
            const relatedResults = await searchECodes(results[0].category);
            setRelatedECodes(
              relatedResults
                .filter(item => item.code !== results[0].code)
                .slice(0, 3)
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

  // Handle share functionality
  const handleShare = async () => {
    const shareData = {
      title: `Is ${ecodeData?.code} (${ecodeData?.name}) Halal?`,
      text: `${ecodeData?.code} (${ecodeData?.name}) is ${ecodeData?.status} for Muslims. Check it out!`,
      url: window.location.href
    };

    try {
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        // Use native share dialog if available
        await navigator.share(shareData);
      } else {
        // Fallback to clipboard for desktop browsers
        navigator.clipboard.writeText(window.location.href);
        toast.success('Link copied to clipboard!');
      }
    } catch (error) {
      // User likely canceled sharing, no need to show an error
      console.log('Share canceled or failed:', error);
    }
  };

  // Generate page title
  const getPageTitle = () => {
    if (!ecodeData) return 'E-Code Information | E-Code Halal Check';

    return `Is ${ecodeData.code} (${ecodeData.name}) Halal? ${ecodeData.status === 'halal' ? 'Yes' : 'Doubtful'
      } | E-Code Halal Check`;
  };

  // Generate meta description
  const getMetaDescription = () => {
    if (!ecodeData) return 'Find the halal status of food additives and E-codes.';

    return `${ecodeData.code} (${ecodeData.name}) is ${ecodeData.status} for Muslims. ${ecodeData.description || ''
      } Find comprehensive information about this food additive at E-Code Halal Check.`;
  };

  // Generate structured data for rich results
  const getStructuredData = () => {
    if (!ecodeData) return null;

    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": `Is ${ecodeData.code} (${ecodeData.name}) halal?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `${ecodeData.code} (${ecodeData.name}) is ${ecodeData.status} for Muslims. ${ecodeData.description || ''
              }`
          }
        },
        {
          "@type": "Question",
          "name": `What is ${ecodeData.code}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `${ecodeData.code} is ${ecodeData.name}, which is ${ecodeData.description || 'a food additive used in various products.'
              }`
          }
        }
      ]
    };
  };

  const structuredData = getStructuredData();

  return (
    <ThemeProvider>
      <Helmet>
        <title>{getPageTitle()}</title>
        <meta name="description" content={getMetaDescription()} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={getPageTitle()} />
        <meta property="og:description" content={getMetaDescription()} />
        <meta property="og:url" content={window.location.href} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={getPageTitle()} />
        <meta name="twitter:description" content={getMetaDescription()} />

        {/* Canonical URL */}
        <link rel="canonical" href={window.location.href} />

        {/* Schema.org structured data */}
        {structuredData && (
          <script type="application/ld+json">
            {JSON.stringify(structuredData)}
          </script>
        )}
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-grow container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
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

          {loading ? (
            <div className="animate-pulse bg-card rounded-2xl p-5 border shadow-sm">
              <div className="h-7 w-1/3 bg-secondary rounded mb-2"></div>
              <div className="h-5 w-2/3 bg-secondary rounded mb-4"></div>
              <div className="h-20 w-full bg-secondary rounded"></div>
            </div>
          ) : ecodeData ? (
            <div className="space-y-8">
              <div className="lg:max-w-3xl mx-auto">
                <ECode data={ecodeData} expanded={true} />
              </div>

              <div className="mt-8 lg:max-w-3xl mx-auto">
                <h2 className="text-2xl font-semibold mb-4">Additional Information</h2>

                <div className="grid gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Is {ecodeData.code} halal?</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        {ecodeData.code} ({ecodeData.name}) is {ecodeData.status} for Muslims.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>What is {ecodeData.code}?</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        {ecodeData.code} ({ecodeData.name}) is a food additive used in various products.
                        {ecodeData.description && ` ${ecodeData.description}`}
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Where is {ecodeData.code} commonly found?</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        {ecodeData.code} ({ecodeData.name}) may be found in various food products such as
                        {ecodeData.category ? ` ${ecodeData.category.toLowerCase()} products` : ' processed foods'}.
                        Always read ingredient lists if you're concerned about specific additives.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {relatedECodes.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-2xl font-semibold mb-4">Related E-Codes</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {relatedECodes.map(eCode => (
                      <Link to={`/ecode/${eCode.code.replace('E', '')}`} key={eCode.code}>
                        <ECode data={eCode} />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold mb-2">E-Code Not Found</h2>
              <p className="text-muted-foreground mb-6">
                We couldn't find information for the requested E-code.
              </p>
              <Link to="/">
                <Button>Return to Search</Button>
              </Link>
            </div>
          )}
        </main>

        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-sm text-muted-foreground my-4" id="data-source">
            Data source: <a
              href="https://isomer-user-content.by.gov.sg/48/15766cc5-7b0d-4df0-938e-e61f1cb2b91e/FOOD%20ADDITIVE%20LISTING%205.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-primary transition-colors"
            >
              MUIS
            </a>
          </div>
        </div>

        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default ECodePage;
