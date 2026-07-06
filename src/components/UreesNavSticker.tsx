'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { UREES_BRAND } from '@/data/products';
import styles from './UreesNavSticker.module.css';

type UreesNavStickerProps = {
  active?: boolean;
  mobile?: boolean;
  className?: string;
  onNavigate?: () => void;
};

export function UreesNavSticker({
  active = false,
  mobile = false,
  className,
  onNavigate,
}: UreesNavStickerProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const motionQuery = useRef<MediaQueryList | null>(null);

  useEffect(() => {
    motionQuery.current = window.matchMedia('(prefers-reduced-motion: reduce)');
    const el = ref.current;
    if (!el || motionQuery.current.matches) return;

    const onMove = (event: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const driftX = (event.clientX - centerX) * 0.06;
      const driftY = (event.clientY - centerY) * 0.06;
      el.style.setProperty('--urees-drift-x', `${driftX}px`);
      el.style.setProperty('--urees-drift-y', `${driftY}px`);
    };

    const onScroll = () => {
      const rotate = Math.sin(window.scrollY * 0.008) * 4;
      el.style.setProperty('--urees-scroll-rotate', `${rotate}deg`);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <Link
      ref={ref}
      href={UREES_BRAND.href}
      className={cn(
        styles.sticker,
        active && styles.stickerActive,
        mobile && styles.stickerMobile,
        className
      )}
      aria-label="UREES — enter the brand"
      onClick={onNavigate}
    >
      <span className={styles.inner}>{UREES_BRAND.title}</span>
    </Link>
  );
}
