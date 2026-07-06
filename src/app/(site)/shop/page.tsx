import { Suspense } from 'react';
import type { Metadata } from 'next';
import { CommerceProductGrid } from '@/components/CommerceProductGrid';
import { ShopGroupFilter } from '@/components/ShopGroupFilter';
import { getShopSections, parseShopGroupFilter } from '@/data/shop-catalog';
import styles from './shop.module.css';

export const metadata: Metadata = {
  title: 'Shop — Giuseppe Fioretti',
  description:
    'Handmade paintings and Visceral Poems originals, plus signed digital prints from @visceralpoems.',
};

type ShopPageProps = {
  searchParams: Promise<{ group?: string }>;
};

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const { group } = await searchParams;
  const filter = parseShopGroupFilter(group);
  const sections = getShopSections(filter);

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.pageWidth}>
          <div className={styles.intro}>
            <p className={styles.introKicker}>Gallery shop</p>
            <h1 className={styles.introTitle}>Shop</h1>
            <p className={styles.introDescription}>
              Two ways to collect: handmade originals — paintings and ink poems — or signed
              digital prints from the Visceral Poems series.
            </p>
          </div>

          <Suspense fallback={null}>
            <ShopGroupFilter />
          </Suspense>
        </div>
      </section>

      {sections.map((section) => (
        <section key={section.id} className={styles.section} id={section.id}>
          <div className={styles.pageWidth}>
            <div className={styles.sectionHead}>
              <h2 className={styles.sectionTitle}>{section.title}</h2>
              <p className={styles.sectionGroup}>
                {section.group === 'handmade' ? 'Handmade' : 'Digital'}
              </p>
            </div>
            <p className={styles.sectionDescription}>{section.description}</p>
            <CommerceProductGrid
              products={section.products}
              brandLine="Giuseppe Fioretti"
              priceGroup={section.group}
            />
          </div>
        </section>
      ))}
    </>
  );
}
