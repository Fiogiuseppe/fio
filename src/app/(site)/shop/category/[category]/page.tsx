import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { SectionIntro } from '@/components/SectionIntro';
import { ProductCard } from '@/components/ProductCard';
import { TypographyMeta } from '@/components/typography';
import { editorial } from '@/lib/typography';
import { getProductsByCategory, shopCategories } from '@/data/products';
import { categoryLabel } from '@/lib/utils';
import type { ProductCategory } from '@/lib/types';

type Props = { params: Promise<{ category: string }> };

export async function generateStaticParams() {
  return shopCategories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const cat = shopCategories.find((c) => c.slug === category);
  if (!cat) return {};
  return { title: `${cat.title} — Shop`, description: cat.description };
}

export default async function ShopCategoryPage({ params }: Props) {
  const { category } = await params;
  const cat = shopCategories.find((c) => c.slug === category);
  if (!cat) notFound();

  const items = getProductsByCategory(category as ProductCategory);

  return (
    <div className="px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionIntro kicker="Shop" title={cat.title} description={cat.description} />
        <TypographyMeta className={editorial.stack.titleToLead}>
          {categoryLabel(category)} · {items.length} pieces
        </TypographyMeta>
        <div className={`grid gap-12 sm:grid-cols-2 lg:grid-cols-3 ${editorial.stack.leadToContent}`}>
          {items.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
