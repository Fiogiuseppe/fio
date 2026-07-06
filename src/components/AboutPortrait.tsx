'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import styles from './AboutPortrait.module.css';

const CLOSED_PORTRAIT = '/images/about-portrait-closed.png';

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

export function AboutPortrait() {
  const [awake, setAwake] = useState(false);
  const blinkTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (media.matches) return undefined;

    function scheduleBlink() {
      blinkTimeoutRef.current = setTimeout(() => {
        setAwake(true);
        closeTimeoutRef.current = setTimeout(() => {
          setAwake(false);
          scheduleBlink();
        }, randomBetween(1600, 3000));
      }, randomBetween(12000, 30000));
    }

    const initialDelay = setTimeout(scheduleBlink, 6000);

    return () => {
      clearTimeout(initialDelay);
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
          className={styles.portrait}
        />

        <div className={styles.eyeReveal} aria-hidden="true">
          <span className={`${styles.eye} ${styles.eyeLeft}`} />
          <span className={`${styles.eye} ${styles.eyeRight}`} />
          <span className={`${styles.eyelid} ${styles.eyelidLeft}`} />
          <span className={`${styles.eyelid} ${styles.eyelidRight}`} />
        </div>
      </div>
    </figure>
  );
}
