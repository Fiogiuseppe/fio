'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import styles from './AboutPortrait.module.css';

const CLOSED_PORTRAIT = '/images/about-portrait-closed.png';
const OPEN_PORTRAIT = '/images/about-portrait-open.png';

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

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
          scheduleBlink(randomBetween(14000, 32000));
        }, randomBetween(1400, 2400));
      }, delayMs);
    }

    initialTimeoutRef.current = setTimeout(() => {
      scheduleBlink(randomBetween(3500, 6500));
    }, 2000);

    return () => {
      if (initialTimeoutRef.current) clearTimeout(initialTimeoutRef.current);
      if (blinkTimeoutRef.current) clearTimeout(blinkTimeoutRef.current);
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  return (
    <figure
      className={`${styles.figure} ${awake ? styles.awake : ''}`}
      aria-label="Giuseppe Fioretti"
    >
      <div className={styles.frame}>
        <Image
          src={CLOSED_PORTRAIT}
          alt="Giuseppe Fioretti"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className={styles.closed}
        />

        <div className={styles.openEyes} aria-hidden="true">
          <Image
            src={OPEN_PORTRAIT}
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className={styles.open}
          />
        </div>
      </div>
    </figure>
  );
}
