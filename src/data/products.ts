import type { Product, ShopCategory } from '@/lib/types';
import { WP } from '@/lib/utils';

export const shopCategories: ShopCategory[] = [
  {
    slug: 'visceral-poems',
    title: 'Visceral Poems',
    description: 'Original poetic artworks and limited editions.',
    image: `${WP}/2023/03/VISCERAL-POETRY-12-scaled.jpg`,
  },
  {
    slug: 'paintings',
    title: 'Paintings',
    description: 'Original paintings and visual experiments.',
    image: `${WP}/2025/07/Giuseppe_Fioretti_2.png`,
  },
];

export const UREES_BRAND = {
  slug: 'urees',
  title: 'UREES',
  description: 'One-of-one upcycled wearable pieces — a separate universe where fashion, art and sustainability meet.',
  image: `${WP}/2024/01/20230907_UREES02632.jpg`,
  href: '/urees',
  instagram: 'https://www.instagram.com/urees__/',
} as const;

export const products: Product[] = [
  {
    slug: 'visceral-poem-12',
    title: 'Visceral Poem XII',
    category: 'visceral-poems',
    shortDescription: 'A visceral meditation on body, language and silence.',
    longStory:
      'Part of the Visceral Poems series — where poetry meets physical form. Each piece is a fragment of an inner landscape, rendered in ink and emotion.',
    images: [`${WP}/2023/03/VISCERAL-POETRY-12-scaled.jpg`],
    price: 480,
    currency: 'EUR',
    size: '70 × 100 cm',
    technique: 'Ink on paper',
    availability: 'available',
    edition: 'Original — 1 of 1',
    productType: 'original',
    cta: 'buy',
  },
  {
    slug: 'visceral-poem-limited',
    title: 'Visceral Poem — Limited Print',
    category: 'visceral-poems',
    shortDescription: 'Limited edition archival print from the Visceral Poems series.',
    longStory:
      'A selected work from the series, reproduced as a museum-quality archival print in a strictly limited run.',
    images: [`${WP}/2023/03/VISCERAL-POETRY-12-scaled.jpg`],
    price: 120,
    currency: 'EUR',
    size: '50 × 70 cm',
    technique: 'Archival pigment print',
    availability: 'available',
    edition: 'Edition of 25',
    productType: 'print',
    cta: 'buy',
  },
  {
    slug: 'cacophobia',
    title: 'Cacophobia',
    category: 'paintings',
    shortDescription: 'An exploration of fear, form and the human condition.',
    longStory:
      'Cacophobia examines what we turn away from — and what happens when we look anyway. Oil and emotion on canvas.',
    images: [`${WP}/2021/05/IG-202117-scaled.jpg`],
    price: 2200,
    currency: 'EUR',
    size: '120 × 160 cm',
    technique: 'Oil on canvas',
    availability: 'available',
    edition: 'Original — 1 of 1',
    productType: 'original',
    cta: 'request',
  },
  {
    slug: 'the-conide',
    title: 'The Conide',
    category: 'paintings',
    shortDescription: 'On the importance of the spectator in the art world.',
    longStory:
      'The Conide is a meditation on presence — the space between artist, work and witness. A painting that asks you to stay.',
    images: [`${WP}/2021/05/FIO_1626-scaled.jpg`],
    price: 1800,
    currency: 'EUR',
    size: '100 × 140 cm',
    technique: 'Mixed media on canvas',
    availability: 'sold',
    edition: 'Original — 1 of 1',
    productType: 'original',
    cta: 'sold',
  },
  {
    slug: 'urees-piece-026',
    title: 'UREES 026',
    category: 'urees',
    shortDescription: 'One-of-one upcycled wearable piece — hand-altered, never repeated.',
    longStory:
      'Each UREES piece begins as a found garment. Through cutting, stitching and intention, it becomes something entirely new — a wearable poem.',
    images: [`${WP}/2024/01/20230907_UREES02632.jpg`],
    price: 350,
    currency: 'EUR',
    size: 'M / adjustable',
    technique: 'Upcycled textile, hand-finished',
    availability: 'available',
    edition: 'One of one',
    productType: 'one-of-one',
    cta: 'buy',
  },
  {
    slug: 'urees-drop-02',
    title: 'UREES Drop 02 — Piece VII',
    category: 'urees',
    shortDescription: 'From the second UREES drop — a collector piece.',
    longStory:
      'Part of an ongoing series of upcycled garments. This piece carries the memory of its previous life and the mark of its transformation.',
    images: [`${WP}/2024/01/20230907_UREES02632.jpg`],
    price: 420,
    currency: 'EUR',
    size: 'L',
    technique: 'Upcycled denim, hand-painted',
    availability: 'coming-soon',
    edition: 'One of one',
    productType: 'wearable',
    cta: 'request',
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string) {
  return products.filter((p) => p.category === category);
}
