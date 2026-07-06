import type { Product, ProductAvailability } from './types';

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export function formatPrice(price: number, currency: 'EUR' = 'EUR') {
  return new Intl.NumberFormat('en-EU', { style: 'currency', currency }).format(price);
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat('en', { month: 'long', day: 'numeric', year: 'numeric' }).format(
    new Date(date)
  );
}

/** Drop a leading Medium cover figure when it repeats the article hero image. */
export function stripLeadingCoverFigure(html: string, coverImage: string) {
  const trimmed = html.trimStart();
  const match = trimmed.match(/^<figure>[\s\S]*?<\/figure>/);
  if (!match) return html;

  const figure = match[0];
  const srcMatch = figure.match(/src="([^"]+)"/);
  if (!srcMatch) return html;

  const figureSrc = srcMatch[1];
  const coverKey = coverImage.split('/').pop() ?? coverImage;
  const figureKey = figureSrc.split('/').pop() ?? figureSrc;

  if (figureSrc === coverImage || figureKey === coverKey) {
    return trimmed.slice(match[0].length).trimStart();
  }

  return html;
}

export function categoryLabel(category: string) {
  return category
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function availabilityLabel(availability: ProductAvailability) {
  switch (availability) {
    case 'available':
      return 'Available';
    case 'sold':
      return 'Sold';
    case 'coming-soon':
      return 'Coming soon';
  }
}

export function productCtaLabel(product: Product) {
  if (product.cta === 'sold' || product.availability === 'sold') return 'Sold';
  if (product.cta === 'request') return 'Request this piece';
  return 'Collect this piece';
}

export function productHref(product: Pick<Product, 'slug' | 'category'>) {
  return product.category === 'urees' ? `/urees/shop/${product.slug}` : `/shop/${product.slug}`;
}

export const WP = 'https://fiogiuseppe.com/wp-content/uploads';
