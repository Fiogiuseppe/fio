import type { Metadata } from 'next';
import { SectionIntro } from '@/components/SectionIntro';
import { PageSection } from '@/components/PageSection';
import { ProductCard } from '@/components/ProductCard';
import { CTA } from '@/components/CTA';
import { TypographyMeta } from '@/components/typography';
import { editorial } from '@/lib/typography';
import { getProductsByCategory, UREES_BRAND } from '@/data/products';

export const metadata: Metadata = {
  title: 'UREES — Giuseppe Fioretti',
  description: UREES_BRAND.description,
};

export default function UreesPage() {
  const pieces = getProductsByCategory('urees');

  return (
    <PageSection>
      <SectionIntro
        kicker="One of one"
        title={UREES_BRAND.title}
        description={UREES_BRAND.description}
      />

      <div className={`flex flex-wrap items-center gap-4 ${editorial.stack.titleToLead}`}>
        <TypographyMeta>
          Wearable pieces · Not shop — a brand apart
        </TypographyMeta>
        <a
          href={UREES_BRAND.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue no-underline hover:underline"
        >
          <TypographyMeta>@urees__</TypographyMeta>
        </a>
      </div>

      <div className={`grid gap-12 sm:grid-cols-2 lg:grid-cols-3 ${editorial.stack.leadToContent}`}>
        {pieces.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>

      <div className={`flex flex-wrap gap-4 ${editorial.stack.block}`}>
        <CTA href="/work/urees" label="Brand story" variant="secondary" />
        <CTA href="/contact" label="Request a piece" />
      </div>
    </PageSection>
  );
}
