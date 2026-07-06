import Image from 'next/image';
import { WP } from '@/lib/utils';
import { TypographyBody, TypographyQuote } from '@/components/typography';
import { editorial } from '@/lib/typography';
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
          <TypographyBody className={styles.paragraph}>
            They call me{' '}
            <span className={styles.underline}>Giuseppe Fioretti.</span> I was born in Italy, lived
            in Barcelona for over 10 years, and now I&apos;m based in Copenhagen. Currently,
            I&apos;m part of the creative team @LEGO, where I help shape the future of play through
            branding, storytelling, and visual experimentation. Previously, I was Head of Brand
            Design at Desigual, leading the brand&apos;s global visual direction.
          </TypographyBody>
          <TypographyBody className={styles.paragraph}>
            I&apos;m an <span className={styles.underline}>artist</span> in soul and{' '}
            <span className={styles.underline}>Graphic Designer</span> &amp; Art director in
            practice. I love bringing brand identities and campaigns to life—for brands that want to
            break the rules.
          </TypographyBody>
          <TypographyQuote as="p" className={styles.paragraph}>
            I would like to have lunch with the surrealists and the dadaists
          </TypographyQuote>
        </div>
      </div>
    </section>
  );
}
