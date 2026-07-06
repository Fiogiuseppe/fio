import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { formatUreesDate, ureesSite } from '@/data/urees';

export const metadata: Metadata = {
  title: 'Urees news — Urees Store',
};

export default function UreesBlogIndexPage() {
  return (
    <section className="urees-section">
      <div className="urees-page-width">
        <h1 className="urees-section__title">Urees news</h1>
        <div className="urees-blog-list">
          {ureesSite.articles.map((article) => (
            <article key={article.handle} className="urees-blog-list__item">
              <Link href={`/urees/blogs/urees-news/${article.handle}`}>
                {article.image && (
                  <div className="urees-blog-list__image">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                )}
                <div>
                  <h2>{article.title}</h2>
                  <p>{formatUreesDate(article.publishedAt)} · Urees Reuse</p>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
