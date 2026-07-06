import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { formatPrice, productCtaLabel, productHref } from '@/lib/utils';
import styles from './CommerceProductGrid.module.css';

type CommerceProductCardProps = {
  product: Product;
  brandLine: string;
};

function commerceButtonLabel(product: Product) {
  if (product.availability === 'sold') return 'Sold';
  if (product.cta === 'request' || product.availability === 'coming-soon') {
    return 'Request piece';
  }
  return 'Add to cart';
}

export function CommerceProductCard({ product, brandLine }: CommerceProductCardProps) {
  const isGif = product.images[0]?.endsWith('.gif');
  const isSold = product.availability === 'sold';
  const href = productHref(product);

  return (
    <Link href={href} className={styles.card}>
      <div className={styles.media}>
        <Image
          src={product.images[0]}
          alt={product.title}
          fill
          className={styles.image}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          unoptimized={isGif}
        />
        {isSold ? <div className={styles.soldOverlay}>Sold</div> : null}
      </div>

      <div className={styles.copy}>
        <h2 className={styles.title}>{product.title}</h2>
        <p className={styles.brand}>{brandLine}</p>
        <p className={styles.description}>{product.shortDescription}</p>
        <p className={styles.price}>{formatPrice(product.price, product.currency)}</p>
        <span
          className={`${styles.cta} ${isSold ? styles.ctaDisabled : ''}`}
          aria-hidden="true"
        >
          {commerceButtonLabel(product)}
        </span>
      </div>
    </Link>
  );
}

type CommerceProductGridProps = {
  products: Product[];
  brandLine: string;
};

export function CommerceProductGrid({ products, brandLine }: CommerceProductGridProps) {
  return (
    <div className={styles.grid}>
      {products.map((product) => (
        <CommerceProductCard key={product.slug} product={product} brandLine={brandLine} />
      ))}
    </div>
  );
}
