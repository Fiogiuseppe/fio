import catalogData from './catalog.json';
import siteData from './site.json';
import type { UreesCatalog, UreesProduct } from '@/lib/urees-types';
import type { UreesArticle, UreesPage, UreesPolicy, UreesSiteData } from '@/lib/urees-site-types';

const catalog = catalogData as UreesCatalog;
const site = siteData as UreesSiteData;

export const ureesCatalog = catalog;
export const ureesSite = site;
export const ureesProducts = catalog.products;
export const ureesFeaturedProducts = catalog.featured.length ? catalog.featured : catalog.products;
export const ureesBestsellers = catalog.bestsellers ?? [];

export function getUreesProduct(handle: string): UreesProduct | undefined {
  return ureesProducts.find((product) => product.handle === handle);
}

export function getUreesCollection(handle: string): UreesProduct[] {
  const collection = catalog.collections?.find((item) => item.handle === handle);
  if (!collection) return [];
  return collection.productHandles
    .map((productHandle) => getUreesProduct(productHandle))
    .filter((product): product is UreesProduct => Boolean(product));
}

export function getUreesPants(): UreesProduct[] {
  return ureesProducts.filter(
    (product) =>
      product.productType.toLowerCase() === 'pants' || /pant/i.test(product.title)
  );
}

export function getUreesPage(handle: string): UreesPage | undefined {
  return site.pages.find((page) => page.handle === handle);
}

export function getUreesPolicy(handle: string): UreesPolicy | undefined {
  return site.policies.find((policy) => policy.handle === handle);
}

export function getUreesArticle(handle: string): UreesArticle | undefined {
  return site.articles.find((article) => article.handle === handle);
}

export function formatUreesPrice(price: string, currency = catalog.currency) {
  const amount = Number.parseFloat(price);
  return new Intl.NumberFormat('en', {
    style: 'currency',
    currency,
  }).format(amount);
}

export function formatUreesDate(date: string) {
  if (!date) return '';
  return new Intl.DateTimeFormat('en', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date));
}

export function ureesProductCta(product: UreesProduct) {
  if (!product.available) return 'sold-out';
  if (product.variants.length > 1) return 'choose-options';
  return 'add-to-cart';
}

export function ureesCheckoutUrl(product: UreesProduct, variantId?: number) {
  const variant = variantId
    ? product.variants.find((item) => item.id === variantId)
    : product.variants.find((item) => item.available);

  if (!variant) return `https://urees.shop/products/${product.handle}`;
  return `https://urees.shop/cart/add?id=${variant.id}`;
}
