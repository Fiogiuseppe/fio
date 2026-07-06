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

export const WP = 'https://fiogiuseppe.com/wp-content/uploads';
