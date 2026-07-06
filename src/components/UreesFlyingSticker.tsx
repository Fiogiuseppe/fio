'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { UREES_BRAND } from '@/data/products';
import styles from './UreesFlyingSticker.module.css';

const EDGE_PAD = 14;
const SPEED = 1.65;

export function UreesFlyingSticker() {
  const pathname = usePathname();
  const ref = useRef<HTMLAnchorElement>(null);
  const position = useRef({ x: EDGE_PAD, y: 96 });
  const velocity = useRef({ x: SPEED, y: SPEED * 0.72 });
  const pausedRef = useRef(false);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const isUreesRoute = pathname === '/urees' || pathname.startsWith('/urees/');
  const isJournalRoute = pathname === '/journal' || pathname.startsWith('/journal/');

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => setReducedMotion(motion.matches);
    apply();
    motion.addEventListener('change', apply);
    return () => motion.removeEventListener('change', apply);
  }, []);

  useEffect(() => {
    if (isUreesRoute || isJournalRoute || reducedMotion) return;

    const el = ref.current;
    if (!el) return;

    velocity.current = {
      x: (Math.random() > 0.5 ? 1 : -1) * SPEED,
      y: (Math.random() > 0.5 ? 1 : -1) * SPEED * 0.72,
    };

    let frame = 0;

    const clampPosition = () => {
      const width = el.offsetWidth;
      const height = el.offsetHeight;
      const maxX = Math.max(EDGE_PAD, window.innerWidth - width - EDGE_PAD);
      const maxY = Math.max(EDGE_PAD, window.innerHeight - height - EDGE_PAD);

      position.current = {
        x: Math.min(Math.max(position.current.x, EDGE_PAD), maxX),
        y: Math.min(Math.max(position.current.y, EDGE_PAD), maxY),
      };
    };

    const tick = () => {
      if (!pausedRef.current) {
        const width = el.offsetWidth;
        const height = el.offsetHeight;
        const maxX = Math.max(EDGE_PAD, window.innerWidth - width - EDGE_PAD);
        const maxY = Math.max(EDGE_PAD, window.innerHeight - height - EDGE_PAD);

        let { x, y } = position.current;
        let { x: vx, y: vy } = velocity.current;

        x += vx;
        y += vy;

        if (x <= EDGE_PAD) {
          x = EDGE_PAD;
          vx = Math.abs(vx);
        } else if (x >= maxX) {
          x = maxX;
          vx = -Math.abs(vx);
        }

        if (y <= EDGE_PAD) {
          y = EDGE_PAD;
          vy = Math.abs(vy);
        } else if (y >= maxY) {
          y = maxY;
          vy = -Math.abs(vy);
        }

        position.current = { x, y };
        velocity.current = { x: vx, y: vy };
        el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }

      frame = window.requestAnimationFrame(tick);
    };

    const onResize = () => {
      clampPosition();
      el.style.transform = `translate3d(${position.current.x}px, ${position.current.y}px, 0)`;
    };

    clampPosition();
    el.style.transform = `translate3d(${position.current.x}px, ${position.current.y}px, 0)`;
    frame = window.requestAnimationFrame(tick);
    window.addEventListener('resize', onResize);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('resize', onResize);
    };
  }, [isUreesRoute, isJournalRoute, reducedMotion]);

  if (isUreesRoute || isJournalRoute) return null;

  return (
    <Link
      ref={ref}
      href={UREES_BRAND.href}
      className={cn(styles.flying, reducedMotion && styles.flyingReduced, paused && styles.flyingPaused)}
      aria-label="UREES — enter the brand"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <span className={styles.inner}>{UREES_BRAND.title}</span>
    </Link>
  );
}
