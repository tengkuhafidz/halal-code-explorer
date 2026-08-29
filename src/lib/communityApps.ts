export interface CommunityApp {
  name: string;
  url: string;
  tagline: string;
  /** App favicon, mirrored into /public/community so the PWA works offline. */
  iconSrc: string;
  gaLabel: string;
}

/**
 * Sibling community apps by 10kb.co, cross-promoted in the web footer and the
 * in-app About screen.
 */
export const COMMUNITY_APPS: CommunityApp[] = [
  {
    name: 'Mahram Check',
    url: 'https://mahramcheck.com',
    tagline: 'Know who your mahram is',
    iconSrc: '/community/mahramcheck.png',
    gaLabel: 'mahram_check',
  },
  {
    name: 'Tahfiz Check',
    url: 'https://tahfizcheck.com',
    tagline: 'Track Quran memorisation progress',
    iconSrc: '/community/tahfizcheck.png',
    gaLabel: 'tahfiz_check',
  },
  {
    name: 'GoMosque.sg',
    url: 'https://gomosque.sg',
    tagline: 'Check in at mosques across Singapore',
    iconSrc: '/community/gomosque.png',
    gaLabel: 'gomosque_sg',
  },
];
