import Image from 'next/image';
import Link from 'next/link';

type UreesHeroBannerProps = {
  image: string;
  headline: string;
  cta: { label: string; href: string };
};

export function UreesHeroBanner({ image, headline, cta }: UreesHeroBannerProps) {
  const ctaHref = cta.href.startsWith('/') ? `/urees${cta.href}` : cta.href;

  return (
    <section className="urees-hero-banner">
      <Image
        src={image}
        alt="Urees"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="urees-hero-banner__overlay">
        <div className="urees-hero-banner__content">
          <h1 className="urees-hero-banner__headline">{headline}</h1>
          <Link href={ctaHref} className="urees-button urees-button--secondary urees-hero-banner__cta">
            {cta.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
