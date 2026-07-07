import Link from 'next/link';
import {
  CAREER_TIMELINE_ACADEMIC,
  CAREER_TIMELINE_AWARDS,
  CAREER_TIMELINE_FREELANCE,
  CAREER_TIMELINE_INHOUSE,
  CAREER_TIMELINE_INTRO,
  CAREER_TIMELINE_PERSONAL,
} from '@/data/career-timeline';
import {
  TypographyBody,
  TypographyLabel,
  TypographyMeta,
  TypographySection,
} from '@/components/typography';
import { editorial } from '@/lib/typography';
import styles from './CareerTimelineContent.module.css';

function TimelineList({
  items,
  showOrg = false,
}: {
  items: typeof CAREER_TIMELINE_INHOUSE;
  showOrg?: boolean;
}) {
  return (
    <div className={styles.list}>
      {items.map((item) => (
        <article key={`${item.org ?? ''}-${item.period}-${item.title}`}>
          {showOrg && item.org ? (
            <TypographySection as="h3" className={styles.itemOrg}>
              {item.org}
            </TypographySection>
          ) : null}
          <TypographyMeta as="p" className={styles.itemMeta}>
            {item.period}
          </TypographyMeta>
          <TypographyBody measure={false} className={styles.itemTitle}>
            {item.title}
          </TypographyBody>
          {item.description ? (
            <TypographyBody className={styles.itemBody}>{item.description}</TypographyBody>
          ) : null}
        </article>
      ))}
    </div>
  );
}

export function CareerTimelineContent() {
  return (
    <div className={styles.page}>
      <Link href="/about" className={styles.back}>
        ← About
      </Link>

      <TypographySection as="h1" className={styles.greeting}>
        {CAREER_TIMELINE_INTRO.greeting}
      </TypographySection>

      <div className={`space-y-6 ${editorial.stack.leadToContent}`}>
        {CAREER_TIMELINE_INTRO.paragraphs.map((paragraph) => (
          <TypographyBody key={paragraph}>{paragraph}</TypographyBody>
        ))}
      </div>

      <section className={styles.section} aria-labelledby="career-timeline-heading">
        <TypographySection as="h2" id="career-timeline-heading" className={styles.sectionTitle}>
          Carrer Timeline
        </TypographySection>

        <TypographyLabel as="p" className={styles.sectionTitle}>
          Inhouse companies
        </TypographyLabel>
        <TimelineList items={CAREER_TIMELINE_INHOUSE} showOrg />
      </section>

      <section className={styles.section} aria-labelledby="career-freelance-heading">
        <TypographyLabel as="h2" id="career-freelance-heading" className={styles.sectionTitle}>
          Freelance
        </TypographyLabel>
        <TimelineList items={CAREER_TIMELINE_FREELANCE} />
      </section>

      <section className={styles.section} aria-labelledby="career-awards-heading">
        <TypographySection as="h2" id="career-awards-heading" className={styles.sectionTitle}>
          Awards
        </TypographySection>
        <div className={styles.list}>
          {CAREER_TIMELINE_AWARDS.map((award) => (
            <article key={`${award.year}-${award.headline}`}>
              <TypographyMeta as="p" className={styles.awardYear}>
                {award.year}
              </TypographyMeta>
              <TypographyBody measure={false} className={styles.awardHeadline}>
                {award.headline}
              </TypographyBody>
              {award.description ? (
                <TypographyBody className={styles.awardBody}>{award.description}</TypographyBody>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section} aria-labelledby="career-personal-heading">
        <TypographySection as="h2" id="career-personal-heading" className={styles.sectionTitle}>
          Personal projects
        </TypographySection>
        <div className={styles.list}>
          {CAREER_TIMELINE_PERSONAL.map((project) => (
            <article key={project.title}>
              <TypographyBody measure={false} className={styles.personalTitle}>
                {project.title}
              </TypographyBody>
              <TypographyBody className={styles.personalBody}>{project.description}</TypographyBody>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section} aria-labelledby="career-academic-heading">
        <TypographySection as="h2" id="career-academic-heading" className={styles.sectionTitle}>
          Academic background
        </TypographySection>
        <div className={styles.list}>
          {CAREER_TIMELINE_ACADEMIC.map((entry) => (
            <article key={entry.period}>
              <TypographyMeta as="p" className={styles.academicPeriod}>
                {entry.period}
              </TypographyMeta>
              <TypographyBody className={styles.academicBody}>{entry.description}</TypographyBody>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
