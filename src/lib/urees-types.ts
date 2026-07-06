export type UreesVariant = {
  id: number;
  title: string;
  price: string;
  available: boolean;
  option1: string | null;
  option2: string | null;
  option3: string | null;
};

export type UreesProduct = {
  id: number;
  handle: string;
  title: string;
  productType: string;
  vendor: string;
  tags: string[];
  descriptionHtml: string;
  images: Array<{
    src: string;
    alt: string;
    width?: number;
    height?: number;
  }>;
  options: Array<{
    name: string;
    values: string[];
  }>;
  variants: UreesVariant[];
  available: boolean;
};

export type UreesCatalog = {
  syncedAt: string;
  source: string;
  currency: string;
  featuredHandles: string[];
  products: UreesProduct[];
  featured: UreesProduct[];
  collections?: Array<{ handle: string; productHandles: string[] }>;
  bestsellerHandles?: string[];
  bestsellers?: UreesProduct[];
};
