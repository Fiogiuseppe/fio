export const UREES_LOGO =
  'https://urees.shop/cdn/shop/files/Urees_Logo_9afae6b4-d876-4082-8c40-869d133e917b.png?v=1699536542&width=600';

export const UREES_CART_URL = 'https://urees.shop/cart';
export const UREES_CONTACT_EMAIL = 'info.urees@gmail.com';

/** Main navigation — matches urees.shop header */
export const ureesMainNav = [
  {
    label: 'Best sellers',
    href: '/urees/collections/discover-the-best-in-sustainable-fashion-best-sellers-collection-urees',
  },
  {
    label: 'Custom',
    href: '/urees/pages/discover-your-style-your-perfect-fit-urees-custom',
  },
  { label: 'Manifesto', href: '/urees/pages/manifesto' },
  { label: 'News', href: '/urees/blogs/urees-news' },
  { label: 'Contact', href: '/urees/pages/contact-1' },
] as const;

export const ureesFooterNav = [
  { label: 'Newsletter', href: '/urees/pages/join-our-newsletter-stay-informed-and-get-exclusive-updates' },
  { label: 'Size guide', href: '/urees/pages/size-guide-by-urees' },
  { label: 'Washing guide', href: '/urees/pages/care-for-your-urees-washing-and-maintenance-guide' },
  { label: 'Urees news', href: '/urees/blogs/urees-news' },
  {
    label: 'Contact us',
    href: `mailto:${UREES_CONTACT_EMAIL}?subject=hey%20fiogiuseppe`,
    external: true,
  },
  { label: 'Privacy policy', href: '/urees/policies/privacy-policy' },
  { label: 'Legal notice', href: '/urees/policies/legal-notice' },
  { label: 'Refund policy', href: '/urees/policies/refund-policy' },
  { label: 'Your privacy choices', href: '/urees/pages/data-sharing-opt-out' },
  { label: 'Become our global Urees seller', href: '/urees/pages/become-our-global-urees-seller' },
] as const;

export const ureesPolicyNav = [
  { label: 'Refund policy', href: '/urees/policies/refund-policy' },
  { label: 'Privacy policy', href: '/urees/policies/privacy-policy' },
  { label: 'Terms of service', href: '/urees/policies/terms-of-service' },
  { label: 'Contact information', href: '/urees/policies/contact-information' },
  { label: 'Legal notice', href: '/urees/policies/legal-notice' },
] as const;

export const ureesHomeCopy = {
  firstDrop: { id: 'first-drop', title: 'FIRST DROP UREES' },
  manifesto: {
    id: 'manifesto-preview',
    title: "CELEBRATE THE CLOTHES' HISTORICAL MEMORY",
    blocks: [
      'UREES IS A LUXURY CONSCIOUS BRAND THAT TRANSFORMS USED GARMENTS INTO UNIQUE, HANDCRAFTED PIECES, CELEBRATING THEIR HISTORICAL MEMORY.',
      'OUR MISSION IS TO GIVE NEW LIFE TO CLOTHING, CREATING UNISIZE, UNISEX, AND DISTINCTIVE GARMENTS.',
      'WE BELIEVE IN PRESERVING AND HONORING THE STORIES EACH PIECE OF CLOTHING CARRIES.',
      'Urees, Nothing is created, nothing is destroyed, everything is transformed.',
    ],
    cta: { label: 'CHECK OUR MANIFESTO', href: '/urees/pages/manifesto' },
  },
  slowFashion: {
    id: 'slow-fashion',
    title: 'WE ARE SLOW FASHION',
    body: 'EMBRACING SLOW FASHION, WE PRIORITIZE QUALITY, DURABILITY, AND ETHICAL PRODUCTION, MINIMIZING WASTE AND PROMOTING SUSTAINABILITY THROUGHOUT OUR UNIQUE, LOCAL, AND ON-DEMAND CRAFTING PROCESS. EXPLORE OUR MANIFESTO FOR MORE.',
    cta: { label: '+ info', href: '/urees/pages/manifesto' },
  },
  podcast: {
    id: 'podcast',
    title: 'PODCAST: Revive & Thrive: The Upcycling Journey',
    body: '"Revive & Thrive: The Upcycling Journey," is a podcast dedicated to exploring the world of sustainable fashion and the art of upcycling. Join your host, William Paz, as he engages with thought leaders, designers, and advocates who are reshaping the fashion industry through innovative and environmentally conscious practices.',
    note: '*The characters are fictional. Enjoy the content.',
  },
  instagram: {
    id: 'instagram',
    title: 'Follow us on instagram',
    handle: '@urees__',
    href: 'https://www.instagram.com/urees__/',
    tagline: 'Nothing is created nothing is destroyed everithing is transformed.',
  },
} as const;

/** Link back to the main Fiogiuseppe site */
export const FIO_PORTAL = {
  label: 'Giuseppe Fioretti',
  href: '/',
  hint: 'Back to fiogiuseppe.com',
} as const;
