export const SITE = {
  name: 'Fiogiuseppe',
  title: 'Giuseppe Fioretti — Designer, Art Director, Artist',
  description:
    'The creative universe of Giuseppe Fioretti — branding, campaigns, art direction, original artworks and UREES.',
  url: 'https://fiogiuseppe.vercel.app',
  email: 'hey@fiogiuseppe.com',
  contactEmail: 'fiogiuseppe@gmail.com',
  instagram: 'https://www.instagram.com/fiogiuseppe/',
  location: 'Copenhagen',
} as const;

/** High-res author portrait for Journal (fiogiuseppe.com). */
export const JOURNAL_AUTHOR_PORTRAIT =
  'https://fiogiuseppe.com/wp-content/uploads/2025/07/Giuseppe_Fioretti.png';

/** Giuseppe's Medium profile photo — from https://medium.com/@fiogiuseppe RSS */
export const MEDIUM_AUTHOR_PORTRAIT =
  'https://cdn-images-1.medium.com/fit/c/300/300/0*zk9JlJODJoO6qCUh';

export type NavItem = {
  readonly label: string;
  readonly href: string;
};

export const NAV: readonly NavItem[] = [
  { label: 'Work', href: '/work' },
  { label: 'Services', href: '/services' },
  { label: 'Shop', href: '/shop' },
  { label: 'Journal', href: '/journal' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const;

/** Legacy WordPress clone data — used by /archive */
export const WP = 'https://fiogiuseppe.com/wp-content/uploads';

export const FOOTER_LINKS = [
  { label: 'BLOG', href: '/archive/blog' },
  { label: 'SPIRITUAL DESIGN', href: '/archive/spiritual-design' },
  { label: 'UREES', href: '/urees' },
  { label: 'VISCERAL POEMS', href: '/archive/visceralpoems' },
  { label: 'SOME ART', href: '/archive/art-by-giuseppe-fioretti' },
  { label: 'THE CONIDE', href: '/the-conide' },
  { label: 'CAREER TIMELINE', href: '/archive/giuseppe-fioretti-career-timeline' },
] as const;

export const OTHER_WORKS = [
  {
    href: '/work/zalio',
    image: `${WP}/2022/11/zalio_ig_fio-1-scaled.jpg`,
    alt: 'Zalio by Giuseppe Fió',
    external: false,
  },
  {
    href: '/work/sec-brunch',
    image: `${WP}/2024/06/sec-ig4-scaled.jpg`,
    alt: 'Sec Brunch branding',
    external: false,
  },
  {
    href: '/archive/marianna-carolina-sale',
    image: `${WP}/2021/05/mariannacarolinasale.gif`,
    alt: 'Marianna Carolina Sale',
    external: false,
  },
  {
    href: '/urees',
    image: `${WP}/2024/06/Screenshot-2024-06-19-at-11.35.03.png`,
    alt: 'Urees logo',
    external: false,
  },
  {
    href: '/work/menomale',
    image: `${WP}/2024/06/Screenshot-2024-06-19-at-12.00.11.png`,
    alt: 'Menomale pizza logotype',
    external: false,
  },
  {
    href: '/archive/master-en-produccion-artistica',
    image: `${WP}/2021/05/Giuseppe_Fioretti_MPA.jpeg`,
    alt: 'Master en Producción Artística',
    external: false,
  },
] as const;

export const HOBBY_IMAGES = [
  { href: '/shop/drawing-hag', image: `${WP}/2021/05/HAG-scaled.jpg`, alt: 'Drawing by Giuseppe Fió' },
  { href: '/shop#skin-is-the-new-canvas', image: `${WP}/2021/05/IG-202114-scaled.jpg`, alt: 'Skin is the new canvas' },
  { href: '/archive/inchiodiamo-il-passato', image: `${WP}/2021/05/SACRA-BIBLIA-scaled.jpg`, alt: 'Inchiodiamo il passato' },
  { href: '/shop/pee-pee', image: `${WP}/2021/05/IG-202131-scaled.jpg`, alt: 'Pee Pee' },
] as const;
