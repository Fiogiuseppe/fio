import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { SectionIntro } from '@/components/SectionIntro';
import { ProductCard } from '@/components/ProductCard';
import { ShopCategoryFilters, ShopPagination } from '@/components/ShopCategoryFilters';
import { TypographyMeta } from '@/components/typography';
import { editorial } from '@/lib/typography';
import {
  filterProducts,
  getProductsByCategory,
  paginateProducts,
  shopCategories,
} from '@/data/products';
import { categoryLabel } from '@/lib/utils';
import type { ProductAvailability, ProductCategory } from '@/lib/types';

type Props = {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ availability?: string; tag?: string; page?: string }>;
};

const AVAILABILITY_VALUES: Array<ProductAvailability | 'all'> = [
  'all',
  'available',
  'sold',
  'coming-soon',
];

export async function generateStaticParams() {
  return shopCategories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const cat = shopCategories.find((c) => c.slug === category);
  if (!cat) return {};
  return { title: `${cat.title} — Shop`, description: cat.description };
}

export default async function ShopCategoryPage({ params, searchParams }: Props) {
  const { category } = await params;
  const query = await searchParams;
  const cat = shopCategories.find((c) => c.slug === category);
  if (!cat) notFound();

  const availability = AVAILABILITY_VALUES.includes(query.availability as ProductAvailability | 'all')
    ? (query.availability as ProductAvailability | 'all' | undefined) ?? 'all'
    : 'all';
  const tag = query.tag?.trim() || undefined;
  const page = Math.max(1, Number.parseInt(query.page ?? '1', 10) || 1);

  const allItems = getProductsByCategory(category as ProductCategory);
  const filtered = filterProducts(allItems, { availability, tag });
  const { items, totalPages, total, page: safePage } = paginateProducts(filtered, page);

  return (
    <div className="px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionIntro kicker="Shop" title={cat.title} description={cat.description} />
        <TypographyMeta className={editorial.stack.titleToLead}>
          {categoryLabel(category)} · {total} pieces
          {filtered.length !== allItems.length ? ` (filtered from ${allItems.length})` : ''}
        </TypographyMeta>

        <ShopCategoryFilters
          category={category as ProductCategory}
          current={{ availability, tag, page: safePage }}
        />

        {items.length === 0 ? (
          <TypographyMeta className={editorial.stack.leadToContent}>
            No pieces match these filters.{' '}
            <a href={`/shop/category/${category}`} className="text-blue">
              Clear filters
            </a>
          </TypographyMeta>
        ) : (
          <div className={`grid gap-12 sm:grid-cols-2 lg:grid-cols-3 ${editorial.stack.leadToContent}`}>
            {items.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        )}

        <ShopPagination
          category={category as ProductCategory}
          page={safePage}
          totalPages={totalPages}
          filters={{ availability: availability === 'all' ? undefined : availability, tag }}
        />
      </div>
    </div>
  );
}
