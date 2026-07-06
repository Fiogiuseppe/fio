import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Badge } from '@/components/Badge';
import {
  TypographyBody,
  TypographyH2,
  TypographyLead,
  TypographyMeta,
} from '@/components/typography';
import { editorial } from '@/lib/typography';
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
        <TypographyMeta>{formatDate(article.date)}</TypographyMeta>
        <TypographyH2 as="h1" className={editorial.stack.labelToTitle}>
          {article.title}
        </TypographyH2>
        {article.excerpt ? (
          <TypographyLead className={editorial.stack.titleToLead}>{article.excerpt}</TypographyLead>
        ) : null}

        <div className={`flex flex-wrap gap-2 ${editorial.stack.sectionToContent}`}>
          {article.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>

        {article.contentHtml ? (
          <div
            className={`journal-article__body ${editorial.stack.block}`}
            dangerouslySetInnerHTML={{ __html: article.contentHtml }}
          />
        ) : (
          <div className={`${editorial.stack.block} space-y-6`}>
            {paragraphs.map((p) => (
              <TypographyBody key={p.slice(0, 40)}>{p}</TypographyBody>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
