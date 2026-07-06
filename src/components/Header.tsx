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
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-cream/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-5 md:px-10 md:py-6">
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
            className="h-auto w-[min(260px,52vw)] md:w-[min(300px,28vw)]"
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'text-sm uppercase tracking-widest no-underline transition-colors hover:text-blue',
                pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
                  ? 'text-blue'
                  : 'text-ink/70'
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="flex flex-col gap-1.5 md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={cn('block h-0.5 w-6 bg-ink transition', open && 'translate-y-2 rotate-45')} />
          <span className={cn('block h-0.5 w-6 bg-ink transition', open && 'opacity-0')} />
          <span className={cn('block h-0.5 w-6 bg-ink transition', open && '-translate-y-2 -rotate-45')} />
        </button>
      </div>

      {open && (
        <nav className="border-t border-ink/10 px-6 py-6 md:hidden">
          <ul className="flex flex-col gap-4">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'text-lg no-underline hover:text-blue',
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
