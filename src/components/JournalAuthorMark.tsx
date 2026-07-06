import Image from 'next/image';
import { TypographyLabel, TypographyMeta } from '@/components/typography';
import { MEDIUM_AUTHOR_PORTRAIT } from '@/data/site';
import styles from './JournalAuthorMark.module.css';

export function JournalAuthorMark() {
  return (
    <div className={styles.author}>
      <div className={styles.portrait}>
        <Image
          src={MEDIUM_AUTHOR_PORTRAIT}
          alt="Giuseppe Fioretti"
          fill
          sizes="104px"
          className={styles.portraitImage}
        />
      </div>
      <TypographyLabel>Author</TypographyLabel>
      <TypographyMeta>Giuseppe Fioretti</TypographyMeta>
    </div>
  );
}
