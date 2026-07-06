'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { NAV, SITE } from '@/data/site';
import { cn } from '@/lib/utils';

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isHome = pathname === '/';

  useEffect(() => {
    document.documentElement.classList.toggle('home-route', isHome);
    return () => document.documentElement.classList.remove('home-route');
  }, [isHome]);

  return (
    <header
      className={cn(
        'site-header z-50 w-full',
        isHome ? 'site-header--overlay' : 'site-header--solid sticky top-0'
      )}
    >
      <div className="site-header__inner">
        <Link
          href="/"
          className="site-header__logo-link"
          aria-label={SITE.name}
          onClick={() => setOpen(false)}
        >
          <Image
            src="/images/logo.svg"
            alt={SITE.name}
            width={288}
            height={84}
            priority
            className="site-header__logo"
          />
        </Link>

        <nav className="site-header__nav hidden md:flex" aria-label="Main">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'site-header__nav-link',
                pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
                  ? 'site-header__nav-link--active'
                  : undefined
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="site-header__meta hidden md:flex" aria-hidden="true">
          <span className="site-header__location">{SITE.headerLocation}</span>
          <span className="site-header__year">{SITE.headerYear}</span>
        </div>

        <button
          type="button"
          className="site-header__menu-btn md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={cn('site-header__menu-line', open && 'site-header__menu-line--open-a')} />
          <span className={cn('site-header__menu-line', open && 'site-header__menu-line--open-b')} />
          <span className={cn('site-header__menu-line', open && 'site-header__menu-line--open-c')} />
        </button>
      </div>

      {open && (
        <nav className="site-header__mobile md:hidden" aria-label="Main mobile">
          <ul className="site-header__mobile-list">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'site-header__mobile-link',
                    pathname === item.href ? 'site-header__nav-link--active' : undefined
                  )}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="site-header__mobile-meta">
            {SITE.headerLocation} · {SITE.headerYear}
          </p>
        </nav>
      )}
    </header>
  );
}
