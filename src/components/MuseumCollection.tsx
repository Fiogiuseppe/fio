import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { MUSEUM_COLLECTION } from '@/data/shop-catalog';
import { availabilityLabel, productHref } from '@/lib/utils';
import styles from './MuseumCollection.module.css';

type MuseumCollectionProps = {
  products: Product[];
};

function museumMeta(product: Product) {
  const parts = [
    product.year ? String(product.year) : null,
    product.technique ?? null,
    product.edition ?? null,
  ].filter(Boolean);
  return parts.join(' · ');
}

export function MuseumCollection({ products }: MuseumCollectionProps) {
  return (
    <section className={styles.collection}>
      <div className={styles.pageWidth}>
        <header className={styles.intro}>
          <p className={styles.artist}>{MUSEUM_COLLECTION.artist}</p>
          <h1 className={styles.heading}>{MUSEUM_COLLECTION.title}</h1>
          <p className={styles.lead}>{MUSEUM_COLLECTION.lead}</p>
        </header>

        <div className={styles.works}>
          {products.map((product) => {
            const isSold = product.availability === 'sold';
            const isGif = product.images[0]?.endsWith('.gif');

            return (
              <Link
                key={product.slug}
                href={productHref(product)}
                className={`${styles.work}${isSold ? ` ${styles.sold}` : ''}`}
              >
                <div className={styles.wall}>
                  <div className={styles.frame}>
                    <Image
                      src={product.images[0]}
                      alt={product.title}
                      fill
                      className={styles.image}
                      sizes="(max-width: 900px) 90vw, 38rem"
                      unoptimized={isGif}
                      priority={product.slug === products[0]?.slug}
                    />
                  </div>
                </div>

                <div className={styles.label}>
                  <h2 className={styles.title}>{product.title}</h2>
                  <p className={styles.meta}>{museumMeta(product)}</p>
                  <span
                    className={`${styles.status}${
                      !isSold ? ` ${styles.statusAvailable}` : ''
                    }`}
                  >
                    {isSold ? 'In a private collection' : availabilityLabel(product.availability)}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
