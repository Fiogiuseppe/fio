import type { Product } from '@/lib/types';
import type { ProductFormat } from '@/lib/types';
import { getShopProducts } from '@/data/products';

export type ShopGroup = ProductFormat;
export type ShopGroupFilter = 'all' | 'printed' | 'handpainted';

/** @deprecated Filters removed — shop is a single museum collection */
export const SHOP_GROUP_OPTIONS: Array<{ value: ShopGroupFilter; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'printed', label: 'Printed' },
  { value: 'handpainted', label: 'Handpainted' },
];

export type ShopSection = {
  id: string;
  title: string;
  description: string;
  group: ShopGroup;
  products: Product[];
  brandLine?: string;
};

export type ShopSectionGroup = {
  id: ShopGroupFilter extends infer T ? (T extends 'all' ? never : T) : never;
  title: string;
  group: ShopGroup;
  sections: ShopSection[];
};

export const HANDPAINTED_COLLECTION_TAG = 'handpainted';

export const MUSEUM_COLLECTION = {
  artist: 'Giuseppe Fioretti',
  title: 'Collection',
  lead: 'A small selection of original handpainted works. Each piece is unique — presented as it would hang in a gallery.',
} as const;

export function shopGroupLabel(group: ShopGroup): string {
  return group === 'digital' ? 'Printed' : 'Handpainted';
}

export function parseShopGroupFilter(value?: string | null): ShopGroupFilter {
  if (value === 'printed' || value === 'digital') return 'printed';
  if (value === 'handpainted' || value === 'handmade') return 'handpainted';
  return 'all';
}

export function getProductShopGroups(product: Product): ShopGroup[] {
  if (product.formats?.length) return product.formats;
  if (product.category === 'paintings') return ['handmade'];
  if (product.category === 'visceral-poems') return ['digital'];
  return [];
}

/** Curated museum collection — handpainted originals only */
export function getMuseumCollection(): Product[] {
  return getShopProducts();
}

export function getShopSectionGroups(_filter: ShopGroupFilter = 'all'): ShopSectionGroup[] {
  const works = getMuseumCollection();
  if (works.length === 0) return [];

  return [
    {
      id: 'handpainted',
      title: MUSEUM_COLLECTION.title,
      group: 'handmade',
      sections: [
        {
          id: 'museum-collection',
          title: MUSEUM_COLLECTION.title,
          description: MUSEUM_COLLECTION.lead,
          group: 'handmade',
          products: works,
          brandLine: MUSEUM_COLLECTION.artist,
        },
      ],
    },
  ];
}

/** @deprecated Use getMuseumCollection / getShopSectionGroups */
export function getShopSections(filter: ShopGroupFilter = 'all'): ShopSection[] {
  return getShopSectionGroups(filter).flatMap((group) => group.sections);
}
