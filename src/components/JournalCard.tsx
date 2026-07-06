import Image from 'next/image';
import Link from 'next/link';
import type { Article } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import { Badge } from './Badge';
import styles from './JournalCard.module.css';

type JournalCardProps = {
  article: Article;
  compact?: boolean;
};

export function JournalCard({ article, compact = false }: JournalCardProps) {
  const isSvg = article.coverImage.endsWith('.svg');
  const isGif = article.coverImage.endsWith('.gif');
  const isRemote = article.coverImage.startsWith('http');

  if (compact) {
    return (
      <Link
        href={`/journal/${article.slug}`}
        className={`${styles.compact} group block h-full no-underline`}
      >
        <article className={styles.compactInner}>
          <div className={styles.compactMedia}>
            <Image
              src={article.coverImage}
              alt={article.title}
              fill
              className="object-cover transition duration-500 group-hover:scale-[1.04]"
              sizes="20vw"
              unoptimized={isSvg || isGif || isRemote}
            />
          </div>
          <div className={styles.compactCopy}>
            <p className={styles.compactDate}>{formatDate(article.date)}</p>
            <h3 className={styles.compactTitle}>{article.title}</h3>
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link href={`/journal/${article.slug}`} className="group block no-underline">
      <article>
        <div className="relative aspect-[16/10] overflow-hidden bg-ink/5">
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            className="object-cover transition duration-700 group-hover:scale-[1.03]"
            sizes="(max-width:768px) 100vw, 50vw"
            unoptimized={isSvg || isGif || isRemote}
          />
        </div>
        <div className="mt-5">
          <p className="text-xs uppercase tracking-widest text-ink/50">{formatDate(article.date)}</p>
          <h3 className="mt-2 font-display text-2xl text-ink group-hover:text-blue md:text-3xl">
            {article.title}
          </h3>
          <p className="mt-3 text-ink/60">{article.excerpt}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
        </div>
      </article>
    </Link>
  );
}
