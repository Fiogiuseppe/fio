export type WorkCategory =
  | 'branding'
  | 'rebranding'
  | 'campaign'
  | 'art-direction'
  | 'creative-direction'
  | 'visual-system'
  | 'personal-project';

export type ProductCategory = 'visceral-poems' | 'paintings' | 'urees';

export type ProductAvailability = 'available' | 'sold' | 'coming-soon';

export type ProductType = 'original' | 'print' | 'one-of-one' | 'wearable';

export type ProductCta = 'buy' | 'request' | 'sold';

export type ProjectMedia = {
  type: 'image' | 'gif';
  src: string;
  alt?: string;
  fullWidth?: boolean;
};

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  category: WorkCategory;
  year: number;
  client: string;
  role: string;
  heroImage: string;
  gallery: string[];
  description: string;
  body?: string[];
  media?: ProjectMedia[];
  challenge: string;
  solution: string;
  outcome: string;
  credits?: string;
  award?: { label: string; href: string };
  featured?: boolean;
}

export interface Service {
  slug: string;
  title: string;
  description: string;
  includes: string[];
  forWho: string;
  ctaLabel: string;
}

export interface Product {
  slug: string;
  title: string;
  category: ProductCategory;
  shortDescription: string;
  longStory: string;
  images: string[];
  price: number;
  currency: 'EUR';
  size?: string;
  technique?: string;
  availability: ProductAvailability;
  edition?: string;
  productType: ProductType;
  cta: ProductCta;
  /** Optional labels for filtering — e.g. pants, denim, print */
  tags?: string[];
}

/** Product fields stored in per-category JSON (category inferred from file). */
export type ProductInput = Omit<Product, 'category'>;

export interface Article {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  coverImage: string;
  /** @deprecated Legacy plain-text articles — prefer contentHtml */
  content?: string;
  contentHtml?: string;
  mediumUrl?: string;
  tags: string[];
}

export interface ShopCategory {
  slug: ProductCategory;
  title: string;
  description: string;
  image: string;
}
