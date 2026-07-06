import Image from 'next/image';
import { UreesHomeSections } from '@/components/urees/UreesHomeSections';
import { UREES_LOGO } from '@/data/urees/content';
import { ureesFeaturedProducts } from '@/data/urees';

export default function UreesHomePage() {
  return (
    <>
      <section className="urees-hero-logo" aria-label="Urees">
        <Image
          src={UREES_LOGO}
          alt="Urees"
          width={320}
          height={88}
          priority
          className="h-auto w-auto"
        />
      </section>
      <UreesHomeSections products={ureesFeaturedProducts} />
    </>
  );
}
