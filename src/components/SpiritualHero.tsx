import Image from 'next/image';
import Link from 'next/link';
import styles from './SpiritualHero.module.css';

export function SpiritualHero() {
  return (
    <section className={styles.hero} aria-label="Spiritual Design">
      <Link className={styles.link} href="/spiritual-design">
        <Image
          className={styles.artwork}
          src="/images/spiritual-design-def.svg"
          alt="Spiritual design — When design serves something greater, it becomes sacred."
          width={1920}
          height={1080}
          priority
          sizes="100vw"
        />
      </Link>
    </section>
  );
}
