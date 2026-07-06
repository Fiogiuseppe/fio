/**
 * Editorial composition tokens — fiogiuseppe.com
 * Spacing, motion, layout variants. See docs/EDITORIAL_DESIGN_SYSTEM.md
 */

/** 8px spacing system — never use arbitrary values */
export const space = {
  xs: '0.5rem',   // 8
  sm: '1rem',     // 16
  md: '1.5rem',   // 24
  lg: '2rem',     // 32
  xl: '3rem',     // 48
  '2xl': '4rem',  // 64
  '3xl': '6rem',  // 96
  '4xl': '8rem',  // 128
} as const;

/** Tailwind class shortcuts for vertical rhythm */
export const editorialSpace = {
  xs: 'mt-2',
  sm: 'mt-4',
  md: 'mt-6',
  lg: 'mt-8',
  xl: 'mt-12',
  '2xl': 'mt-16',
  '3xl': 'mt-24',
  '4xl': 'mt-32',
  sectionY: 'py-16 md:py-24',
  sectionX: 'px-6 md:px-10',
  gutter: 'gap-8 md:gap-12',
} as const;

/** Subtle editorial motion — alive, not animated */
export const motion = {
  fade: 'transition-opacity duration-700 ease-out',
  image: 'transition-transform duration-700 ease-out',
  link: 'transition-colors duration-300 ease-out',
} as const;

/** Max content width for editorial grid */
export const grid = {
  page: 'mx-auto max-w-7xl',
  prose: 'max-w-[70ch]',
  wide: 'max-w-5xl',
} as const;

export type EditorialSectionVariant =
  | 'default'
  | 'statement'
  | 'fullBleed'
  | 'split'
  | 'grid'
  | 'quote';

export const sectionVariantClass: Record<EditorialSectionVariant, string> = {
  default: '',
  statement: 'py-24 md:py-32',
  fullBleed: 'px-0',
  split: 'grid gap-12 lg:grid-cols-2 lg:gap-16',
  grid: 'grid gap-8 md:grid-cols-2 lg:grid-cols-3',
  quote: 'py-24 text-center',
};
