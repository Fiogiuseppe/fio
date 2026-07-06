'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { UREES_CART_URL, UREES_LOGO, ureesMainNav } from '@/data/urees/content';
import { cn } from '@/lib/utils';

export function UreesHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="urees-header">
      <div className="urees-page-width urees-header__inner">
        <button
          type="button"
          className="urees-header__menu-btn"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <span className={cn('urees-header__menu-line', open && 'urees-header__menu-line--open-a')} />
          <span className={cn('urees-header__menu-line', open && 'urees-header__menu-line--open-b')} />
          <span className={cn('urees-header__menu-line', open && 'urees-header__menu-line--open-c')} />
        </button>

        <Link href="/urees" className="urees-header__logo" aria-label="Urees home">
          <Image src={UREES_LOGO} alt="Urees" width={180} height={48} priority />
        </Link>

        <nav className="urees-nav urees-nav--desktop" aria-label="Urees">
          {ureesMainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(pathname === item.href && 'urees-nav__link--active')}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <a href={UREES_CART_URL} className="urees-header__cart" aria-label="View cart">
          Cart
        </a>
      </div>

      {open && (
        <nav className="urees-nav urees-nav--mobile" aria-label="Urees mobile">
          {ureesMainNav.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
          <a href={UREES_CART_URL}>Cart</a>
        </nav>
      )}
    </header>
  );
}
