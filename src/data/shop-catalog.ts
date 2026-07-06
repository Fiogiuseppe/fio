import type { Product } from '@/lib/types';
import type { ProductFormat } from '@/lib/types';
import { getShopProducts } from '@/data/products';

export type ShopGroup = ProductFormat;
export type ShopGroupFilter = 'all' | ShopGroup;

export const SHOP_GROUP_OPTIONS: Array<{ value: ShopGroupFilter; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'handmade', label: 'Handmade' },
  { value: 'digital', label: 'Digital' },
];

export type ShopSection = {
  id: string;
  title: string;
  description: string;
  group: ShopGroup;
  products: Product[];
  brandLine?: string;
};

export const SKIN_CANVAS_COLLECTION_TAG = 'skin-is-the-new-canvas';
export const HANDPAINTED_COLLECTION_TAG = 'handpainted';

export function parseShopGroupFilter(value?: string | null): ShopGroupFilter {
  if (value === 'handmade' || value === 'digital') return value;
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

export function getShopSections(filter: ShopGroupFilter = 'all'): ShopSection[] {
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
  const visceralPoems = shopProducts.filter((product) => product.category === 'visceral-poems');
  const handmadePoems = productsForGroup(visceralPoems, 'handmade');
  const digitalPoems = productsForGroup(visceralPoems, 'digital');
  const sections: ShopSection[] = [];

  if (filter === 'all' || filter === 'handmade') {
    if (skinCanvas.length > 0) {
      sections.push({
        id: 'skin-is-the-new-canvas',
        title: 'Skin is the New Canvas',
        description:
          'Paintings and photography with Claudia Sahuquillo — body as canvas, shot by Giuseppe Fioretti.',
        group: 'handmade',
        brandLine: 'Giuseppe Fioretti × Claudia Sahuquillo',
        products: skinCanvas,
      });
    }

    if (handpainted.length > 0) {
      sections.push({
        id: 'handpainted',
        title: 'Handpainted',
        description: 'Original handpainted works — shoes, studies and one-of-one pieces.',
        group: 'handmade',
        products: handpainted,
      });
    }

    if (standalonePaintings.length > 0) {
      sections.push({
        id: 'handmade-paintings',
        title: 'Paintings',
        description: 'Original handmade paintings on canvas — one-of-one pieces.',
        group: 'handmade',
        products: standalonePaintings,
      });
    }

    if (handmadePoems.length > 0) {
      sections.push({
        id: 'handmade-visceral-poems',
        title: 'Visceral Poems',
        description:
          'Handmade ink originals from @visceralpoems — from €30 without frame, €60 with frame.',
        group: 'handmade',
        products: handmadePoems,
      });
    }
  }

  if (filter === 'all' || filter === 'digital') {
    if (digitalPoems.length > 0) {
      sections.push({
        id: 'digital-visceral-poems',
        title: 'Visceral Poems',
        description:
          'Signed digital prints from @visceralpoems — from €10 without frame, €40 with frame.',
        group: 'digital',
        products: digitalPoems,
      });
    }
  }

  return sections;
}
