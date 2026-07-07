import { getAllProjectSlugs } from './pages';

/** Old WordPress / bookmark URLs → new site routes */
export const LEGACY_REDIRECTS: Record<string, string> = {
  'desigual-rebranding-giuseppe-fioretti': '/work/desigual-rebranding',
  'new-desigual-sneakers-collection': '/work/desigual-sneakers-campaign',
  think_possible: '/work/urees',
  'spiritual-design': '/work/spiritual-design',
  sec: '/work/sec-brunch',
  'sec-brunch': '/work/sec-brunch',
  blog: '/journal',
  visceralpoems: '/shop',
  'art-by-giuseppe-fioretti': '/shop',
  the_conide: '/the-conide',
  'skin-is-the-new-canvas': '/shop#skin-is-the-new-canvas',
  'pee-pee': '/work/pee-pee',
  'tutti-in-uno': '/shop/tutti-in-uno',
  eyes: '/shop/eyes',
  'art-hag': '/shop/drawing-hag',
  'art-ig-20213': '/shop/artwork-blue-study',
  'art-ig-2021': '/shop/artwork-visual-study',
  'giuseppe-fioretti-career-timeline': '/about/career-timeline',
};

export function getLegacyRedirect(slug: string): string | undefined {
  return LEGACY_REDIRECTS[slug];
}

export function getAllLegacySlugs(): string[] {
  const mapped = Object.keys(LEGACY_REDIRECTS);
  const archiveOnly = getAllProjectSlugs().filter((s) => !LEGACY_REDIRECTS[s]);
  return [...mapped, ...archiveOnly];
}
