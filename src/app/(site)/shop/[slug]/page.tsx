import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Badge } from '@/components/Badge';
import { Gallery } from '@/components/Gallery';
import { CTA } from '@/components/CTA';
import { ShopCheckoutButton } from '@/components/ShopCheckoutButton';
import { VisceralPoemOptions } from '@/components/VisceralPoemOptions';
import {
  TypographyBody,
  TypographySection,
  TypographyLabel,
  TypographyLead,
  TypographyMeta,
} from '@/components/typography';
import { editorial } from '@/lib/typography';
import { getProductShopGroups } from '@/data/shop-catalog';
import { isVisceralPoemProduct } from '@/data/visceral-poems-pricing';
import { getProduct } from '@/data/products';
import {
  availabilityLabel,
  categoryLabel,
  formatPrice,
  productCtaLabel,
  productListPriceValue,
} from '@/lib/utils';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const { getShopProducts } = await import('@/data/products');
  return getShopProducts().map((p) => ({ slug: p.slug }));
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
  if (!product || product.category === 'urees') notFound();

  const isVisceralPoem = isVisceralPoemProduct(product.category);
  const isGif = product.images[0]?.endsWith('.gif');
  const isSold = product.availability === 'sold';
  const isComingSoon = product.availability === 'coming-soon';
  const canCheckout = !isSold && !isComingSoon;
  const priceGroup = isVisceralPoem
    ? getProductShopGroups(product).includes('handmade')
      ? 'handmade'
      : 'digital'
    : undefined;

  return (
    <article className="px-6 py-12 md:px-10 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className={`mb-10 md:mb-14 ${isVisceralPoem ? 'max-w-3xl' : ''}`}>
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
        </div>

        {isVisceralPoem ? (
          <VisceralPoemOptions product={product} />
        ) : (
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
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
              <dl className={`space-y-4 border-t border-ink/10 pt-10 ${editorial.stack.block}`}>
                <div className="flex justify-between gap-4">
                  <TypographyLabel as="dt">Price</TypographyLabel>
                  <TypographyBody as="dd" measure={false}>
                    {formatPrice(product.price, product.currency)}
                  </TypographyBody>
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
                {product.tags && product.tags.length > 0 && (
                  <div className="flex justify-between gap-4">
                    <TypographyLabel as="dt">Type</TypographyLabel>
                    <TypographyBody as="dd" measure={false} className="capitalize">
                      {product.tags.join(' · ')}
                    </TypographyBody>
                  </div>
                )}
              </dl>

              <div className={editorial.stack.block}>
                {isSold ? (
                  <TypographyMeta>This piece has been collected.</TypographyMeta>
                ) : isComingSoon ? (
                  <CTA href="/contact" label="Request this piece" variant="secondary" />
                ) : (
                  <ShopCheckoutButton slug={product.slug} label={productCtaLabel(product)} />
                )}
                {canCheckout ? (
                  <TypographyMeta className={editorial.stack.labelToTitle}>
                    Secure checkout with Stripe. Enter your shipping address and we will deliver
                    your piece to your door.
                  </TypographyMeta>
                ) : null}
              </div>
            </div>
          </div>
        )}

        {isVisceralPoem ? (
          <div className={`mt-10 border-t border-ink/10 pt-10 ${editorial.stack.block}`}>
            <dl className="space-y-4">
              <div className="flex justify-between gap-4">
                <TypographyLabel as="dt">From</TypographyLabel>
                <TypographyBody as="dd" measure={false}>
                  {productListPriceValue(product, priceGroup)}
                </TypographyBody>
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
            </dl>

            {canCheckout ? (
              <TypographyMeta className={editorial.stack.labelToTitle}>
                Secure checkout with Stripe. Choose your format above, then complete payment and
                shipping details. More pieces on{' '}
                <a
                  href="https://www.instagram.com/visceralpoems/"
                  className="text-blue"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @visceralpoems
                </a>
                .
              </TypographyMeta>
            ) : isSold ? (
              <TypographyMeta>This piece has been collected.</TypographyMeta>
            ) : null}
          </div>
        ) : null}
      </div>

      {!isVisceralPoem ? (
        <div className={`mx-auto max-w-7xl ${editorial.stack.page}`}>
          <div className="max-w-3xl">
            <TypographySection>The story</TypographySection>
            <TypographyBody className={editorial.stack.sectionToContent}>
              {product.longStory}
            </TypographyBody>
          </div>
        </div>
      ) : null}

      {!isVisceralPoem && product.images.length > 1 && (
        <div className={`mx-auto max-w-7xl ${editorial.stack.block}`}>
          <Gallery images={product.images.slice(1)} alt={product.title} />
        </div>
      )}
    </article>
  );
}
