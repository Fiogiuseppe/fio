import Link from 'next/link';
import { FIO_PORTAL, ureesFooterNav, ureesPolicyNav } from '@/data/urees/content';

export function UreesFooter() {
  return (
    <footer className="urees-footer">
      <div className="urees-page-width">
        <div className="urees-footer__grid">
          {ureesFooterNav.map((item) =>
            'external' in item && item.external ? (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ) : (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            )
          )}
        </div>

        <div className="urees-footer__bottom">
          <Link href="/urees" className="urees-footer__brand">
            Urees Store
          </Link>
          <div className="urees-footer__policies">
            {ureesPolicyNav.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="urees-footer__portal">
          <span>UREES is a creative universe by </span>
          <Link href={FIO_PORTAL.href}>{FIO_PORTAL.label}</Link>
        </div>
      </div>
    </footer>
  );
}
