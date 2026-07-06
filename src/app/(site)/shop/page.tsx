import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { SectionIntro } from '@/components/SectionIntro';
import { PageSection } from '@/components/PageSection';
import {
  TypographyBody,
  TypographyCard,
  TypographyLabel,
} from '@/components/typography';
import { editorial } from '@/lib/typography';
import { shopCategories } from '@/data/products';

export const metadata: Metadata = {
  title: 'Shop — Giuseppe Fioretti',
  description: 'Collect original artworks and paintings.',
};

export default function ShopPage() {
  return (
    <PageSection>
      <SectionIntro
        kicker="Gallery shop"
        title="Shop"
        description="Original artworks and paintings — collected, not consumed."
      />

      <div className={`grid gap-8 md:grid-cols-3 ${editorial.stack.leadToContent}`}>
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
              <div className={`border-t border-ink/10 pt-6 ${editorial.stack.block}`}>
                <TypographyCard className="text-ink group-hover:text-blue">{cat.title}</TypographyCard>
                <TypographyBody measure={false} className={`${editorial.stack.sectionToContent} text-ink/60`}>
                  {cat.description}
                </TypographyBody>
                <TypographyLabel className={`${editorial.stack.block} text-ink/40 group-hover:text-blue`}>
                  Explore drop →
                </TypographyLabel>
              </div>
            </Link>
          );
        })}
      </div>
    </PageSection>
  );
}
