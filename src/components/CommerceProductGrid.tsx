import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import type { ShopGroup } from '@/data/shop-catalog';
import { productBadgeLabel, productHref, productListPrice } from '@/lib/utils';
import styles from './CommerceProductGrid.module.css';

type CommerceProductCardProps = {
  product: Product;
  brandLine: string;
  priceGroup?: ShopGroup;
};

export function CommerceProductCard({ product, brandLine, priceGroup }: CommerceProductCardProps) {
  const isGif = product.images[0]?.endsWith('.gif');
  const href = productHref(product);

  return (
    <Link href={href} className={styles.card}>
      <div className={styles.media}>
        <div className={styles.mediaInner}>
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            className={styles.image}
            sizes="(max-width: 750px) 50vw, 25vw"
            unoptimized={isGif}
          />
        </div>
      </div>

      <div>
        <h3 className={styles.title}>{product.title}</h3>
        <p className={styles.brand}>{brandLine}</p>
        <p className={styles.price}>{productListPrice(product, priceGroup)}</p>
        <span className={styles.badge}>{productBadgeLabel(product, priceGroup)}</span>
      </div>
    </Link>
  );
}

type CommerceProductGridProps = {
  products: Product[];
  brandLine: string;
  priceGroup?: ShopGroup;
};

export function CommerceProductGrid({ products, brandLine, priceGroup }: CommerceProductGridProps) {
  return (
    <div className={styles.grid}>
      {products.map((product) => (
        <CommerceProductCard
          key={`${priceGroup ?? 'default'}-${product.slug}`}
          product={product}
          brandLine={brandLine}
          priceGroup={priceGroup}
        />
      ))}
    </div>
  );
}
