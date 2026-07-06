export const SITE = {
  name: 'Fiogiuseppe',
  title: 'Giuseppe Fioretti Graphic Designer & Art Director',
  description:
    'Giuseppe Fioretti Graphic Designer & Art Director based in Copenhagen. I build brands through storytelling, design and visual experimentation.',
  email: 'hey@fiogiuseppe.com',
  contactEmail: 'fiogiuseppe@gmail.com',
  instagram: 'https://www.instagram.com/fiogiuseppe/',
  location: 'copenhagen 2024',
} as const;

export const WP = 'https://fiogiuseppe.com/wp-content/uploads';

export const FOOTER_LINKS = [
  { label: 'BLOG', href: '/blog' },
  { label: 'SPIRITUAL DESIGN', href: '/spiritual-design' },
  { label: 'UREES', href: '/think_possible' },
  { label: 'VISCERAL POEMS', href: '/visceralpoems' },
  { label: 'SOME ART', href: '/art-by-giuseppe-fioretti' },
  { label: 'CACOPHOBIA', href: '/cacophobia' },
  { label: 'THE CONIDE', href: '/the_conide' },
  { label: 'CAREER TIMELINE', href: '/giuseppe-fioretti-career-timeline' },
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
    href: '/marianna-carolina-sale',
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
    href: '/master-en-produccion-artistica',
    image: `${WP}/2021/05/Giuseppe_Fioretti_MPA.jpeg`,
    alt: 'Master en Producción Artística',
    external: false,
  },
] as const;

export const HOBBY_IMAGES = [
  { href: '/art-by-giuseppe-fioretti', image: `${WP}/2021/05/HAG-scaled.jpg`, alt: 'Drawing by Giuseppe Fió' },
  { href: '/skin-is-the-new-canvas', image: `${WP}/2021/05/IG-202114-scaled.jpg`, alt: 'Skin is the new canvas' },
  { href: '/inchiodiamo-il-passato', image: `${WP}/2021/05/SACRA-BIBLIA-scaled.jpg`, alt: 'Inchiodiamo il passato' },
  { href: '/cacophobia', image: `${WP}/2021/05/IG-202117-scaled.jpg`, alt: 'Cacophobia' },
  { href: '/pee-pee', image: `${WP}/2021/05/IG-202131-scaled.jpg`, alt: 'Pee Pee' },
] as const;
