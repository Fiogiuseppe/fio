import type { Product } from '@/lib/types';
import type { ProductFormat } from '@/lib/types';
import { getShopProducts } from '@/data/products';

export type ShopGroup = ProductFormat;
export type ShopGroupFilter = 'all' | 'printed' | 'handpainted';

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

export const SKIN_CANVAS_COLLECTION_TAG = 'skin-is-the-new-canvas';
export const HANDPAINTED_COLLECTION_TAG = 'handpainted';

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

function productsForGroup(products: Product[], group: ShopGroup) {
  return products.filter((product) => getProductShopGroups(product).includes(group));
}

export function getShopSectionGroups(filter: ShopGroupFilter = 'all'): ShopSectionGroup[] {
  const shopProducts = getShopProducts();
  const paintings = shopProducts.filter((product) => product.category === 'paintings');
  const skinCanvas = paintings.filter((product) =>
    product.tags?.includes(SKIN_CANVAS_COLLECTION_TAG)
  );
  const handpainted = paintings.filter((product) =>
    product.tags?.includes(HANDPAINTED_COLLECTION_TAG)
  );
  const standalonePaintings = paintings.filter(
    (product) =>
      !product.tags?.includes(SKIN_CANVAS_COLLECTION_TAG) &&
      !product.tags?.includes(HANDPAINTED_COLLECTION_TAG)
  );
  const handpaintedWorks = [...handpainted, ...standalonePaintings];
  const visceralPoems = shopProducts.filter((product) => product.category === 'visceral-poems');
  const handmadePoems = productsForGroup(visceralPoems, 'handmade');
  const digitalPoems = productsForGroup(visceralPoems, 'digital');
  const groups: ShopSectionGroup[] = [];

  if (filter === 'all' || filter === 'printed') {
    const sections: ShopSection[] = [];

    if (skinCanvas.length > 0) {
      sections.push({
        id: 'skin-is-the-new-canvas',
        title: 'Skin is the New Canvas',
        description:
          'Photography with Claudia Sahuquillo — body as canvas, shot by Giuseppe Fioretti. Signed digital prints.',
        group: 'digital',
        brandLine: 'Giuseppe Fioretti × Claudia Sahuquillo',
        products: skinCanvas,
      });
    }

    if (digitalPoems.length > 0) {
      sections.push({
        id: 'printed-visceral-poems',
        title: 'Visceral Poems',
        description:
          'Signed digital prints from @visceralpoems — from €10 without frame, €40 with frame.',
        group: 'digital',
        products: digitalPoems,
      });
    }

    if (sections.length > 0) {
      groups.push({
        id: 'printed',
        title: 'Printed',
        group: 'digital',
        sections,
      });
    }
  }

  if (filter === 'all' || filter === 'handpainted') {
    const sections: ShopSection[] = [];

    if (handpaintedWorks.length > 0) {
      sections.push({
        id: 'handpainted-works',
        title: 'Works',
        description: 'Original handpainted pieces — shoes, studies and one-of-one objects.',
        group: 'handmade',
        products: handpaintedWorks,
      });
    }

    if (handmadePoems.length > 0) {
      sections.push({
        id: 'handpainted-visceral-poems',
        title: 'Visceral Poems',
        description:
          'Handmade ink originals from @visceralpoems — from €30 without frame, €60 with frame.',
        group: 'handmade',
        products: handmadePoems,
      });
    }

    if (sections.length > 0) {
      groups.push({
        id: 'handpainted',
        title: 'Handpainted',
        group: 'handmade',
        sections,
      });
    }
  }

  return groups;
}

/** @deprecated Use getShopSectionGroups */
export function getShopSections(filter: ShopGroupFilter = 'all'): ShopSection[] {
  return getShopSectionGroups(filter).flatMap((group) => group.sections);
}
