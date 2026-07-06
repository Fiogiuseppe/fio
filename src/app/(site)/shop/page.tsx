import { Suspense } from 'react';
import type { Metadata } from 'next';
import { CommerceProductGrid } from '@/components/CommerceProductGrid';
import { ShopGroupFilter } from '@/components/ShopGroupFilter';
import { getShopSections, parseShopGroupFilter } from '@/data/shop-catalog';
import styles from './shop.module.css';

export const metadata: Metadata = {
  title: 'Shop — Giuseppe Fioretti',
  description:
    'Handmade paintings, Skin is the New Canvas with Claudia Sahuquillo, handpainted works, and Visceral Poems originals plus signed digital prints.',
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
      <section className={styles.toolbar}>
        <div className={styles.pageWidth}>
          <h1 className={styles.srOnly}>Shop</h1>
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
              {section.description ? (
                <p className={styles.sectionDescription}>{section.description}</p>
              ) : null}
            </div>
            <CommerceProductGrid
              products={section.products}
              brandLine={section.brandLine ?? 'Giuseppe Fioretti'}
              priceGroup={section.group}
            />
          </div>
        </section>
      ))}
    </>
  );
}
