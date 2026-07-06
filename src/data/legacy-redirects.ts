import { getAllProjectSlugs } from './pages';

/** Old WordPress / bookmark URLs → new site routes */
export const LEGACY_REDIRECTS: Record<string, string> = {
  'desigual-rebranding-giuseppe-fioretti': '/work/desigual-rebranding',
  'new-desigual-sneakers-collection': '/work/desigual-sneakers-campaign',
  think_possible: '/work/urees',
  'spiritual-design': '/work/spiritual-design',
  blog: '/journal',
  visceralpoems: '/shop/category/visceral-poems',
  'art-by-giuseppe-fioretti': '/shop/category/paintings',
  cacophobia: '/shop/cacophobia',
  the_conide: '/shop/the-conide',
  'giuseppe-fioretti-career-timeline': '/about',
};

export function getLegacyRedirect(slug: string): string | undefined {
  return LEGACY_REDIRECTS[slug];
}

export function getAllLegacySlugs(): string[] {
  const mapped = Object.keys(LEGACY_REDIRECTS);
  const archiveOnly = getAllProjectSlugs().filter((s) => !LEGACY_REDIRECTS[s]);
  return [...mapped, ...archiveOnly];
}
