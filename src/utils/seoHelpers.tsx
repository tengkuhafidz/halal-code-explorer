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
  url = "https://www.ecodehalalcheck.com",
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

export const generateOrganizationStructuredData = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "E-Code Halal Check",
  "url": "https://www.ecodehalalcheck.com",
  "logo": {
    "@type": "ImageObject",
    "url": "https://www.ecodehalalcheck.com/apple-touch-icon.png",
    "width": 180,
    "height": 180
  },
  "description": "A free online tool to help Muslims check the halal status of food additives and E-codes, sourced from MUIS (Islamic Religious Council of Singapore).",
  "foundingDate": "2024",
  "areaServed": "Worldwide",
  "serviceType": "Halal Food Information",
  "knowsAbout": [
    "Halal food additives",
    "E-codes",
    "Food ingredients",
    "Islamic dietary guidelines",
    "MUIS halal certification"
  ]
});

export const generateWebsiteStructuredData = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "E-Code Halal Check",
  "url": "https://www.ecodehalalcheck.com",
  "description": "Find the halal status of food additives and E-codes. Comprehensive database sourced from MUIS.",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://www.ecodehalalcheck.com/?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  },
  "publisher": {
    "@type": "Organization",
    "name": "E-Code Halal Check",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.ecodehalalcheck.com/apple-touch-icon.png"
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

interface ArticleData {
  title: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
}

export const generateArticleStructuredData = (article: ArticleData) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": article.title,
  "description": article.description,
  "url": article.url,
  "datePublished": article.datePublished || "2024-01-01",
  "dateModified": article.dateModified || new Date().toISOString().split('T')[0],
  "author": {
    "@type": "Organization",
    "name": "E-Code Halal Check",
    "url": "https://www.ecodehalalcheck.com"
  },
  "publisher": {
    "@type": "Organization",
    "name": "E-Code Halal Check",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.ecodehalalcheck.com/apple-touch-icon.png"
    }
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": article.url
  }
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

interface ECodeProductData {
  code: string;
  name: string;
  description?: string;
  status: 'halal' | 'doubtful';
  category?: string;
}

export const generateProductStructuredData = (eCode: ECodeProductData) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  "name": `${eCode.code} - ${eCode.name}`,
  "description": eCode.description || `${eCode.code} (${eCode.name}) is a food additive with ${eCode.status} status for Muslims.`,
  "category": eCode.category || "Food Additive",
  "brand": {
    "@type": "Brand",
    "name": "E-Code Halal Check"
  },
  "additionalProperty": [
    {
      "@type": "PropertyValue",
      "name": "E-Code",
      "value": eCode.code
    },
    {
      "@type": "PropertyValue",
      "name": "Halal Status",
      "value": eCode.status === 'halal' ? 'Halal' : 'Doubtful'
    }
  ],
  "offers": {
    "@type": "Offer",
    "availability": "https://schema.org/InStock",
    "price": "0",
    "priceCurrency": "USD",
    "description": "Information provided free of charge"
  }
});