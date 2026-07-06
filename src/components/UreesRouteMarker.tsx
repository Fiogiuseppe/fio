'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export function UreesRouteMarker() {
  const pathname = usePathname();
  const isUrees = pathname === '/urees' || pathname.startsWith('/urees/');

  useEffect(() => {
    document.documentElement.classList.toggle('urees-route', isUrees);
    return () => {
      document.documentElement.classList.remove('urees-route');
    };
  }, [isUrees]);

  return null;
}
