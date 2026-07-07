'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { CACOPHOBIA_HREF } from '@/data/cacophobia';
import {
  CONIDE_HREF,
  conideHotspotIsRound,
  measureBlueSquareHotspot,
  measureConideHotspot,
  type CoverHotspot,
} from '@/lib/conide-cover-link';
import {
  COVER_DRAG_THRESHOLD_PX,
  loadCoverOffset,
  saveCoverOffset,
  screenOffsetToSvgTranslate,
  setupCoverDragLayers,
  storageKeyForDragId,
  type CoverDragId,
  type CoverOffset,
} from '@/lib/spiritual-cover-drag';
import { animateSpiritualDesignSvg } from '@/lib/spiritual-design-animation';

const SVG_SRC = '/images/spiritual-design-def.svg';

type DragState = {
  active: boolean;
  moved: boolean;
  id: CoverDragId | null;
  startX: number;
  startY: number;
  originX: number;
  originY: number;
  pointerId: number;
};

export function SpiritualDesignCover() {
  const frameRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const conideLinkRef = useRef<HTMLAnchorElement>(null);
  const blueSquareLinkRef = useRef<HTMLAnchorElement>(null);
  const dragState = useRef<DragState>({
    active: false,
    moved: false,
    id: null,
    startX: 0,
    startY: 0,
    originX: 0,
    originY: 0,
    pointerId: -1,
  });
  const offsetsRef = useRef<Record<CoverDragId, CoverOffset>>({
    conide: { x: 0, y: 0 },
    'blue-square': { x: 0, y: 0 },
  });
  const dragLayersRef = useRef<Partial<Record<CoverDragId, SVGGElement>>>({});

  const [loaded, setLoaded] = useState(false);
  const [hotspot, setHotspot] = useState<CoverHotspot | null>(null);
  const [blueSquareHotspot, setBlueSquareHotspot] = useState<CoverHotspot | null>(null);
  const [draggingId, setDraggingId] = useState<CoverDragId | null>(null);
  const [suppressConideClick, setSuppressConideClick] = useState(false);
  const [suppressBlueSquareClick, setSuppressBlueSquareClick] = useState(false);

  const updateHotspot = useCallback(() => {
    const frame = frameRef.current;
    const container = containerRef.current;
    const svg = container?.querySelector('svg');
    if (!frame || !container || !svg) return;
    setHotspot(measureConideHotspot(svg, frame));
    setBlueSquareHotspot(measureBlueSquareHotspot(svg, frame));
  }, []);

  const applyOffsetToLayer = useCallback((id: CoverDragId, offset: CoverOffset) => {
    const group = dragLayersRef.current[id];
    const svg = containerRef.current?.querySelector('svg');
    if (!group || !svg) return;
    if (!offset.x && !offset.y) {
      group.removeAttribute('transform');
      return;
    }
    const svgOffset = screenOffsetToSvgTranslate(svg, offset);
    group.setAttribute('transform', `translate(${svgOffset.x} ${svgOffset.y})`);
  }, []);

  const persistOffset = useCallback((id: CoverDragId, offset: CoverOffset) => {
    saveCoverOffset(storageKeyForDragId(id), offset);
  }, []);

  const updateDragOffset = useCallback(
    (id: CoverDragId, offset: CoverOffset) => {
      offsetsRef.current = { ...offsetsRef.current, [id]: offset };
      applyOffsetToLayer(id, offset);
      if (id === 'conide' || id === 'blue-square') updateHotspot();
    },
    [applyOffsetToLayer, updateHotspot]
  );

  const finishDrag = useCallback(
    (pointerId: number) => {
      const state = dragState.current;
      if (!state.active || !state.id || pointerId !== state.pointerId) return;

      if (state.moved) {
        persistOffset(state.id, offsetsRef.current[state.id]);
      }

      dragState.current = {
        active: false,
        moved: false,
        id: null,
        startX: 0,
        startY: 0,
        originX: 0,
        originY: 0,
        pointerId: -1,
      };
      setDraggingId(null);

      if (state.id === 'conide' && state.moved) {
        window.setTimeout(() => setSuppressConideClick(false), 0);
      }
      if (state.id === 'blue-square' && state.moved) {
        window.setTimeout(() => setSuppressBlueSquareClick(false), 0);
      }

      const captureTarget =
        state.id === 'conide'
          ? conideLinkRef.current
          : state.id === 'blue-square'
            ? blueSquareLinkRef.current
            : dragLayersRef.current[state.id];

      if (captureTarget?.hasPointerCapture(pointerId)) {
        captureTarget.releasePointerCapture(pointerId);
      }
    },
    [persistOffset]
  );

  const onDragPointerMove = useCallback(
    (event: PointerEvent) => {
      const state = dragState.current;
      if (!state.active || !state.id || event.pointerId !== state.pointerId) return;

      const dx = event.clientX - state.startX;
      const dy = event.clientY - state.startY;

      if (!state.moved) {
        if (Math.hypot(dx, dy) < COVER_DRAG_THRESHOLD_PX) return;
        state.moved = true;
        if (state.id === 'conide') setSuppressConideClick(true);
        if (state.id === 'blue-square') setSuppressBlueSquareClick(true);
      }

      updateDragOffset(state.id, {
        x: state.originX + dx,
        y: state.originY + dy,
      });
    },
    [updateDragOffset]
  );

  const startDrag = useCallback(
    (id: CoverDragId, event: React.PointerEvent<HTMLElement>) => {
      dragState.current = {
        active: true,
        moved: false,
        id,
        startX: event.clientX,
        startY: event.clientY,
        originX: offsetsRef.current[id].x,
        originY: offsetsRef.current[id].y,
        pointerId: event.pointerId,
      };
      setDraggingId(id);
      event.currentTarget.setPointerCapture(event.pointerId);
      event.preventDefault();
    },
    []
  );

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

      const storedConide = loadCoverOffset(storageKeyForDragId('conide'));
      const storedSquare = loadCoverOffset(storageKeyForDragId('blue-square'));
      offsetsRef.current = { conide: storedConide, 'blue-square': storedSquare };

      dragLayersRef.current = setupCoverDragLayers(svg);
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

  useEffect(() => {
    const onPointerUp = (event: PointerEvent) => finishDrag(event.pointerId);

    window.addEventListener('pointermove', onDragPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);

    return () => {
      window.removeEventListener('pointermove', onDragPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
    };
  }, [finishDrag, onDragPointerMove]);

  const round = hotspot ? conideHotspotIsRound(hotspot) : true;

  return (
    <section className="spiritual-cover surface-paper" aria-label="Home cover">
      <div ref={frameRef} className="spiritual-cover__frame">
        <div
          ref={containerRef}
          className={`spiritual-cover__canvas ${loaded ? 'spiritual-cover__canvas--ready' : ''}${
            draggingId ? ` spiritual-cover__canvas--dragging-${draggingId}` : ''
          }`}
        />
        {hotspot ? (
          <Link
            ref={conideLinkRef}
            href={CONIDE_HREF}
            className={`spiritual-cover__conide-hotspot${round ? ' spiritual-cover__conide-hotspot--round' : ''}${
              draggingId === 'conide' ? ' spiritual-cover__conide-hotspot--dragging' : ''
            }`}
            style={{
              left: hotspot.left,
              top: hotspot.top,
              width: hotspot.width,
              height: hotspot.height,
            }}
            aria-label="The Conide — I have seen a Conide"
            title="The Conide"
            onPointerDown={(event) => startDrag('conide', event)}
            onClick={(event) => {
              if (suppressConideClick) event.preventDefault();
            }}
          />
        ) : null}
        {blueSquareHotspot ? (
          <Link
            ref={blueSquareLinkRef}
            href={CACOPHOBIA_HREF}
            className={`spiritual-cover__blue-square-hotspot${
              draggingId === 'blue-square' ? ' spiritual-cover__blue-square-hotspot--dragging' : ''
            }`}
            style={{
              left: blueSquareHotspot.left,
              top: blueSquareHotspot.top,
              width: blueSquareHotspot.width,
              height: blueSquareHotspot.height,
            }}
            aria-label="Cacophobia — hidden project"
            title="?"
            onPointerDown={(event) => startDrag('blue-square', event)}
            onClick={(event) => {
              if (suppressBlueSquareClick) event.preventDefault();
            }}
          />
        ) : null}
      </div>
    </section>
  );
}
