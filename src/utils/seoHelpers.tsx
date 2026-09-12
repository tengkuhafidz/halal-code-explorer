import React from 'react';
import { Helmet } from 'react-helmet-async';

const SITE_ORIGIN = 'https://www.ecodehalalcheck.com';

const TRACKING_PARAM_NAMES = new Set([
  'ref', 'trk', 'fbclid', 'gclid', 'gbraid', 'wbraid', 'msclkid',
  'mc_cid', 'mc_eid', '_hsenc', '_hsmi', 'yclid', 'dclid', 'igshid',
]);

const isTrackingParam = (key: string): boolean =>
  key.startsWith('utm_') || TRACKING_PARAM_NAMES.has(key);

export const hasTrackingParams = (search: string): boolean => {
  if (!search) return false;
  const params = new URLSearchParams(search);
  for (const key of params.keys()) {
    if (isTrackingParam(key)) return true;
  }
  return false;
};

export const buildCanonicalUrl = (
  pathname: string,
  search: string = '',
  allowedParams: string[] = [],
): string => {
  const allowed = new Set(allowedParams);
  const params = new URLSearchParams(search);
  const out = new URLSearchParams();
  for (const key of allowed) {
    const value = params.get(key);
    if (value) out.set(key, value);
  }
  const qs = out.toString();
  return `${SITE_ORIGIN}${pathname}${qs ? `?${qs}` : ''}`;
};

/**
 * Minimal shape needed to derive a human-friendly common name and SEO copy
 * for an E-code, without coupling these helpers to the full ECodeData type.
 */
export interface NamedECode {
  code: string;
  name: string;
  commonName?: string;
  status?: 'halal' | 'doubtful';
  source?: string;
  origin?: string;
}

/**
 * Cleans a raw Chemical_Name into a readable label:
 * strips "(C.I. 16035)"-style parentheticals and trailing asterisks,
 * and normalises slash-separated aliases to " / ".
 */
const cleanChemicalName = (raw: string): string =>
  raw
    .replace(/\([^)]*\)/g, '') // drop parentheticals like "(C.I. 75300)"
    .replace(/\*/g, '')
    .replace(/\s*\/\s*/g, ' / ')
    .replace(/\s+/g, ' ')
    .trim();

/**
 * Returns the best common/search name for an E-code, capped to the primary
 * name plus one alias so titles and snippets stay readable. Prefers a curated
 * `commonName` (for messy priority entries) and otherwise cleans the raw name.
 */
export const getCommonName = (ecode: NamedECode): string => {
  const base = ecode.commonName?.trim() || cleanChemicalName(ecode.name);
  const parts = base
    .split(' / ')
    .map((part) => part.trim())
    .filter(Boolean);
  return parts.slice(0, 2).join(' / ') || ecode.name;
};

/** Date the halal-status data and page copy were last reviewed (ISO). */
export const SITE_LAST_REVIEWED = '2026-09-12';

export const formatReviewedDate = (iso: string = SITE_LAST_REVIEWED): string =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });

/**
 * People search short ingredient names by name ("is pectin halal") and
 * obscure ones by E-number ("e476 halal"). Lead with whichever the searcher
 * is likelier to type: the common name when it is short, else the E-number.
 */
/**
 * Shorter name for titles/H1s, so they stay inside Google's ~60-char display
 * limit: the first alias when it is short, otherwise the shortest alias.
 */
export const getTitleName = (ecode: NamedECode): string => {
  const base = ecode.commonName?.trim() || cleanChemicalName(ecode.name);
  const parts = base
    .split(' / ')
    .map((part) => part.trim())
    .filter(Boolean);
  if (parts.length === 0) return ecode.name;
  const [first] = parts;
  if (first.length <= 30) {
    const two = parts.slice(0, 2).join(' / ');
    return two.length <= 40 ? two : first;
  }
  return parts.reduce((a, b) => (b.length < a.length ? b : a));
};

const nameLeads = (ecode: NamedECode): boolean => getTitleName(ecode).length <= 28;

/** "Pectin (E440a)" or "E476 (PGPR)": the subject as a searcher would type it. */
export const getECodeSubject = (ecode: NamedECode): string => {
  const name = getTitleName(ecode);
  return nameLeads(ecode) ? `${name} (${ecode.code})` : `${ecode.code} (${name})`;
};
const subject = getECodeSubject;

/**
 * SEO title in the format searchers use, with the "Halal or Haram?" intent
 * phrasing. Drops the brand suffix when it would push the title well past
 * Google's ~60–70 char display limit.
 */
export const buildECodeTitle = (ecode: NamedECode): string => {
  const base = `Is ${subject(ecode)} Halal or Haram?`;
  const withBrand = `${base} | E-Code Halal Check`;
  return withBrand.length <= 70 ? withBrand : base;
};

/** On-page H1, matching the title's subject order. */
export const buildECodeHeading = (ecode: NamedECode): string => `Is ${subject(ecode)} Halal?`;

export interface ReasonedECode extends NamedECode {
  halalNotes?: string;
  commonFoods?: string[];
}

const ORIGIN_REASON: Record<string, { halal: string; doubtful: string }> = {
  'plant-based': {
    halal: 'It is derived from plant material and its normal production involves no animal-derived ingredients.',
    doubtful:
      'Although the base material is plant-derived, some production routes use animal-derived processing aids or carriers, and the E-number does not identify the producer.',
  },
  mineral: {
    halal: 'It is a mineral (inorganic) substance and no animal material is involved in producing it.',
    doubtful: 'Some grades are processed with aids or carriers of unspecified origin, and the E-number does not identify the producer.',
  },
  synthetic: {
    halal: 'It is manufactured synthetically from non-animal raw materials.',
    doubtful:
      'Although it is made synthetically, some production routes use animal-derived processing aids or carriers, and the E-number does not identify the producer.',
  },
  microbial: {
    halal: 'It is produced by fermentation and no animal material is involved in its normal production.',
    doubtful:
      'It is produced by fermentation, and the fermentation medium, nutrients and processing aids vary by manufacturer and can include animal-derived ingredients. The additive itself is not haram; its status depends on how the producer makes it.',
  },
  'animal-derived': {
    halal: 'Its animal source is one that is permissible, so the additive is accepted as halal.',
    doubtful:
      'It can be obtained from animals, and the E-number does not say which animal or whether it was slaughtered according to Islamic law. It is halal only when it comes from a permissible source.',
  },
};

const originKey = (origin?: string): string => {
  const o = (origin || '').toLowerCase();
  if (o.includes(' or ')) return 'mixed';
  for (const key of Object.keys(ORIGIN_REASON)) if (o.includes(key)) return key;
  return 'unknown';
};

/**
 * Plain-language explanation of why MUIS lists the additive as halal or
 * doubtful. Uses the curated note when one exists, otherwise derives a
 * careful generic explanation from the additive's origin.
 */
export const getHalalReason = (ecode: ReasonedECode): string => {
  if (ecode.halalNotes?.trim()) return ecode.halalNotes.trim();
  const status = ecode.status === 'halal' ? 'halal' : 'doubtful';
  const key = originKey(ecode.origin);
  const lead =
    status === 'halal'
      ? `MUIS lists ${ecode.code} (${getCommonName(ecode)}) as halal.`
      : `MUIS lists ${ecode.code} (${getCommonName(ecode)}) as doubtful (mashbooh), which means the source cannot be confirmed from the E-number alone — not that it is haram.`;
  let why: string;
  if (key === 'mixed') {
    why =
      status === 'halal'
        ? `It can be made from ${(ecode.origin || '').toLowerCase()} materials, none of which raise a halal concern in normal production.`
        : `It can be made from ${(ecode.origin || '').toLowerCase()} materials, so the same E-number may be halal from one manufacturer and not from another.`;
  } else if (key === 'unknown') {
    why =
      status === 'halal'
        ? 'Its normal production does not involve animal-derived ingredients.'
        : 'Some production routes may involve animal-derived ingredients or processing aids.';
  } else {
    why = ORIGIN_REASON[key][status];
  }
  const close =
    status === 'halal'
      ? 'The status applies to the additive itself; the finished product still needs its other ingredients checked.'
      : 'The reliable check is a recognised halal certification logo on the finished product, or a manufacturer statement of the source.';
  return `${lead} ${why} ${close}`;
};

/** Practical checks a shopper can do with the packaging in hand. */
export const getLabelTips = (ecode: ReasonedECode): string[] => {
  if (ecode.status === 'halal') {
    return [
      `${ecode.code} on its own is not a reason to avoid a product.`,
      'The finished product still needs its other ingredients checked — look for a halal certification logo (MUIS, JAKIM, MUI, HMC or similar) when in doubt.',
      'Halal status here follows the MUIS food additive listing; rulings can differ between certification bodies.',
    ];
  }
  return [
    'Look for a recognised halal certification logo (MUIS, JAKIM, MUI, HMC or similar) on the packaging — certified products have had the source of this additive verified.',
    "Check whether the label states the origin, for example 'vegetable origin', 'plant-based' or 'soy'.",
    'If there is no certification and the origin is not stated, contact the manufacturer or choose a product with a halal alternative.',
  ];
};

/**
 * Meta description: verdict first (what searchers want), then the one-line
 * reason and where the additive is found. Kept under ~160 characters.
 */
export const buildECodeMeta = (ecode: ReasonedECode): string => {
  const name = getCommonName(ecode);
  const verdict =
    ecode.status === 'halal'
      ? `${ecode.code} (${name}) is halal according to MUIS.`
      : `${ecode.code} (${name}) is listed as doubtful (mashbooh) by MUIS.`;
  const kind = (ecode.source || 'food additive').toLowerCase();
  const origin = ecode.origin ? ` ${ecode.origin.toLowerCase()}` : '';
  const article = /^[aeiou]/i.test((origin || kind).trim()) ? 'An' : 'A';
  const tail =
    ecode.status === 'halal' ? ' Source, uses and label tips.' : ' Why it is doubtful and what to check on the label.';
  const foods = ecode.commonFoods ?? [];
  // Prefer the fullest description that fits in ~160 chars; never cut mid-sentence.
  for (let n = Math.min(3, foods.length); n >= 0; n -= 1) {
    const where = n > 0 ? ` found in ${foods.slice(0, n).join(', ')}` : '';
    const full = `${verdict} ${article}${origin} ${kind}${where}.${tail}`;
    if (full.length <= 160) return full;
    const short = `${verdict} ${article}${origin} ${kind}${where}.`;
    if (short.length <= 160) return short;
  }
  return verdict.length <= 160 ? verdict : `${verdict.slice(0, 157).replace(/\s+\S*$/, '')}…`;
};

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
  "url": "https://www.ecodehalalcheck.com/",
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
  "url": "https://www.ecodehalalcheck.com/",
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
