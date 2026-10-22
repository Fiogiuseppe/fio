import Image from 'next/image';
import styles from './BioSection.module.css';

export function BioSection() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <Image
          className={styles.portrait}
          src="/images/ChatGPT-Image-2-jun-2026-08_13_37.png"
          alt="Artistic portrait of Giuseppe Fioretti with hummingbirds. Italian visual artist, 2025."
          width={1385}
          height={1136}
          priority
        />
        <div className={styles.copy}>
          <p className={styles.strong}>
            They call me{' '}
            <span className={styles.underline}>Giuseppe Fioretti.</span> I was born in Italy, lived
            in Barcelona for over 10 years, and now I&apos;m based in Copenhagen. Currently,
            I&apos;m part of the creative team at LEGO, working on branding, campaigns and art
            direction. Before that, I was Head of Brand Design at Desigual.
          </p>
          <p className={styles.strong}>
            I&apos;m an <span className={styles.underline}>artist</span> in soul and{' '}
            <span className={styles.underline}>Graphic Designer</span> &amp; Art director in
            practice. I work on brand identities and campaigns, alongside my own drawings,
            writing and wearable pieces.
          </p>
          <p className={styles.quote}>
            I would like to have lunch with the surrealists and the dadaists
          </p>
        </div>
      </div>
    </section>
  );
}
