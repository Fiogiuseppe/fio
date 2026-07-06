import type { Metadata } from 'next';
import { UreesProductGrid } from '@/components/urees/UreesProductGrid';
import { getUreesPants } from '@/data/urees';

export const metadata: Metadata = {
  title: 'Pants — Urees Store',
  description: 'All handmade upcycled pants by Urees.',
};

export default function UreesPantsCollectionPage() {
  const pants = getUreesPants();

  return (
    <section className="urees-section">
      <div className="urees-page-width">
        <h1 className="urees-section__title">Pants</h1>
        <UreesProductGrid products={pants} />
      </div>
    </section>
  );
}
