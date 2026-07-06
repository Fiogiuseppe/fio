import Image from 'next/image';
import { BIO } from '@/data/site';
import styles from './BioSection.module.css';

export function BioSection() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.portraitWrap}>
          <Image
            className={styles.portrait}
            src="/images/Giuseppe_Fioretti.png"
            alt="Portrait of Giuseppe Fioretti, Copenhagen 2025."
            width={928}
            height={1232}
          />
        </div>
        <div className={styles.copy}>
          <p>{BIO.intro}</p>
          <p>{BIO.practice}</p>
          <p className={styles.quote}>{BIO.quote}</p>
        </div>
      </div>
    </section>
  );
}
