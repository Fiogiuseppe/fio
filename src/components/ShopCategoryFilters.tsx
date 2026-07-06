import Link from 'next/link';
import type { ProductAvailability, ProductCategory } from '@/lib/types';
import { getTagsForCategory } from '@/data/products';
import { TypographyMeta } from '@/components/typography';
import { editorial } from '@/lib/typography';
import { cn } from '@/lib/utils';

type ShopCategoryFiltersProps = {
  category: ProductCategory;
  current: {
    availability?: ProductAvailability | 'all';
    tag?: string;
    page?: number;
  };
};

function buildHref(
  category: ProductCategory,
  next: { availability?: string; tag?: string; page?: number }
) {
  const params = new URLSearchParams();
  if (next.availability && next.availability !== 'all') {
    params.set('availability', next.availability);
  }
  if (next.tag) params.set('tag', next.tag);
  if (next.page && next.page > 1) params.set('page', String(next.page));
  const query = params.toString();
  return query ? `/shop/category/${category}?${query}` : `/shop/category/${category}`;
}

const AVAILABILITY_OPTIONS: Array<{ value: ProductAvailability | 'all'; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'available', label: 'Available' },
  { value: 'coming-soon', label: 'Coming soon' },
  { value: 'sold', label: 'Sold' },
];

export function ShopCategoryFilters({ category, current }: ShopCategoryFiltersProps) {
  const tags = getTagsForCategory(category);
  const availability = current.availability ?? 'all';

  return (
    <div className={`flex flex-col gap-6 ${editorial.stack.leadToContent}`}>
      <div className="flex flex-wrap items-center gap-3">
        <TypographyMeta as="span">Status</TypographyMeta>
        {AVAILABILITY_OPTIONS.map((option) => (
          <Link
            key={option.value}
            href={buildHref(category, { availability: option.value, tag: current.tag })}
            className={cn(
              'border px-3 py-1 no-underline transition',
              availability === option.value
                ? 'border-ink bg-ink text-on-dark'
                : 'border-ink/20 text-ink hover:border-ink'
            )}
          >
            <TypographyMeta as="span">{option.label}</TypographyMeta>
          </Link>
        ))}
      </div>

      {tags.length > 0 && (
        <div className="flex flex-wrap items-center gap-3">
          <TypographyMeta as="span">Type</TypographyMeta>
          <Link
            href={buildHref(category, { availability })}
            className={cn(
              'border px-3 py-1 no-underline transition',
              !current.tag
                ? 'border-ink bg-ink text-on-dark'
                : 'border-ink/20 text-ink hover:border-ink'
            )}
          >
            <TypographyMeta as="span">All</TypographyMeta>
          </Link>
          {tags.map((tag) => (
            <Link
              key={tag}
              href={buildHref(category, { availability, tag })}
              className={cn(
                'border px-3 py-1 capitalize no-underline transition',
                current.tag === tag
                  ? 'border-ink bg-ink text-on-dark'
                  : 'border-ink/20 text-ink hover:border-ink'
              )}
            >
              <TypographyMeta as="span">{tag}</TypographyMeta>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

type ShopPaginationProps = {
  category: ProductCategory;
  page: number;
  totalPages: number;
  filters: { availability?: string; tag?: string };
};

export function ShopPagination({ category, page, totalPages, filters }: ShopPaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <nav
      className={`flex items-center justify-between gap-4 border-t border-ink/10 pt-10 ${editorial.stack.block}`}
      aria-label="Product pages"
    >
      {page > 1 ? (
        <Link
          href={buildHref(category, { ...filters, page: page - 1 })}
          className="text-blue no-underline"
        >
          <TypographyMeta as="span">← Previous</TypographyMeta>
        </Link>
      ) : (
        <span />
      )}
      <TypographyMeta>
        Page {page} of {totalPages}
      </TypographyMeta>
      {page < totalPages ? (
        <Link
          href={buildHref(category, { ...filters, page: page + 1 })}
          className="text-blue no-underline"
        >
          <TypographyMeta as="span">Next →</TypographyMeta>
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
