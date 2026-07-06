import Image from 'next/image';
import Link from 'next/link';
import { SITE } from '@/data/site';
import styles from './SiteHeader.module.css';

export function SiteHeader({ staticHeader = false }: { staticHeader?: boolean }) {
  return (
    <header className={`${styles.header} ${staticHeader ? styles.headerStatic : ''}`}>
      <div className={styles.inner}>
        <Link
          className={styles.contact}
          href={`mailto:${SITE.contactEmail}?subject=hey%20fiogiuseppe`}
        >
          CONTACT
        </Link>
        <Link className={styles.logoLink} href="/" aria-label={SITE.name}>
          <Image
            className={styles.logo}
            src="/images/logo.svg"
            alt={SITE.name}
            width={200}
            height={44}
            priority
          />
        </Link>
        <span className={styles.spacer} aria-hidden="true" />
      </div>
    </header>
  );
}
