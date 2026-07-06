import catalogData from './catalog.json';
import type { UreesCatalog, UreesProduct } from '@/lib/urees-types';

const catalog = catalogData as UreesCatalog;

export const ureesCatalog = catalog;
export const ureesProducts = catalog.products;
export const ureesFeaturedProducts = catalog.featured.length
  ? catalog.featured
  : catalog.products;

export function getUreesProduct(handle: string): UreesProduct | undefined {
  return ureesProducts.find((product) => product.handle === handle);
}

export function getUreesPants(): UreesProduct[] {
  return ureesProducts.filter(
    (product) =>
      product.productType.toLowerCase() === 'pants' ||
      /pant/i.test(product.title)
  );
}

export function formatUreesPrice(price: string, currency = catalog.currency) {
  const amount = Number.parseFloat(price);
  return new Intl.NumberFormat('en', {
    style: 'currency',
    currency,
  }).format(amount);
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

  if (!variant) return `${catalog.source}/products/${product.handle}`;
  return `${catalog.source}/cart/add?id=${variant.id}`;
}
