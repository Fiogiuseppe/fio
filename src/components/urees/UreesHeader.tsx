import Image from 'next/image';
import Link from 'next/link';
import { UREES_LOGO, ureesNav } from '@/data/urees/content';

export function UreesHeader() {
  return (
    <header className="urees-header">
      <div className="urees-page-width urees-header__inner">
        <Link href="/urees" className="urees-header__logo" aria-label="Urees home">
          <Image src={UREES_LOGO} alt="Urees" width={180} height={48} priority />
        </Link>
        <nav className="urees-nav" aria-label="Urees">
          {ureesNav.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
