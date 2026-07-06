import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Badge } from '@/components/Badge';
import { PageSection } from '@/components/PageSection';
import {
  TypographyBody,
  TypographySection,
  TypographyLead,
  TypographyMeta,
} from '@/components/typography';
import { editorial } from '@/lib/typography';
import { getArticle } from '@/data/articles';
import { formatDate, stripLeadingCoverFigure } from '@/lib/utils';

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

  const paragraphs = article.content?.split('\n\n').filter(Boolean) ?? [];
  const contentHtml = article.contentHtml
    ? stripLeadingCoverFigure(article.contentHtml, article.coverImage)
    : null;

  return (
    <PageSection>
      <article className="mx-auto max-w-2xl">
        <TypographyMeta>{formatDate(article.date)}</TypographyMeta>
        <TypographySection as="h1" className={editorial.stack.labelToTitle}>
          {article.title}
        </TypographySection>
        {article.excerpt ? (
          <TypographyLead className={editorial.stack.titleToLead}>{article.excerpt}</TypographyLead>
        ) : null}

        <div className={`flex flex-wrap gap-2 ${editorial.stack.sectionToContent}`}>
          {article.special ? <Badge>Special</Badge> : null}
          {article.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>

        {contentHtml ? (
          <div
            className={`journal-article__body ${editorial.stack.block}`}
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        ) : (
          <div className={`${editorial.stack.block} space-y-6`}>
            {paragraphs.map((p) => (
              <TypographyBody key={p.slice(0, 40)}>{p}</TypographyBody>
            ))}
          </div>
        )}
      </article>
    </PageSection>
  );
}
