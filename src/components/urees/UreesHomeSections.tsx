import Link from 'next/link';
import { UreesBannerCarousel } from '@/components/urees/UreesBannerCarousel';
import { UreesHeroBanner } from '@/components/urees/UreesHeroBanner';
import { UreesNewsSection } from '@/components/urees/UreesNewsSection';
import { UreesPodcastSection } from '@/components/urees/UreesPodcastSection';
import { UreesProductGrid } from '@/components/urees/UreesProductGrid';
import { UreesVideoSection } from '@/components/urees/UreesVideoSection';
import { ureesHomeCopy } from '@/data/urees/content';
import { ureesSite } from '@/data/urees';
import type { UreesProduct } from '@/lib/urees-types';

type UreesHomeSectionsProps = {
  products: UreesProduct[];
};

export function UreesHomeSections({ products }: UreesHomeSectionsProps) {
  const { homepage } = ureesSite;
  const revivingSlides = homepage.reviving;
  const featuredNews =
    homepage.featuredNews?.length > 0
      ? homepage.featuredNews
      : ureesSite.articles.slice(0, 3).map((article) => ({
          handle: article.handle,
          title: article.title,
          image: article.image,
          publishedAt: article.publishedAt,
          tag: 'Urees Reuse',
          excerpt: article.bodyHtml.replace(/<[^>]+>/g, '').slice(0, 160),
        }));

  return (
    <>
      <UreesHeroBanner
        image={homepage.heroImage}
        headline={homepage.hero.headline}
        cta={homepage.hero.cta}
      />

      <section className="urees-section" id={ureesHomeCopy.firstDrop.id}>
        <div className="urees-page-width">
          <h2 className="urees-section__title">{ureesHomeCopy.firstDrop.title}</h2>
          <UreesProductGrid products={products} />
          <div className="urees-section__cta">
            <Link href="/urees/collections/pants" className="urees-button urees-button--secondary">
              View all
            </Link>
          </div>
        </div>
      </section>

      <UreesVideoSection mp4={homepage.video.mp4} poster={homepage.video.poster} />

      <UreesBannerCarousel
        slides={[{ title: homepage.dreaming.title, image: homepage.dreaming.image }]}
      />

      {revivingSlides.map((slide) => (
        <UreesBannerCarousel key={slide.title} slides={[slide]} />
      ))}

      <section className="urees-section" id={ureesHomeCopy.manifesto.id}>
        <div className="urees-page-width">
          <h2 className="urees-section__title">{ureesHomeCopy.manifesto.title}</h2>
          <div className="urees-copy-block">
            {ureesHomeCopy.manifesto.blocks.map((block) => (
              <h3 key={block}>{block}</h3>
            ))}
            <Link href={ureesHomeCopy.manifesto.cta.href} className="urees-button">
              {ureesHomeCopy.manifesto.cta.label}
            </Link>
          </div>
        </div>
      </section>

      <section className="urees-section urees-section--soft" id={ureesHomeCopy.slowFashion.id}>
        <div className="urees-page-width urees-copy-block">
          <h2 className="urees-section__title">{ureesHomeCopy.slowFashion.title}</h2>
          <p>{ureesHomeCopy.slowFashion.body}</p>
          <Link
            href={ureesHomeCopy.slowFashion.cta.href}
            className="urees-button urees-button--secondary"
          >
            {ureesHomeCopy.slowFashion.cta.label}
          </Link>
        </div>
      </section>

      <UreesNewsSection articles={featuredNews} />

      <UreesPodcastSection
        title={homepage.podcast.title}
        body={homepage.podcast.body}
        note={homepage.podcast.note}
        image={homepage.podcast.image}
        spotifyUrl={homepage.podcast.spotifyUrl}
      />

      <section className="urees-section" id={ureesHomeCopy.instagram.id}>
        <div className="urees-page-width urees-copy-block">
          <h2 className="urees-section__title">{ureesHomeCopy.instagram.title}</h2>
          <a href={ureesHomeCopy.instagram.href} className="urees-button">
            {ureesHomeCopy.instagram.handle}
          </a>
          <p className="urees-instagram-tagline">{ureesHomeCopy.instagram.tagline}</p>
        </div>
      </section>

      <section className="urees-section urees-section--soft" id="newsletter">
        <div className="urees-page-width urees-copy-block">
          <h2 className="urees-section__title">Subscribe to our emails</h2>
          <Link
            href="/urees/pages/join-our-newsletter-stay-informed-and-get-exclusive-updates"
            className="urees-button"
          >
            Join newsletter
          </Link>
        </div>
      </section>
    </>
  );
}
