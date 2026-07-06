import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { productHref, productListPrice } from '@/lib/utils';
import styles from './CommerceProductGrid.module.css';

type CommerceProductCardProps = {
  product: Product;
  brandLine: string;
};

function badgeLabel(product: Product) {
  if (product.availability === 'sold') return 'Sold out';
  if (product.cta === 'request' || product.availability === 'coming-soon') {
    return 'Request piece';
  }
  return 'Add to cart';
}

export function CommerceProductCard({ product, brandLine }: CommerceProductCardProps) {
  const isGif = product.images[0]?.endsWith('.gif');
  const href = productHref(product);

  return (
    <Link href={href} className={styles.card}>
      <div className={styles.media}>
        <Image
          src={product.images[0]}
          alt={product.title}
          fill
          className={styles.image}
          sizes="(max-width: 750px) 50vw, 25vw"
          unoptimized={isGif}
        />
      </div>

      <div>
        <h3 className={styles.title}>{product.title}</h3>
        <p className={styles.brand}>{brandLine}</p>
        <p className={styles.price}>{productListPrice(product)}</p>
        <span className={styles.badge}>{badgeLabel(product)}</span>
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
