import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  structuredData?: Record<string, unknown> | Array<Record<string, unknown>>;
}

export const SEO: React.FC<SEOProps> = ({
  title = "E-Code Halal Check | Find Halal Status of Food Additives",
  description = "Find the halal status of food additives and E-codes. Comprehensive database of food additives with their halal or doubtful status, sources, and detailed information.",
  image = "https://media.publit.io/file/projectassets/ecode-preview-banner.png",
  url = "https://ecodehalalcheck.com",
  type = "website",
  structuredData
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="E-Code Halal Check" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Additional SEO */}
      <link rel="canonical" href={url} />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export const generateWebsiteStructuredData = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "E-Code Halal Check",
  "url": "https://ecodehalalcheck.com",
  "description": "Find the halal status of food additives and E-codes. Comprehensive database sourced from MUIS.",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://ecodehalalcheck.com/?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  },
  "publisher": {
    "@type": "Organization",
    "name": "E-Code Halal Check",
    "logo": {
      "@type": "ImageObject",
      "url": "https://ecodehalalcheck.com/apple-touch-icon.png"
    }
  }
});

export const generateFAQStructuredData = () => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What are E-codes?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "E-codes (E-numbers) are codes for substances used as food additives for use within the European Union and EFTA. They are commonly found on food labels throughout the European Union."
      }
    },
    {
      "@type": "Question",
      "name": "How do I know if an E-code is halal?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Use our E-Code Halal Check database to search for any E-code. Each E-code is marked as either 'halal' or 'doubtful' based on MUIS (Islamic Religious Council of Singapore) guidelines."
      }
    },
    {
      "@type": "Question",
      "name": "What does 'doubtful' status mean?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A 'doubtful' status means the E-code may contain ingredients from animal sources or alcohol, or its source cannot be definitively determined. Muslims are advised to avoid doubtful ingredients when possible."
      }
    },
    {
      "@type": "Question",
      "name": "Is this database reliable?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, our database is sourced from MUIS (Islamic Religious Council of Singapore), a trusted Islamic authority. However, always verify with local halal certification bodies for specific products."
      }
    }
  ]
});

export const generateBreadcrumbStructuredData = (items: Array<{name: string, url: string}>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});