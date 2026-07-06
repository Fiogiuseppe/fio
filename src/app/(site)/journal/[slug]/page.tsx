import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Badge } from '@/components/Badge';
import { getArticle } from '@/data/articles';
import { formatDate } from '@/lib/utils';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const { articles } = await import('@/data/articles');
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: `${article.title} — Journal`,
    description: article.excerpt,
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const isSvg = article.coverImage.endsWith('.svg');
  const isGif = article.coverImage.endsWith('.gif');
  const isRemoteCover = article.coverImage.startsWith('http');
  const paragraphs = article.content?.split('\n\n').filter(Boolean) ?? [];

  return (
    <article>
      <div className="relative aspect-[21/9] w-full overflow-hidden bg-ink/5">
        <Image
          src={article.coverImage}
          alt={article.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
          unoptimized={isSvg || isGif || isRemoteCover}
        />
      </div>

      <div className="mx-auto max-w-2xl px-6 py-16 md:px-10 md:py-24">
        <p className="text-xs uppercase tracking-widest text-ink/50">{formatDate(article.date)}</p>
        <h1 className="mt-4 font-display text-4xl md:text-5xl">{article.title}</h1>
        {article.excerpt ? (
          <p className="mt-6 text-xl text-ink/60">{article.excerpt}</p>
        ) : null}

        <div className="mt-6 flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>

        {article.contentHtml ? (
          <div
            className="journal-article__body mt-12"
            dangerouslySetInnerHTML={{ __html: article.contentHtml }}
          />
        ) : (
          <div className="mt-12 space-y-6 text-lg leading-relaxed text-ink/80">
            {paragraphs.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
