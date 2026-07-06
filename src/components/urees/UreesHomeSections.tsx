import Image from 'next/image';
import Link from 'next/link';
import { UreesBannerCarousel } from '@/components/urees/UreesBannerCarousel';
import { UreesProductGrid } from '@/components/urees/UreesProductGrid';
import { ureesHomeCopy } from '@/data/urees/content';
import { formatUreesDate, ureesSite } from '@/data/urees';
import type { UreesProduct } from '@/lib/urees-types';

type UreesHomeSectionsProps = {
  products: UreesProduct[];
};

export function UreesHomeSections({ products }: UreesHomeSectionsProps) {
  const { homepage, articles } = ureesSite;
  const revivingSlides = homepage.reviving;

  return (
    <>
      <section className="urees-hero-banner">
        <Image
          src={homepage.heroImage}
          alt="Urees"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </section>

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

      <section className="urees-section" id="news">
        <div className="urees-page-width">
          <div className="urees-section__head">
            <h2 className="urees-section__title">Urees news</h2>
            <Link href="/urees/blogs/urees-news" className="urees-text-link">
              View all
            </Link>
          </div>
          <div className="urees-news-grid">
            {articles.slice(0, 3).map((article) => (
              <Link
                key={article.handle}
                href={`/urees/blogs/urees-news/${article.handle}`}
                className="urees-news-card"
              >
                <h4>{article.title}</h4>
                <p>{article.bodyHtml.replace(/<[^>]+>/g, '').slice(0, 140)}…</p>
                <small>{formatUreesDate(article.publishedAt)} · Urees Reuse</small>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="urees-section urees-section--soft" id={ureesHomeCopy.podcast.id}>
        <div className="urees-page-width urees-copy-block">
          <h2 className="urees-section__title">{ureesHomeCopy.podcast.title}</h2>
          <p>{ureesHomeCopy.podcast.body}</p>
          <p className="urees-note">{ureesHomeCopy.podcast.note}</p>
        </div>
      </section>

      <section className="urees-section" id={ureesHomeCopy.instagram.id}>
        <div className="urees-page-width urees-copy-block">
          <h2 className="urees-section__title">{ureesHomeCopy.instagram.title}</h2>
          <a href={ureesHomeCopy.instagram.href} className="urees-button">
            {ureesHomeCopy.instagram.handle}
          </a>
          <p className="urees-instagram-tagline">{ureesHomeCopy.instagram.tagline}</p>
        </div>
      </section>
    </>
  );
}
