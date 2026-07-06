'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const FIO_FAVICON = '/icons/favicon-32x32.png';
const UREES_FAVICON = '/icons/urees-favicon.png';

function setFavicon(href: string) {
  const links = document.querySelectorAll<HTMLLinkElement>("link[rel*='icon']");
  if (links.length === 0) {
    const link = document.createElement('link');
    link.rel = 'icon';
    link.href = href;
    document.head.appendChild(link);
    return;
  }

  links.forEach((link) => {
    link.href = href;
  });
}

export function DynamicFavicon() {
  const pathname = usePathname();

  useEffect(() => {
    const isUrees = pathname === '/urees' || pathname.startsWith('/urees/');
    setFavicon(isUrees ? UREES_FAVICON : FIO_FAVICON);
  }, [pathname]);

  return null;
}
