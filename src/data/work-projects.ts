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
  { slug: 'zalio', slot: 'grid' },
  { slug: 'menomale', slot: 'grid' },
  { slug: 'sec-brunch', slot: 'grid' },
  { slug: 'urees', slot: 'grid' },
  { slug: 'marianna-carolina-sale', slot: 'grid' },
  { slug: 'master-en-produccion-artistica', slot: 'grid' },
];
