import Image from 'next/image';
import Link from 'next/link';
import {
  CACOPHOBIA_BODY,
  CACOPHOBIA_GALLERY,
  CACOPHOBIA_IMAGE,
  CACOPHOBIA_INTRO,
  CACOPHOBIA_WATCH_BUTTON_COUNT,
} from '@/data/cacophobia';
import { TypographyBody, TypographyLead, TypographySection } from '@/components/typography';
import styles from './CacophobiaPageContent.module.css';

export function CacophobiaPageContent() {
  return (
    <article className={styles.article}>
      <header className={styles.header}>
        <TypographySection as="h1" className={styles.title}>
          Cacophobia
        </TypographySection>
        <TypographyLead className={styles.lead}>{CACOPHOBIA_INTRO}</TypographyLead>
      </header>

      <div className={styles.hero}>
        <Image
          src={CACOPHOBIA_IMAGE}
          alt="Cacophobia by Giuseppe Fioretti"
          width={2560}
          height={2560}
          className={styles.heroImage}
          priority
        />
      </div>

      <div className={styles.body}>
        {CACOPHOBIA_BODY.map((paragraph) => (
          <TypographyBody key={paragraph.slice(0, 48)}>{paragraph}</TypographyBody>
        ))}
      </div>

      <div className={styles.gallery}>
        {CACOPHOBIA_GALLERY.map((src) => (
          <figure key={src} className={styles.figure}>
            <Image
              src={src}
              alt="Cacophobia by Giuseppe Fioretti"
              width={964}
              height={1444}
              className={styles.galleryImage}
            />
          </figure>
        ))}
      </div>

      <div className={styles.watchButtons}>
        {Array.from({ length: CACOPHOBIA_WATCH_BUTTON_COUNT }, (_, index) => (
          <Link key={index} href="/" className={styles.watchButton}>
            Thank you for watching
          </Link>
        ))}
      </div>

      <p className={styles.back}>
        <Link href="/" className={styles.backLink}>
          ← Back to the cover
        </Link>
      </p>
    </article>
  );
}
