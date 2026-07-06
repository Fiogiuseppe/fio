import Image from 'next/image';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SectionIntro } from '@/components/SectionIntro';
import { ProductCard } from '@/components/ProductCard';
import { CTA } from '@/components/CTA';
import { TypographyBody, TypographyMeta, TypographySection } from '@/components/typography';
import { editorial } from '@/lib/typography';
import { getProductsByCategory, UREES_BRAND } from '@/data/products';

export const metadata: Metadata = {
  title: 'UREES — Giuseppe Fioretti',
  description: UREES_BRAND.description,
};

export default function UreesPage() {
  const pieces = getProductsByCategory('urees');

  return (
    <>
      <div className="urees-site__hero">
        <Image
          src={UREES_BRAND.image}
          alt="UREES wearable piece"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>

      <div className="px-6 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-7xl">
          <Link href="/" className="urees-site__back">
            Giuseppe Fioretti
          </Link>

          <div className={editorial.stack.block}>
            <SectionIntro
              kicker="Wearable universe"
              title={UREES_BRAND.title}
              description={UREES_BRAND.description}
            />
          </div>

          <div className={`flex flex-wrap items-center gap-4 ${editorial.stack.titleToLead}`}>
            <TypographyMeta>One-of-one upcycled pieces</TypographyMeta>
            <a
              href={UREES_BRAND.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue no-underline hover:underline"
            >
              <TypographyMeta>@urees__</TypographyMeta>
            </a>
          </div>

          <section id="shop" className={`urees-site__shop ${editorial.stack.leadToContent}`}>
            <TypographySection as="h2" className={editorial.stack.labelToTitle}>
              Shop
            </TypographySection>
            <TypographyBody measure={false} className={editorial.stack.sectionToContent}>
              Each garment is found, transformed and released once. This is the UREES shop — separate
              from the main gallery.
            </TypographyBody>
            <div className={`grid gap-12 sm:grid-cols-2 lg:grid-cols-3 ${editorial.stack.block}`}>
              {pieces.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          </section>

          <div className={`flex flex-wrap gap-4 ${editorial.stack.block}`}>
            <CTA href="/work/urees" label="Brand story" variant="secondary" />
            <CTA href="/contact" label="Request a piece" />
          </div>
        </div>
      </div>
    </>
  );
}
