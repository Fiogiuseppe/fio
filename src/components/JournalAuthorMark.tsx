import Image from 'next/image';
import { TypographyLabel, TypographyMeta } from '@/components/typography';
import { WP } from '@/lib/utils';
import styles from './JournalAuthorMark.module.css';

const PORTRAIT = `${WP}/2025/07/Giuseppe_Fioretti_2.png`;

export function JournalAuthorMark() {
  return (
    <div className={styles.author}>
      <div className={styles.portrait}>
        <Image
          src={PORTRAIT}
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
