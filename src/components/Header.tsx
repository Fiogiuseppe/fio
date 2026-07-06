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

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 768px)');
    const closeOnDesktop = () => {
      if (desktop.matches) setOpen(false);
    };
    desktop.addEventListener('change', closeOnDesktop);
    return () => desktop.removeEventListener('change', closeOnDesktop);
  }, []);

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

        <nav className="site-header__nav" aria-label="Main">
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

        <button
          type="button"
          className="site-header__menu-btn"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="site-mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className={cn('site-header__menu-line', open && 'site-header__menu-line--open-a')} />
          <span className={cn('site-header__menu-line', open && 'site-header__menu-line--open-b')} />
          <span className={cn('site-header__menu-line', open && 'site-header__menu-line--open-c')} />
        </button>
      </div>

      {open && (
        <nav id="site-mobile-nav" className="site-header__mobile" aria-label="Main mobile">
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
        </nav>
      )}
    </header>
  );
}
