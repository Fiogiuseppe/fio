import type { Metadata } from 'next';
import { MuseumCollection } from '@/components/MuseumCollection';
import { getMuseumCollection, MUSEUM_COLLECTION } from '@/data/shop-catalog';

export const metadata: Metadata = {
  title: 'Collection | Giuseppe Fioretti',
  description: MUSEUM_COLLECTION.lead,
};

export default function ShopPage() {
  const works = getMuseumCollection();

  return <MuseumCollection products={works} />;
}
