import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { SectionIntro } from '@/components/SectionIntro';
import { shopCategories } from '@/data/products';

export const metadata: Metadata = {
  title: 'Shop — Giuseppe Fioretti',
  description: 'Collect original artworks, paintings and one-of-one UREES pieces.',
};

export default function ShopPage() {
  return (
    <div className="px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionIntro
          kicker="Gallery shop"
          title="Shop"
          description="Original artworks, paintings and wearable pieces — collected, not consumed."
        />

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {shopCategories.map((cat) => {
            const isGif = cat.image.endsWith('.gif');
            return (
              <Link
                key={cat.slug}
                href={`/shop/category/${cat.slug}`}
                className="group block no-underline"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-ink/5">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-[1.03]"
                    sizes="(max-width:768px) 100vw, 33vw"
                    unoptimized={isGif}
                  />
                </div>
                <div className="mt-6 border-t border-ink/10 pt-6">
                  <h2 className="font-display text-3xl text-ink group-hover:text-blue">{cat.title}</h2>
                  <p className="mt-3 text-ink/60">{cat.description}</p>
                  <span className="mt-4 inline-block text-xs uppercase tracking-widest text-ink/40 group-hover:text-blue">
                    Explore drop →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
