'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  CONIDE_HREF,
  conideHotspotIsRound,
  measureConideHotspot,
  type ConideHotspot,
} from '@/lib/conide-cover-link';
import { animateSpiritualDesignSvg } from '@/lib/spiritual-design-animation';

const SVG_SRC = '/images/spiritual-design-def.svg';

export function SpiritualDesignCover() {
  const frameRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [hotspot, setHotspot] = useState<ConideHotspot | null>(null);

  const updateHotspot = useCallback(() => {
    const frame = frameRef.current;
    const container = containerRef.current;
    const svg = container?.querySelector('svg');
    if (!frame || !container || !svg) return;
    setHotspot(measureConideHotspot(svg, frame));
  }, []);

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
      setLoaded(true);
      window.dispatchEvent(new Event('spiritual-cover-ready'));

      requestAnimationFrame(() => {
        if (!cancelled) updateHotspot();
      });
    }

    load().catch(() => setLoaded(true));

    return () => {
      cancelled = true;
    };
  }, [updateHotspot]);

  useEffect(() => {
    if (!loaded) return;

    const onResize = () => updateHotspot();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [loaded, updateHotspot]);

  const round = hotspot ? conideHotspotIsRound(hotspot) : true;

  return (
    <section className="spiritual-cover surface-paper" aria-label="Home cover">
      <div ref={frameRef} className="spiritual-cover__frame">
        <div
          ref={containerRef}
          className={`spiritual-cover__canvas ${loaded ? 'spiritual-cover__canvas--ready' : ''}`}
        />
        {hotspot ? (
          <Link
            href={CONIDE_HREF}
            className={`spiritual-cover__conide-hotspot${round ? ' spiritual-cover__conide-hotspot--round' : ''}`}
            style={{
              left: hotspot.left,
              top: hotspot.top,
              width: hotspot.width,
              height: hotspot.height,
            }}
            aria-label="The Conide — I have seen a Conide"
            title="The Conide"
          />
        ) : null}
      </div>
    </section>
  );
}
