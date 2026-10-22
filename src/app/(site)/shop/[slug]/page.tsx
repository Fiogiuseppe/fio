import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
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
import { getProductShopGroups, MUSEUM_COLLECTION } from '@/data/shop-catalog';
import { isVisceralPoemProduct } from '@/data/visceral-poems-pricing';
import { getProduct } from '@/data/products';
import {
  availabilityLabel,
  productCtaLabel,
  productListPriceValue,
} from '@/lib/utils';
import styles from './product.module.css';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const { getShopProducts } = await import('@/data/products');
  return getShopProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product || product.category === 'urees') return {};
  return {
    title: `${product.title} — ${MUSEUM_COLLECTION.artist}`,
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

  if (isVisceralPoem) {
    return (
      <article className="px-6 py-12 md:px-10 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-3xl md:mb-14">
            <TypographyMeta>{availabilityLabel(product.availability)}</TypographyMeta>
            <TypographySection as="h1" className={editorial.stack.labelToTitle}>
              {product.title}
            </TypographySection>
            <TypographyLead measure={false} className={editorial.stack.titleToLead}>
              {product.shortDescription}
            </TypographyLead>
          </div>
          <VisceralPoemOptions product={product} />
          <div className={`mt-10 border-t border-ink/10 pt-10 ${editorial.stack.block}`}>
            <dl className="space-y-4">
              <div className="flex justify-between gap-4">
                <TypographyLabel as="dt">From</TypographyLabel>
                <TypographyBody as="dd" measure={false}>
                  {productListPriceValue(product, priceGroup)}
                </TypographyBody>
              </div>
            </dl>
          </div>
        </div>
      </article>
    );
  }

  const metaLine = [
    product.year ? String(product.year) : null,
    product.technique ?? null,
    product.size ?? null,
  ]
    .filter(Boolean)
    .join(' · ');

  return (
    <article className={styles.page}>
      <div className={styles.pageWidth}>
        <p className={styles.artist}>{MUSEUM_COLLECTION.artist}</p>

        <div className={styles.stage}>
          <div className={styles.wall}>
            <div className={styles.frame}>
              <Image
                src={product.images[0]}
                alt={product.title}
                fill
                className={styles.image}
                priority
                sizes="(max-width:1024px) 92vw, 40rem"
                unoptimized={isGif}
              />
            </div>
          </div>
        </div>

        <header className={styles.label}>
          <h1 className={styles.title}>{product.title}</h1>
          {metaLine ? <p className={styles.meta}>{metaLine}</p> : null}
          <p className={styles.edition}>{product.edition ?? 'Original'}</p>
          <p className={`${styles.status}${isSold ? ` ${styles.statusSold}` : ''}`}>
            {isSold ? 'In a private collection' : availabilityLabel(product.availability)}
          </p>
        </header>

        <div className={styles.details}>
          <p className={styles.story}>{product.longStory}</p>

          <dl className={styles.spec}>
            <div className={styles.specRow}>
              <dt>Price</dt>
              <dd>{productListPriceValue(product)}</dd>
            </div>
            {product.technique ? (
              <div className={styles.specRow}>
                <dt>Medium</dt>
                <dd>{product.technique}</dd>
              </div>
            ) : null}
            {product.year ? (
              <div className={styles.specRow}>
                <dt>Year</dt>
                <dd>{product.year}</dd>
              </div>
            ) : null}
            {product.edition ? (
              <div className={styles.specRow}>
                <dt>Edition</dt>
                <dd>{product.edition}</dd>
              </div>
            ) : null}
          </dl>

          <div className={styles.cta}>
            {isSold ? (
              <p className={styles.collected}>This piece has been collected.</p>
            ) : isComingSoon ? (
              <CTA href="/contact" label="Enquire about this work" variant="secondary" />
            ) : (
              <ShopCheckoutButton slug={product.slug} label={productCtaLabel(product)} />
            )}
            {canCheckout ? (
              <p className={styles.note}>
                Secure checkout with Stripe. Enter your shipping address and we will deliver your
                piece.
              </p>
            ) : null}
          </div>
        </div>

        {product.images.length > 1 ? (
          <div className={styles.gallery}>
            <Gallery images={product.images.slice(1)} alt={product.title} />
          </div>
        ) : null}
      </div>
    </article>
  );
}
