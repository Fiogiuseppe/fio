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
  const allHandpainted = [...handpainted, ...standalonePaintings];
  const visceralPoems = shopProducts.filter((product) => product.category === 'visceral-poems');
  const handmadePoems = productsForGroup(visceralPoems, 'handmade');
  const digitalPoems = productsForGroup(visceralPoems, 'digital');
  const printedProducts = [...skinCanvas, ...digitalPoems];
  const handpaintedProducts = [...allHandpainted, ...handmadePoems];
  const sections: ShopSection[] = [];

  if ((filter === 'all' || filter === 'printed') && printedProducts.length > 0) {
    sections.push({
      id: 'printed',
      title: 'Printed',
      description:
        'Signed prints — photography, Skin is the New Canvas with Claudia Sahuquillo, and Visceral Poems from @visceralpoems.',
      group: 'digital',
      products: printedProducts,
    });
  }

  if ((filter === 'all' || filter === 'handpainted') && handpaintedProducts.length > 0) {
    sections.push({
      id: 'handpainted',
      title: 'Handpainted',
      description:
        'Original handpainted works and handmade ink originals from @visceralpoems — from €30 without frame, €60 with frame.',
      group: 'handmade',
      products: handpaintedProducts,
    });
  }

  return sections;
}
