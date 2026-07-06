'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { animateSpiritualDesignSvg } from '@/lib/spiritual-design-animation';

const SVG_SRC = '/images/spiritual-design-def.svg';

export function SpiritualDesignCover() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const response = await fetch(SVG_SRC);
      const markup = await response.text();
      if (cancelled || !containerRef.current) return;

      containerRef.current.innerHTML = markup;
      const svg = containerRef.current.querySelector('svg');
      if (!svg) return;

      svg.setAttribute('role', 'img');
      svg.setAttribute('aria-label', 'Spiritual Design — When design serves something greater, it becomes sacred.');
      svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
      svg.classList.add('spiritual-cover__svg');
      svg.removeAttribute('width');
      svg.removeAttribute('height');

      animateSpiritualDesignSvg(svg);
      setLoaded(true);
    }

    load().catch(() => setLoaded(true));

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="spiritual-cover" aria-label="Spiritual Design">
      <Link href="/work/spiritual-design" className="spiritual-cover__link">
        <div
          ref={containerRef}
          className={`spiritual-cover__canvas ${loaded ? 'spiritual-cover__canvas--ready' : ''}`}
        />
        <p className="spiritual-cover__caption sr-only">
          Spiritual Design — when design serves something greater, it becomes sacred.
        </p>
      </Link>
    </section>
  );
}
