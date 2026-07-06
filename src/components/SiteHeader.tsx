import Image from 'next/image';
import Link from 'next/link';
import { SITE } from '@/data/site';
import styles from './SiteHeader.module.css';

export function SiteHeader() {
  return (
    <header className={styles.header}>
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
            width={220}
            height={48}
            priority
          />
        </Link>
        <span className={styles.location}>{SITE.location}</span>
      </div>
    </header>
  );
}
