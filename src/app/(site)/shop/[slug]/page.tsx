import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Badge } from '@/components/Badge';
import { Gallery } from '@/components/Gallery';
import { CTA } from '@/components/CTA';
import {
  TypographyBody,
  TypographyButton,
  TypographySection,
  TypographyLabel,
  TypographyLead,
  TypographyMeta,
} from '@/components/typography';
import { editorial } from '@/lib/typography';
import { getProduct } from '@/data/products';
import {
  availabilityLabel,
  categoryLabel,
  formatPrice,
  productCtaLabel,
} from '@/lib/utils';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const { products } = await import('@/data/products');
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: `${product.title} — Shop`,
    description: product.shortDescription,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const isGif = product.images[0]?.endsWith('.gif');
  const isSold = product.availability === 'sold';
  const isComingSoon = product.availability === 'coming-soon';

  return (
    <article className="px-6 py-12 md:px-10 md:py-20">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="relative aspect-[3/4] overflow-hidden bg-ink/5">
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width:1024px) 100vw, 50vw"
            unoptimized={isGif}
          />
        </div>

        <div className="flex flex-col justify-center">
          <Badge variant={isSold ? 'sold' : 'available'}>
            {availabilityLabel(product.availability)}
          </Badge>
          <TypographyMeta className={editorial.stack.labelToTitle}>
            {categoryLabel(product.category)}
          </TypographyMeta>
          <TypographySection as="h1" className={editorial.stack.labelToTitle}>
            {product.title}
          </TypographySection>
          <TypographyLead measure={false} className={editorial.stack.titleToLead}>
            {product.shortDescription}
          </TypographyLead>

          <dl className={`space-y-4 border-t border-ink/10 pt-10 ${editorial.stack.block}`}>
            <div className="flex justify-between gap-4">
              <TypographyLabel as="dt">Price</TypographyLabel>
              <TypographyBody as="dd" measure={false}>{formatPrice(product.price, product.currency)}</TypographyBody>
            </div>
            {product.size && (
              <div className="flex justify-between gap-4">
                <TypographyLabel as="dt">Size</TypographyLabel>
                <TypographyBody as="dd" measure={false}>{product.size}</TypographyBody>
              </div>
            )}
            {product.technique && (
              <div className="flex justify-between gap-4">
                <TypographyLabel as="dt">Technique</TypographyLabel>
                <TypographyBody as="dd" measure={false}>{product.technique}</TypographyBody>
              </div>
            )}
            {product.edition && (
              <div className="flex justify-between gap-4">
                <TypographyLabel as="dt">Edition</TypographyLabel>
                <TypographyBody as="dd" measure={false}>{product.edition}</TypographyBody>
              </div>
            )}
          </dl>

          <div className={editorial.stack.block}>
            {isSold ? (
              <TypographyMeta>This piece has been collected.</TypographyMeta>
            ) : isComingSoon ? (
              <CTA href="/contact" label="Request this piece" variant="secondary" />
            ) : (
              <button
                type="button"
                disabled
                title="Stripe checkout coming soon"
                className="cursor-not-allowed border border-ink bg-ink px-8 py-3 text-cream opacity-90"
              >
                <TypographyButton as="span">{productCtaLabel(product)} — soon</TypographyButton>
              </button>
            )}
            <TypographyMeta className={editorial.stack.labelToTitle}>
              Checkout via Stripe will be available soon. For now,{' '}
              <a href="/contact" className="text-blue">
                contact Giuseppe
              </a>{' '}
              to collect.
            </TypographyMeta>
          </div>
        </div>
      </div>

      <div className={`mx-auto max-w-3xl ${editorial.stack.page}`}>
        <TypographySection>The story</TypographySection>
        <TypographyBody className={editorial.stack.sectionToContent}>{product.longStory}</TypographyBody>
      </div>

      {product.images.length > 1 && (
        <div className={`mx-auto max-w-7xl ${editorial.stack.block}`}>
          <Gallery images={product.images.slice(1)} alt={product.title} />
        </div>
      )}
    </article>
  );
}
