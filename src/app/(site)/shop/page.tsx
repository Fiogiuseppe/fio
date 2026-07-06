import type { Metadata } from 'next';
import { SectionIntro } from '@/components/SectionIntro';
import { CommerceProductGrid } from '@/components/CommerceProductGrid';
import { editorialSpace } from '@/lib/editorial';
import { getShopProducts } from '@/data/products';

export const metadata: Metadata = {
  title: 'Shop — Giuseppe Fioretti',
  description: 'Original handmade artworks — drawings, paintings and visceral pieces.',
};

export default function ShopPage() {
  const items = getShopProducts();

  return (
    <>
      <section className={`${editorialSpace.sectionX} ${editorialSpace.sectionY}`}>
        <div className="mx-auto max-w-7xl">
          <SectionIntro
            kicker="Gallery shop"
            title="Shop"
            description="Everything here is made by hand — drawings, paintings and visceral works, often mixed on the same piece."
          />
        </div>
      </section>

      <CommerceProductGrid products={items} brandLine="Giuseppe Fioretti" />
    </>
  );
}
