export const UREES_LOGO =
  'https://urees.shop/cdn/shop/files/Urees_Logo_9afae6b4-d876-4082-8c40-869d133e917b.png?v=1699536542&width=600';

export const UREES_SHOP_URL = 'https://urees.shop';

export const ureesNav = [
  { label: 'Shop', href: '/urees#first-drop' },
  { label: 'Pants', href: '/urees/collections/pants' },
  { label: 'Manifesto', href: '/urees#manifesto' },
  { label: 'News', href: '/urees#news' },
] as const;

export const ureesHomeSections = {
  firstDrop: {
    id: 'first-drop',
    title: 'FIRST DROP UREES',
  },
  dreaming: {
    id: 'dreaming',
    title: 'DREAMING OF OUR PANTS WORN BY THOSE WHO HAVE INSPIRED US.',
  },
  manifesto: {
    id: 'manifesto',
    title: "CELEBRATE THE CLOTHES' HISTORICAL MEMORY",
    blocks: [
      {
        heading:
          'UREES IS A LUXURY CONSCIOUS BRAND THAT TRANSFORMS USED GARMENTS INTO UNIQUE, HANDCRAFTED PIECES, CELEBRATING THEIR HISTORICAL MEMORY.',
      },
      {
        heading:
          'OUR MISSION IS TO GIVE NEW LIFE TO CLOTHING, CREATING UNISIZE, UNISEX, AND DISTINCTIVE GARMENTS.',
      },
      {
        heading:
          'WE BELIEVE IN PRESERVING AND HONORING THE STORIES EACH PIECE OF CLOTHING CARRIES.',
      },
      {
        heading: 'Urees, Nothing is created, nothing is destroyed, everything is transformed.',
        cta: { label: 'CHECK OUR MANIFESTO', href: `${UREES_SHOP_URL}/pages/manifesto` },
      },
    ],
  },
  slowFashion: {
    id: 'slow-fashion',
    title: 'WE ARE SLOW FASHION',
    body: 'EMBRACING SLOW FASHION, WE PRIORITIZE QUALITY, DURABILITY, AND ETHICAL PRODUCTION, MINIMIZING WASTE AND PROMOTING SUSTAINABILITY THROUGHOUT OUR UNIQUE, LOCAL, AND ON-DEMAND CRAFTING PROCESS. EXPLORE OUR MANIFESTO FOR MORE.',
    cta: { label: '+ info', href: `${UREES_SHOP_URL}/pages/manifesto` },
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

export const ureesNews = [
  {
    title: 'Join the Urees Seller Family: Redefining Fashion One Unique Piece at a Time',
    date: 'September 9, 2024',
    tag: 'Urees Reuse',
    href: `${UREES_SHOP_URL}/blogs/urees-news/join-the-urees-seller-family-redefining-fashion-one-unique-piece-at-a-time`,
    excerpt:
      "At Urees, we believe that fashion should tell a story—one of innovation, individuality, and responsible choices.",
  },
  {
    title: 'Practical Guide for the Conscious Consumer: How to Embrace Sustainable Fashion in Your Daily Life',
    date: 'June 20, 2024',
    tag: 'Urees Reuse',
    href: `${UREES_SHOP_URL}/blogs/urees-news/practical-guide-for-the-conscious-consumer-how-to-embrace-sustainable-fashion-in-your-daily-life`,
    excerpt:
      'In an increasingly environmentally and socially conscious world, the demand for sustainable fashion is on the rise.',
  },
  {
    title: 'Upcycling: The Future of Sustainable Fashion',
    date: 'June 18, 2024',
    tag: 'Urees Reuse',
    href: `${UREES_SHOP_URL}/blogs/urees-news/upcycling-the-future-of-sustainable-fashion`,
    excerpt:
      'Discover how upcycling is transforming the fashion industry in 2024.',
  },
] as const;
