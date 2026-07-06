import Image from 'next/image';
import Link from 'next/link';
import { CACOPHOBIA_BODY, CACOPHOBIA_IMAGE, CACOPHOBIA_INTRO } from '@/data/cacophobia';
import { TypographyBody, TypographyLead, TypographySection } from '@/components/typography';
import styles from './CacophobiaPageContent.module.css';

export function CacophobiaPageContent() {
  return (
    <article className={styles.article}>
      <header className={styles.header}>
        <p className={styles.kicker}>Hidden project · Giuseppe Fioretti</p>
        <TypographySection as="h1" className={styles.title}>
          Cacophobia
        </TypographySection>
        <TypographyLead className={styles.lead}>{CACOPHOBIA_INTRO}</TypographyLead>
      </header>

      <div className={styles.hero}>
        <Image
          src={CACOPHOBIA_IMAGE}
          alt="Cacophobia by Giuseppe Fioretti"
          width={1200}
          height={1500}
          className={styles.heroImage}
          priority
        />
      </div>

      <div className={styles.body}>
        {CACOPHOBIA_BODY.map((paragraph) => (
          <TypographyBody key={paragraph.slice(0, 48)}>{paragraph}</TypographyBody>
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
