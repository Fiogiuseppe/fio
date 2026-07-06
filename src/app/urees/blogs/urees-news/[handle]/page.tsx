import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { UreesRichContent } from '@/components/urees/UreesRichContent';
import { formatUreesDate, getUreesArticle, ureesSite } from '@/data/urees';

type Props = { params: Promise<{ handle: string }> };

export async function generateStaticParams() {
  return ureesSite.articles.map((article) => ({ handle: article.handle }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  const article = getUreesArticle(handle);
  if (!article) return {};
  return { title: `${article.title} — Urees Store` };
}

export default async function UreesBlogArticlePage({ params }: Props) {
  const { handle } = await params;
  const article = getUreesArticle(handle);
  if (!article) notFound();

  return (
    <article className="urees-section">
      <div className="urees-page-width urees-content-page">
        <p className="urees-article-meta">
          {formatUreesDate(article.publishedAt)} · Urees Reuse
        </p>
        <h1 className="urees-page-title">{article.title}</h1>
        {article.image && (
          <div className="urees-article-hero">
            <Image
              src={article.image}
              alt={article.title}
              width={1200}
              height={800}
              className="h-auto w-full object-cover"
            />
          </div>
        )}
        <UreesRichContent html={article.bodyHtml} />
      </div>
    </article>
  );
}
