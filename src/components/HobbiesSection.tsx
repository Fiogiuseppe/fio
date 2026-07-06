import Image from 'next/image';
import Link from 'next/link';
import { HOBBY_IMAGES, OTHER_WORKS, WP } from '@/data/site';
import styles from './HobbiesSection.module.css';

function WorkLink({
  href,
  external,
  children,
}: {
  href: string;
  external?: boolean;
  children: React.ReactNode;
}) {
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={styles.cell}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={styles.cell}>
      {children}
    </Link>
  );
}

export function WorksGrid() {
  return (
    <section className={styles.section} aria-labelledby="other-works">
      <div className={styles.row}>
        <h2 className={styles.sectionTitle} id="other-works">
          Other Works
        </h2>
        <div className={styles.grid}>
          {OTHER_WORKS.map((work) => (
            <WorkLink key={work.image} href={work.href} external={work.external}>
              <Image
                className={styles.image}
                src={work.image}
                alt={work.alt}
                width={800}
                height={800}
                unoptimized={work.image.endsWith('.gif')}
              />
            </WorkLink>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HobbiesSection() {
  return (
    <section className={styles.section} aria-labelledby="hobbies-title">
      <div className={styles.row}>
        <h2 className={styles.sectionTitle} id="hobbies-title">
          My Hobbies
        </h2>
        <p className={styles.bodyCopy}>
          Draw, make art , create with people and shoot with my reflex.
        </p>

        <div className={styles.hobbiesGrid}>
          {HOBBY_IMAGES.map((item) => (
            <Link key={item.image} href={item.href} className={styles.cell}>
              <Image
                className={styles.image}
                src={item.image}
                alt={item.alt}
                width={800}
                height={800}
              />
            </Link>
          ))}
        </div>

        <div className={styles.artBlock}>
          <h3 className={styles.artTitle}>
            <Link href="/art-by-giuseppe-fioretti">art</Link>
          </h3>
          <p className={styles.bodyCopy}>
            This project is about the importance of the spectator in the art world.
          </p>
          <p className={styles.bodyCopy}>
            &ldquo;The art deserves fair importance, and should not be undervalued. Politicians,
            waiters, dancers, salespeople, secretaries, children… All of them are influenced by art
            in some way in their life. Recognizing the &ldquo;conide&rdquo; is a way to consider our
            ignorance and take art for what it is, a great dinner with friends where there is no one
            who knows how to eat better than the other.&rdquo;
          </p>
          <a
            className={styles.conideLink}
            href="https://www.adg-fad.org/es/laus/proyecto/rebranding-para-desigual"
            target="_blank"
            rel="noopener noreferrer"
          >
            &gt; &ldquo;I have seen a Conide&rdquo; – 2017
          </a>
        </div>
      </div>
    </section>
  );
}

export function WorkshopSection() {
  return (
    <section className={styles.section} aria-labelledby="workshop-title">
      <div className={styles.row}>
        <h2 className={styles.sectionTitle} id="workshop-title">
          Workshop
        </h2>
        <h3 className={styles.projectTitle}>
          <Link href="/expanding-drawing">Expanding drawing</Link>
        </h3>
        <p className={styles.bodyCopy}>The experience of drawing with space.</p>
        <Link href="/the_conide" className={styles.workshopImage}>
          <Image
            src={`${WP}/2021/05/FIO_1626-scaled.jpg`}
            alt="The Conide"
            width={1200}
            height={800}
            className={styles.image}
          />
        </Link>
      </div>
    </section>
  );
}
