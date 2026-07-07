'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { NAV, SITE } from '@/data/site';
import { cn } from '@/lib/utils';
import {
  SPIRITUAL_COVER_READY_EVENT,
  computeHomeNavPlacement,
} from '@/lib/home-header-placement';

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [homeNavCompact, setHomeNavCompact] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const isHome = pathname === '/';
  const isContact = pathname === '/contact';
  const isShop = pathname === '/shop' || pathname.startsWith('/shop/');

  const updateHomeNavPlacement = useCallback(() => {
    if (!isHome || !navRef.current) return;

    const svg = document.querySelector<SVGSVGElement>('.spiritual-cover__svg');
    const { useCompactNav } = computeHomeNavPlacement(navRef.current, svg);

    setHomeNavCompact(useCompactNav);
    document.documentElement.classList.toggle('home-nav-compact', useCompactNav);
  }, [isHome]);

  useEffect(() => {
    document.documentElement.classList.toggle('home-route', isHome);
    return () => {
      document.documentElement.classList.remove('home-route');
      document.documentElement.classList.remove('home-nav-compact');
    };
  }, [isHome]);

  useEffect(() => {
    document.documentElement.classList.toggle('contact-route', isContact);
    return () => {
      document.documentElement.classList.remove('contact-route');
    };
  }, [isContact]);

  useEffect(() => {
    document.documentElement.classList.toggle('shop-route', isShop);
    return () => {
      document.documentElement.classList.remove('shop-route');
    };
  }, [isShop]);

  useEffect(() => {
    if (!isHome) {
      document.documentElement.classList.remove('home-nav-compact');
      setHomeNavCompact(false);
      return;
    }

    updateHomeNavPlacement();

    const onLayout = () => updateHomeNavPlacement();
    window.addEventListener('resize', onLayout);
    window.addEventListener(SPIRITUAL_COVER_READY_EVENT, onLayout);

    const cover = document.querySelector('.spiritual-cover__canvas');
    const observer = cover ? new ResizeObserver(onLayout) : null;
    if (cover && observer) observer.observe(cover);

    return () => {
      window.removeEventListener('resize', onLayout);
      window.removeEventListener(SPIRITUAL_COVER_READY_EVENT, onLayout);
      observer?.disconnect();
      document.documentElement.classList.remove('home-nav-compact');
    };
  }, [isHome, updateHomeNavPlacement]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 4);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
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
        isHome ? 'site-header--overlay' : 'site-header--solid sticky top-0',
        isHome && homeNavCompact && 'site-header--home-compact',
        scrolled && 'site-header--scrolled'
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
            width={320}
            height={93}
            priority
            className="site-header__logo"
          />
        </Link>

        <nav ref={navRef} className="site-header__nav" aria-label="Main">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'site-header__nav-link',
                pathname === item.href || pathname.startsWith(`${item.href}/`)
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
                    pathname === item.href || pathname.startsWith(`${item.href}/`)
                      ? 'site-header__nav-link--active'
                      : undefined
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
