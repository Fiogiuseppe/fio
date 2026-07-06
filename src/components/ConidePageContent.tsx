import Image from 'next/image';
import {
  CONIDE_BODY,
  CONIDE_EXAMPLES,
  CONIDE_HERO,
  CONIDE_IMAGES,
  CONIDE_INTRO,
} from '@/data/conide';
import { TypographyBody, TypographyLead, TypographySection } from '@/components/typography';
import { editorial } from '@/lib/typography';
import styles from './ConidePageContent.module.css';

export function ConidePageContent() {
  return (
    <article className={styles.article}>
      <header className={styles.header}>
        <p className={styles.kicker}>Giuseppe Fioretti · 2017</p>
        <TypographySection as="h1" className={styles.title}>
          The Conide
        </TypographySection>
        <TypographyLead className={styles.lead}>
          &ldquo;Conide. The xoxo of art&rdquo; — &ldquo;I have seen a Conide&rdquo;
        </TypographyLead>
      </header>

      <div className={styles.hero}>
        <Image
          src={CONIDE_HERO}
          alt="The Conide by Giuseppe Fioretti"
          width={1200}
          height={900}
          className={styles.heroImage}
          priority
        />
      </div>

      <TypographyLead className={styles.intro}>{CONIDE_INTRO}</TypographyLead>

      <div className={`${styles.body} ${editorial.stack.block}`}>
        {CONIDE_BODY.map((paragraph) => (
          <TypographyBody key={paragraph.slice(0, 48)}>{paragraph}</TypographyBody>
        ))}
      </div>

      <section className={styles.examples} aria-label="Examples of Conide">
        {CONIDE_EXAMPLES.map((example) => (
          <figure key={example.image} className={styles.figure}>
            <Image
              src={example.image}
              alt={example.alt}
              width={1200}
              height={800}
              className={styles.exampleImage}
            />
            <figcaption className={styles.caption}>{example.caption}</figcaption>
          </figure>
        ))}
      </section>

      <figure className={styles.figure}>
        <Image
          src={CONIDE_IMAGES.illustration}
          alt="I HAVE SEEN A CONIDE (Ho visto un Conide) — Illustration Claudia Sahuquillo"
          width={900}
          height={900}
          className={styles.exampleImage}
        />
        <figcaption className={styles.caption}>
          I HAVE SEEN A CONIDE (Ho visto un Conide) — Illustration Claudia Sahuquillo
        </figcaption>
      </figure>

      <blockquote className={styles.quote}>
        &ldquo;The tricks (conide) of today are the truths (Artist) of tomorrow&rdquo; — original
        phrase by @toiletpapermagazineofficial
      </blockquote>
    </article>
  );
}
