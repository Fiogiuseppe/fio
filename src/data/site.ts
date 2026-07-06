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

export const NAV = [
  { label: 'Home', href: '/' },
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
  { label: 'UREES', href: '/archive/think_possible' },
  { label: 'VISCERAL POEMS', href: '/archive/visceralpoems' },
  { label: 'SOME ART', href: '/archive/art-by-giuseppe-fioretti' },
  { label: 'CACOPHOBIA', href: '/archive/cacophobia' },
  { label: 'THE CONIDE', href: '/archive/the_conide' },
  { label: 'CAREER TIMELINE', href: '/archive/giuseppe-fioretti-career-timeline' },
] as const;

export const OTHER_WORKS = [
  {
    href: 'https://www.instagram.com/p/CkyPK69N3sB/',
    image: `${WP}/2022/11/zalio_ig_fio-1-scaled.jpg`,
    alt: 'Zalio by Giuseppe Fió',
    external: true,
  },
  {
    href: 'https://www.instagram.com/p/CavSZkFNRM-/?img_index=1',
    image: `${WP}/2024/06/sec-ig4-scaled.jpg`,
    alt: 'Spiritual design',
    external: true,
  },
  {
    href: '/archive/marianna-carolina-sale',
    image: `${WP}/2021/05/mariannacarolinasale.gif`,
    alt: 'Marianna Carolina Sale',
    external: false,
  },
  {
    href: 'https://www.instagram.com/p/CtOaVAYNWa9/?img_index=1',
    image: `${WP}/2024/06/Screenshot-2024-06-19-at-11.35.03.png`,
    alt: 'Urees logo',
    external: true,
  },
  {
    href: 'https://www.instagram.com/p/C-VQc9KtioW/?img_index=1',
    image: `${WP}/2024/06/Screenshot-2024-06-19-at-12.00.11.png`,
    alt: 'menomale pizza logotype',
    external: true,
  },
  {
    href: '/archive/master-en-produccion-artistica',
    image: `${WP}/2021/05/Giuseppe_Fioretti_MPA.jpeg`,
    alt: 'Master en Producción Artística',
    external: false,
  },
] as const;

export const HOBBY_IMAGES = [
  { href: '/archive/art-by-giuseppe-fioretti', image: `${WP}/2021/05/HAG-scaled.jpg`, alt: 'Drawing by Giuseppe Fió' },
  { href: '/archive/skin-is-the-new-canvas', image: `${WP}/2021/05/IG-202114-scaled.jpg`, alt: 'Skin is the new canvas' },
  { href: '/archive/inchiodiamo-il-passato', image: `${WP}/2021/05/SACRA-BIBLIA-scaled.jpg`, alt: 'Inchiodiamo il passato' },
  { href: '/archive/cacophobia', image: `${WP}/2021/05/IG-202117-scaled.jpg`, alt: 'Cacophobia' },
  { href: '/archive/pee-pee', image: `${WP}/2021/05/IG-202131-scaled.jpg`, alt: 'Pee Pee' },
] as const;
