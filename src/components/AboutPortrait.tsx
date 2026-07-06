'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import styles from './AboutPortrait.module.css';

const CLOSED_PORTRAIT = '/images/about-portrait-closed.png';
const OPEN_PORTRAIT = '/images/about-portrait-open.png';

const FIRST_BLINK_MS = 3000;
const BLINK_INTERVAL_MS = 6000;
const EYES_OPEN_MS = 1500;

export function AboutPortrait() {
  const [awake, setAwake] = useState(false);
  const blinkTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const initialTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (media.matches) return undefined;

    function scheduleBlink(delayMs: number) {
      blinkTimeoutRef.current = setTimeout(() => {
        setAwake(true);
        closeTimeoutRef.current = setTimeout(() => {
          setAwake(false);
          scheduleBlink(BLINK_INTERVAL_MS);
        }, EYES_OPEN_MS);
      }, delayMs);
    }

    initialTimeoutRef.current = setTimeout(() => {
      scheduleBlink(FIRST_BLINK_MS);
    }, 0);

    return () => {
      if (initialTimeoutRef.current) clearTimeout(initialTimeoutRef.current);
      if (blinkTimeoutRef.current) clearTimeout(blinkTimeoutRef.current);
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  return (
    <figure className={styles.figure} aria-label="Giuseppe Fioretti">
      <div className={styles.frame}>
        <Image
          src={CLOSED_PORTRAIT}
          alt="Giuseppe Fioretti"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className={styles.portrait}
        />

        <Image
          src={OPEN_PORTRAIT}
          alt=""
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className={styles.portraitOpen}
          style={{ opacity: awake ? 1 : 0 }}
          aria-hidden
          unoptimized
        />
      </div>
    </figure>
  );
}
