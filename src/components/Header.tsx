'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { NAV, SITE } from '@/data/site';
import { cn } from '@/lib/utils';

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header sticky top-0 z-50 w-full border-b border-ink/10 bg-cream/95 backdrop-blur-md">
      <div className="site-header__inner relative mx-auto flex w-full max-w-[100%] items-center justify-center px-6 py-4 md:gap-12 md:px-10 md:py-5">
        <button
          type="button"
          className="absolute right-6 top-1/2 flex -translate-y-1/2 flex-col gap-1.5 md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={cn('block h-0.5 w-6 bg-ink transition', open && 'translate-y-2 rotate-45')} />
          <span className={cn('block h-0.5 w-6 bg-ink transition', open && 'opacity-0')} />
          <span className={cn('block h-0.5 w-6 bg-ink transition', open && '-translate-y-2 -rotate-45')} />
        </button>

        <Link
          href="/"
          className="shrink-0 no-underline"
          aria-label={SITE.name}
          onClick={() => setOpen(false)}
        >
          <Image
            src="/images/logo.svg"
            alt={SITE.name}
            width={288}
            height={84}
            priority
            className="site-header__logo h-auto w-[min(148px,38vw)] md:w-[168px]"
          />
        </Link>

        <nav className="site-header__nav hidden items-center justify-center gap-5 lg:gap-8 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'whitespace-nowrap text-base uppercase tracking-[0.14em] no-underline transition-colors hover:text-blue lg:text-[1.0625rem]',
                pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
                  ? 'text-blue'
                  : 'text-ink/75'
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {open && (
        <nav className="border-t border-ink/10 px-6 py-6 md:hidden">
          <ul className="flex flex-col items-center gap-4">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'text-lg uppercase tracking-[0.12em] no-underline hover:text-blue',
                    pathname === item.href ? 'text-blue' : 'text-ink'
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
