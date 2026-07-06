import Image from 'next/image';
import { WP } from '@/lib/utils';
import styles from './BioSection.module.css';

const PORTRAIT = `${WP}/2025/07/Giuseppe_Fioretti_2.png`;

export function HomeBio() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <Image
          className={styles.portrait}
          src={PORTRAIT}
          alt="Artistic portrait of Giuseppe Fioretti. Italian visual artist."
          width={1385}
          height={1136}
          priority
        />
        <div className={styles.copy}>
          <p className={styles.strong}>
            They call me{' '}
            <span className={styles.underline}>Giuseppe Fioretti.</span> I was born in Italy, lived
            in Barcelona for over 10 years, and now I&apos;m based in Copenhagen. Currently,
            I&apos;m part of the creative team @LEGO, where I help shape the future of play through
            branding, storytelling, and visual experimentation. Previously, I was Head of Brand
            Design at Desigual, leading the brand&apos;s global visual direction.
          </p>
          <p className={styles.strong}>
            I&apos;m an <span className={styles.underline}>artist</span> in soul and{' '}
            <span className={styles.underline}>Graphic Designer</span> &amp; Art director in
            practice. I love bringing brand identities and campaigns to life—for brands that want to
            break the rules.
          </p>
          <p className={styles.quote}>
            I would like to have lunch with the surrealists and the dadaists
          </p>
        </div>
      </div>
    </section>
  );
}
