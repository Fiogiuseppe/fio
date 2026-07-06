import Link from 'next/link';
import type { Article } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import { TypographyBody, TypographyCard, TypographyMeta } from '@/components/typography';
import { editorial } from '@/lib/typography';
import { Badge } from './Badge';
import styles from './JournalCard.module.css';

type JournalCardProps = {
  article: Article;
  compact?: boolean;
};

export function JournalCard({ article, compact = false }: JournalCardProps) {
  if (compact) {
    return (
      <Link
        href={`/journal/${article.slug}`}
        className={`${styles.compact} group block no-underline`}
      >
        <article className={styles.compactInner}>
          <TypographyMeta>{formatDate(article.date)}</TypographyMeta>
          <TypographyCard className="text-on-light group-hover:text-blue">{article.title}</TypographyCard>
          {article.excerpt ? (
            <TypographyBody measure={false} className={styles.excerpt}>
              {article.excerpt}
            </TypographyBody>
          ) : null}
        </article>
      </Link>
    );
  }

  return (
    <Link href={`/journal/${article.slug}`} className="group block no-underline">
      <article>
        <div className={editorial.stack.block}>
          <TypographyMeta>{formatDate(article.date)}</TypographyMeta>
          <TypographyCard className={`${editorial.stack.labelToTitle} text-ink group-hover:text-blue`}>
            {article.title}
          </TypographyCard>
          <TypographyMeta as="p" className={editorial.stack.labelToTitle}>
            {article.excerpt}
          </TypographyMeta>
          <div className={`flex flex-wrap gap-2 ${editorial.stack.labelToTitle}`}>
            {article.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
        </div>
      </article>
    </Link>
  );
}
