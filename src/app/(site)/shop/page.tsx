import type { Metadata } from 'next';
import { SectionIntro } from '@/components/SectionIntro';
import { PageSection } from '@/components/PageSection';
import { ProductCard } from '@/components/ProductCard';
import { editorial } from '@/lib/typography';
import { getShopProducts } from '@/data/products';

export const metadata: Metadata = {
  title: 'Shop — Giuseppe Fioretti',
  description: 'Original handmade artworks — drawings, paintings and visceral pieces.',
};

export default function ShopPage() {
  const items = getShopProducts();

  return (
    <PageSection>
      <SectionIntro
        kicker="Gallery shop"
        title="Shop"
        description="Everything here is made by hand — drawings, paintings and visceral works, often mixed on the same piece."
      />

      <div className={`grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10 ${editorial.stack.leadToContent}`}>
        {items.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </PageSection>
  );
}
