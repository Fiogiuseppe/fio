'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { formatUreesDate } from '@/data/urees';
import type { UreesFeaturedNewsArticle } from '@/lib/urees-site-types';

type UreesNewsSectionProps = {
  articles: UreesFeaturedNewsArticle[];
};

export function UreesNewsSection({ articles }: UreesNewsSectionProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  if (!articles.length) return null;

  const scrollTo = (next: number) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(next, articles.length - 1));
    const card = track.children[clamped] as HTMLElement | undefined;
    if (card) {
      track.scrollTo({ left: card.offsetLeft, behavior: 'smooth' });
      setIndex(clamped);
    }
  };

  return (
    <section className="urees-news-section" id="news">
      <div className="urees-page-width">
        <div className="urees-news-section__header">
          <h2 className="urees-section__title">Urees news</h2>
          <Link href="/urees/blogs/urees-news" className="urees-news-section__view-all-link">
            View all
          </Link>
        </div>

        <div
          ref={trackRef}
          className="urees-news-track"
          onScroll={() => {
            const track = trackRef.current;
            if (!track || !track.children.length) return;
            const scrollLeft = track.scrollLeft;
            let closest = 0;
            let min = Number.POSITIVE_INFINITY;
            Array.from(track.children).forEach((child, i) => {
              const el = child as HTMLElement;
              const dist = Math.abs(el.offsetLeft - scrollLeft);
              if (dist < min) {
                min = dist;
                closest = i;
              }
            });
            setIndex(closest);
          }}
        >
          {articles.map((article) => (
            <article key={article.handle} className="urees-article-card">
              <Link href={`/urees/blogs/urees-news/${article.handle}`} className="urees-article-card__link">
                {article.image && (
                  <div className="urees-article-card__media">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover transition duration-500 hover:scale-[1.03]"
                      sizes="(max-width: 749px) 85vw, (max-width: 989px) 45vw, 33vw"
                    />
                  </div>
                )}
                <div className="urees-article-card__content">
                  <h3 className="urees-article-card__title">{article.title}</h3>
                  <p className="urees-article-card__meta">
                    <span>{formatUreesDate(article.publishedAt)}</span>
                    <span>{article.tag}</span>
                  </p>
                  {article.excerpt && (
                    <p className="urees-article-card__excerpt">{article.excerpt}</p>
                  )}
                </div>
              </Link>
            </article>
          ))}
        </div>

        <div className="urees-news-section__controls">
          <button
            type="button"
            className="urees-news-section__arrow"
            onClick={() => scrollTo(index - 1)}
            disabled={index === 0}
            aria-label="Previous article"
          >
            ←
          </button>
          <span className="urees-news-section__counter">
            {index + 1} / {articles.length}
          </span>
          <button
            type="button"
            className="urees-news-section__arrow"
            onClick={() => scrollTo(index + 1)}
            disabled={index >= articles.length - 1}
            aria-label="Next article"
          >
            →
          </button>
        </div>

        <div className="urees-news-section__footer">
          <Link href="/urees/blogs/urees-news" className="urees-button">
            View all
          </Link>
        </div>
      </div>
    </section>
  );
}
