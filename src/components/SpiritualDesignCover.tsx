'use client';

import { useEffect, useRef, useState } from 'react';
import { attachConideHomeLink } from '@/lib/conide-cover-link';
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
      svg.setAttribute('aria-label', 'Home cover artwork');
      svg.setAttribute('preserveAspectRatio', 'xMidYMid slice');
      svg.classList.add('spiritual-cover__svg');
      svg.removeAttribute('width');
      svg.removeAttribute('height');

      animateSpiritualDesignSvg(svg);
      attachConideHomeLink(svg);
      setLoaded(true);
      window.dispatchEvent(new Event('spiritual-cover-ready'));
    }

    load().catch(() => setLoaded(true));

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="spiritual-cover surface-paper" aria-label="Home cover">
      <div className="spiritual-cover__frame">
        <div
          ref={containerRef}
          className={`spiritual-cover__canvas ${loaded ? 'spiritual-cover__canvas--ready' : ''}`}
        />
      </div>
    </section>
  );
}
