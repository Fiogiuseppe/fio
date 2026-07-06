export type WorkLayoutSlot = 'hero' | 'large' | 'grid';

export type WorkProjectRef = {
  slug: string;
  slot: WorkLayoutSlot;
};

/** Work page order — hero, two full-bleed rows, then 3-col grid (fiogiuseppe.com works order). */
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
];
