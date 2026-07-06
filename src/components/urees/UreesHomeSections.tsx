import Link from 'next/link';
import { UreesProductGrid } from '@/components/urees/UreesProductGrid';
import { ureesHomeSections, ureesNews } from '@/data/urees/content';
import type { UreesProduct } from '@/lib/urees-types';

type UreesHomeSectionsProps = {
  products: UreesProduct[];
};

export function UreesHomeSections({ products }: UreesHomeSectionsProps) {
  return (
    <>
      <section className="urees-section" id={ureesHomeSections.firstDrop.id}>
        <div className="urees-page-width">
          <h2 className="urees-section__title">{ureesHomeSections.firstDrop.title}</h2>
          <UreesProductGrid products={products} />
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link href="/urees/collections/pants" className="urees-button urees-button--secondary">
              View all pants
            </Link>
          </div>
        </div>
      </section>

      <section className="urees-section urees-section--soft" id={ureesHomeSections.dreaming.id}>
        <div className="urees-page-width urees-copy-block">
          <h2 className="urees-section__title">{ureesHomeSections.dreaming.title}</h2>
        </div>
      </section>

      <section className="urees-section" id={ureesHomeSections.manifesto.id}>
        <div className="urees-page-width">
          <h2 className="urees-section__title">{ureesHomeSections.manifesto.title}</h2>
          <div className="urees-copy-block">
            {ureesHomeSections.manifesto.blocks.map((block) => (
              <div key={block.heading} style={{ marginBottom: '2rem' }}>
                <h3>{block.heading}</h3>
                {'cta' in block && block.cta && (
                  <a href={block.cta.href} className="urees-button" style={{ marginTop: '1rem' }}>
                    {block.cta.label}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="urees-section urees-section--soft" id={ureesHomeSections.slowFashion.id}>
        <div className="urees-page-width urees-copy-block">
          <h2 className="urees-section__title">{ureesHomeSections.slowFashion.title}</h2>
          <p>{ureesHomeSections.slowFashion.body}</p>
          <a
            href={ureesHomeSections.slowFashion.cta.href}
            className="urees-button urees-button--secondary"
            style={{ marginTop: '1.5rem' }}
          >
            {ureesHomeSections.slowFashion.cta.label}
          </a>
        </div>
      </section>

      <section className="urees-section" id="news">
        <div className="urees-page-width">
          <h2 className="urees-section__title">Urees news</h2>
          <div className="urees-news-grid">
            {ureesNews.map((article) => (
              <a key={article.href} href={article.href} className="urees-news-card">
                <h4>{article.title}</h4>
                <p>{article.excerpt}</p>
                <small>
                  {article.date} · {article.tag}
                </small>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="urees-section urees-section--soft" id={ureesHomeSections.podcast.id}>
        <div className="urees-page-width urees-copy-block">
          <h2 className="urees-section__title">{ureesHomeSections.podcast.title}</h2>
          <p>{ureesHomeSections.podcast.body}</p>
          <p style={{ marginTop: '1rem', opacity: 0.7 }}>{ureesHomeSections.podcast.note}</p>
        </div>
      </section>

      <section className="urees-section" id={ureesHomeSections.instagram.id}>
        <div className="urees-page-width urees-copy-block">
          <h2 className="urees-section__title">{ureesHomeSections.instagram.title}</h2>
          <a href={ureesHomeSections.instagram.href} className="urees-button">
            {ureesHomeSections.instagram.handle}
          </a>
          <p style={{ marginTop: '1.5rem' }}>{ureesHomeSections.instagram.tagline}</p>
        </div>
      </section>
    </>
  );
}
