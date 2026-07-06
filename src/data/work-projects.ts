export type WorkLayoutSlot = 'hero' | 'large' | 'grid';

export type WorkProjectRef = {
  slug: string;
  slot: WorkLayoutSlot;
};

/** Work page order — hero, split pair, then 3-col grid (fiogiuseppe.com works order). */
export const workProjectLayout: WorkProjectRef[] = [
  { slug: 'lego-playmaker-jason-momoa', slot: 'hero' },
  { slug: 'desigual-sneakers-campaign', slot: 'large' },
  { slug: 'desigual-rebranding', slot: 'large' },
  { slug: 'the-magazine', slot: 'grid' },
  { slug: 'marianna-carolina-sale', slot: 'grid' },
  { slug: 'dmoors', slot: 'grid' },
  { slug: 'naculture', slot: 'grid' },
  { slug: 'master-en-produccion-artistica', slot: 'grid' },
  { slug: 'gonzalo-doctor-branding', slot: 'grid' },
  { slug: 'urees', slot: 'grid' },
  { slug: 'spiritual-design', slot: 'grid' },
  { slug: 'art-hag', slot: 'grid' },
  { slug: 'tutti-in-uno', slot: 'grid' },
  { slug: 'art-ig-20213', slot: 'grid' },
  { slug: 'pee-pee', slot: 'grid' },
  { slug: 'skin-is-the-new-canvas', slot: 'grid' },
  { slug: 'eyes', slot: 'grid' },
  { slug: 'art-ig-2021', slot: 'grid' },
];
