import Link from 'next/link';
import { UREES_SHOP_URL } from '@/data/urees/content';

export function UreesFooter() {
  return (
    <footer className="urees-footer">
      <div className="urees-page-width urees-footer__inner">
        <small>Urees® Barcelona — Handmade clothes created with upcycling</small>
        <small>
          <Link href="/">Giuseppe Fioretti</Link> ·{' '}
          <a href={UREES_SHOP_URL} target="_blank" rel="noopener noreferrer">
            urees.shop
          </a>
        </small>
      </div>
    </footer>
  );
}
