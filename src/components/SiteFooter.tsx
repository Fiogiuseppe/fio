import Link from 'next/link';
import { FOOTER_LINKS, SITE } from '@/data/site';
import styles from './SiteFooter.module.css';

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <nav aria-label="Footer">
        <ul className={styles.nav}>
          {FOOTER_LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <p className={styles.meta}>
        Last Update 2021 - Copyright © Giuseppe Fioretti,{' '}
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
      </p>
      <div className={styles.bottom}>
        <a
          className={styles.instagram}
          href={SITE.instagram}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
        >
          ◎
        </a>
      </div>
    </footer>
  );
}
