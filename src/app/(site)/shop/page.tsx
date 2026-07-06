import type { Metadata } from 'next';
import { CommerceProductGrid } from '@/components/CommerceProductGrid';
import { getProductsByCategory, shopCategories } from '@/data/products';
import styles from './shop.module.css';

export const metadata: Metadata = {
  title: 'Shop — Giuseppe Fioretti',
  description: 'Original handmade artworks — drawings, paintings and visceral pieces.',
};

const GALLERY_CATEGORIES = shopCategories.filter((category) => category.slug !== 'urees');

export default function ShopPage() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.pageWidth}>
          <div className={styles.intro}>
            <p className={styles.introKicker}>Gallery shop</p>
            <h1 className={styles.introTitle}>Shop</h1>
            <p className={styles.introDescription}>
              Everything here is made by hand — drawings, paintings and visceral works, often
              mixed on the same piece.
            </p>
          </div>
        </div>
      </section>

      {GALLERY_CATEGORIES.map((category) => {
        const products = getProductsByCategory(category.slug);

        if (products.length === 0) return null;

        return (
          <section key={category.slug} className={styles.section}>
            <div className={styles.pageWidth}>
              <h2 className={styles.sectionTitle}>{category.title}</h2>
              <CommerceProductGrid products={products} brandLine="Giuseppe Fioretti" />
            </div>
          </section>
        );
      })}
    </>
  );
}
