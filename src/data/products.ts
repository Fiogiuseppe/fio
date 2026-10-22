import type { Product, ProductCategory, ProductInput, ShopCategory } from '@/lib/types';
import { WP } from '@/lib/utils';
import categoriesData from './products/categories.json';
import visceralPoemsData from './products/visceral-poems.json';
import paintingsData from './products/paintings.json';
import ureesData from './products/urees.json';

export const UREES_BRAND = {
  slug: 'urees',
  title: 'UREES',
  description:
    'One-of-one upcycled wearable pieces — a separate universe where fashion, art and sustainability meet.',
  image: `${WP}/2024/01/20230907_UREES02632.jpg`,
  href: '/urees',
  instagram: 'https://www.instagram.com/urees__/',
} as const;

export const PRODUCTS_PER_PAGE = 12;

const CATEGORY_FILES: Record<ProductCategory, ProductInput[]> = {
  'visceral-poems': visceralPoemsData as ProductInput[],
  paintings: paintingsData as ProductInput[],
  urees: ureesData as ProductInput[],
};

function assertUniqueSlugs(items: Product[]) {
  const seen = new Set<string>();
  for (const product of items) {
    if (seen.has(product.slug)) {
      throw new Error(`Duplicate product slug: ${product.slug}`);
    }
    seen.add(product.slug);
  }
}

function loadProducts(): Product[] {
  const items = (Object.entries(CATEGORY_FILES) as [ProductCategory, ProductInput[]][]).flatMap(
    ([category, entries]) =>
      entries.map((entry) => ({
        ...entry,
        category,
      }))
  );

  assertUniqueSlugs(items);
  return items;
}

export const shopCategories = categoriesData as ShopCategory[];
export const products = loadProducts();

export type ProductFilters = {
  availability?: Product['availability'] | 'all';
  tag?: string;
};

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: ProductCategory) {
  return products.filter((p) => p.category === category);
}

/** Gallery shop — handmade works only; UREES lives at /urees */
export function getShopProducts() {
  return products.filter((p) => p.category !== 'urees');
}

export function getTagsForCategory(category: ProductCategory) {
  const tags = new Set<string>();
  for (const product of getProductsByCategory(category)) {
    product.tags?.forEach((tag) => tags.add(tag));
  }
  return [...tags].sort();
}

export function filterProducts(items: Product[], filters: ProductFilters) {
  return items.filter((product) => {
    if (filters.availability && filters.availability !== 'all') {
      if (product.availability !== filters.availability) return false;
    }
    if (filters.tag && !product.tags?.includes(filters.tag)) return false;
    return true;
  });
}

export function paginateProducts<T>(items: T[], page: number, pageSize = PRODUCTS_PER_PAGE) {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * pageSize;

  return {
    items: items.slice(start, start + pageSize),
    page: safePage,
    totalPages,
    total: items.length,
  };
}
