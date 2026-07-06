import Image from 'next/image';
import Link from 'next/link';
import type { Article } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import { TypographyBody, TypographyCard, TypographyMeta } from '@/components/typography';
import { CONIDE_IMAGES } from '@/data/conide';
import styles from './JournalSpecialFlyer.module.css';

type JournalSpecialFlyerProps = {
  article: Article;
};

export function JournalSpecialFlyer({ article }: JournalSpecialFlyerProps) {
  const cover = article.slug === 'i-have-seen-a-conide' ? CONIDE_IMAGES.illustration : article.coverImage;

  return (
    <div className={styles.stage}>
      <Link
        href={`/journal/${article.slug}`}
        className={styles.flyer}
        aria-label={`Special edition: ${article.title}`}
      >
        <article className={styles.popup}>
          <div className={styles.chrome} aria-hidden>
            <span className={styles.dot} />
            <span className={styles.dot} />
            <span className={styles.dot} />
            <span className={styles.chromeTitle}>Special edition</span>
          </div>

          <div className={styles.media}>
            <Image
              src={cover}
              alt={article.title}
              fill
              sizes="(max-width: 900px) 88vw, 22rem"
              quality={92}
              className={styles.image}
              priority
            />
          </div>

          <div className={styles.body}>
            <p className={styles.kicker}>The Conide · {formatDate(article.date)}</p>
            <TypographyCard className={styles.title}>{article.title}</TypographyCard>
            {article.excerpt ? (
              <TypographyBody measure={false} className={styles.excerpt}>
                {article.excerpt}
              </TypographyBody>
            ) : null}
            <TypographyMeta className={styles.tail}>Open the pop-up →</TypographyMeta>
          </div>
        </article>
      </Link>
    </div>
  );
}
