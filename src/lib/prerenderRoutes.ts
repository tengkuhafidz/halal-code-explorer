import { ECODE_CATEGORIES } from './categories';
import { getAllECodes } from '../services/eCodeService';

/** Every public, indexable route. Keep in sync with scripts/generate-sitemap.js. */
export function getPrerenderRoutes(): string[] {
  return [
    '/',
    '/all-ecodes',
    '/categories',
    '/about',
    '/privacy-policy',
    ...ECODE_CATEGORIES.map((c) => `/category/${c.slug}`),
    ...getAllECodes().map((e) => `/ecode/${e.code.replace(/^E/, '')}`),
  ];
}
