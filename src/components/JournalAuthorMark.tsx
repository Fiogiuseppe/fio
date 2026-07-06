import Image from 'next/image';
import { TypographyLabel, TypographyMeta } from '@/components/typography';
import { JOURNAL_AUTHOR_PORTRAIT } from '@/data/site';
import styles from './JournalAuthorMark.module.css';

const PORTRAIT_SIZE = 400;

export function JournalAuthorMark() {
  return (
    <div className={styles.author}>
      <div className={styles.portrait}>
        <Image
          src={JOURNAL_AUTHOR_PORTRAIT}
          alt="Giuseppe Fioretti"
          width={PORTRAIT_SIZE}
          height={PORTRAIT_SIZE}
          quality={92}
          sizes="(max-width: 767px) 144px, 168px"
          className={styles.portraitImage}
          priority
        />
      </div>
      <TypographyLabel>Author</TypographyLabel>
      <TypographyMeta>Giuseppe Fioretti</TypographyMeta>
    </div>
  );
}
