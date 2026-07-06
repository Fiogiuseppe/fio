import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { UreesProductGrid } from '@/components/urees/UreesProductGrid';
import { getUreesCollection, getUreesPants, ureesCatalog } from '@/data/urees';

type Props = { params: Promise<{ handle: string }> };

const COLLECTION_TITLES: Record<string, string> = {
  frontpage: 'FIRST DROP UREES',
  pants: 'Pants',
  'discover-the-best-in-sustainable-fashion-best-sellers-collection-urees': 'Best sellers',
};

export async function generateStaticParams() {
  const handles = [
    ...(ureesCatalog.collections?.map((collection) => collection.handle) ?? []),
    'pants',
  ];
  return [...new Set(handles)].map((handle) => ({ handle }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  return {
    title: `${COLLECTION_TITLES[handle] ?? 'Collection'} — Urees Store`,
  };
}

export default async function UreesCollectionPage({ params }: Props) {
  const { handle } = await params;
  const products = handle === 'pants' ? getUreesPants() : getUreesCollection(handle);

  if (!products.length) notFound();

  return (
    <section className="urees-section">
      <div className="urees-page-width">
        <h1 className="urees-section__title">{COLLECTION_TITLES[handle] ?? 'Collection'}</h1>
        <UreesProductGrid products={products} />
      </div>
    </section>
  );
}
