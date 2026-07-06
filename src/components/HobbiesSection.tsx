import Image from 'next/image';
import Link from 'next/link';
import { HOBBIES } from '@/data/site';
import styles from './HobbiesSection.module.css';

export function HobbiesSection() {
  return (
    <section className={styles.section} aria-labelledby="hobbies-title">
      <div className={styles.inner}>
        <div>
          <h2 className={styles.title} id="hobbies-title">
            {HOBBIES.title}
          </h2>
          <p className={styles.text}>{HOBBIES.text}</p>
        </div>
        <div>
          <h3 className={styles.artTitle}>
            <Link href="/art-by-giuseppe-fioretti">{HOBBIES.artTitle}</Link>
          </h3>
          <p className={styles.artIntro}>{HOBBIES.artIntro}</p>
          <p className={styles.artBody}>{HOBBIES.artBody}</p>
          <a className={styles.conideLink} href={HOBBIES.conideLink.href} target="_blank" rel="noopener noreferrer">
            {HOBBIES.conideLink.label}
          </a>
          <Link href={HOBBIES.conideHref}>
            <Image
              className={styles.conideImage}
              src={HOBBIES.conideImage}
              alt="The Conide project"
              width={1200}
              height={800}
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
