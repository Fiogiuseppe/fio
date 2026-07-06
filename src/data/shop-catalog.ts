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
};

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
  const visceralPoems = shopProducts.filter((product) => product.category === 'visceral-poems');
  const handmadePoems = productsForGroup(visceralPoems, 'handmade');
  const digitalPoems = productsForGroup(visceralPoems, 'digital');
  const sections: ShopSection[] = [];

  if (filter === 'all' || filter === 'handmade') {
    if (paintings.length > 0) {
      sections.push({
        id: 'handmade-paintings',
        title: 'Paintings',
        description: 'Original handmade paintings on canvas — one-of-one pieces.',
        group: 'handmade',
        products: paintings,
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
