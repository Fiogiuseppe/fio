'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { Article } from '@/lib/types';
import { cn, formatDate } from '@/lib/utils';
import { TypographyBody, TypographyCard, TypographyMeta } from '@/components/typography';
import { CONIDE_IMAGES } from '@/data/conide';
import styles from './JournalSpecialFlyer.module.css';

const STORAGE_KEY = 'fio-journal-conide-flyer-pos';
const EDGE_PAD = 12;
const JOURNAL_CONTENT_MAX_PX = 640;

type JournalSpecialFlyerProps = {
  article: Article;
};

type Position = {
  x: number;
  y: number;
};

type DragState = {
  active: boolean;
  startX: number;
  startY: number;
  originX: number;
  originY: number;
};

function getDefaultFlyerPosition(el: HTMLElement, clamp: (x: number, y: number) => Position): Position {
  const width = el.offsetWidth;
  const height = el.offsetHeight;
  const contentWidth = Math.min(JOURNAL_CONTENT_MAX_PX, window.innerWidth - EDGE_PAD * 2);
  const columnLeft = (window.innerWidth - contentWidth) / 2;
  const columnRight = columnLeft + contentWidth;
  const rightGutter = window.innerWidth - columnRight - EDGE_PAD;
  const leftGutter = columnLeft - EDGE_PAD;

  let x = window.innerWidth - width - EDGE_PAD;
  if (rightGutter >= width) {
    x = columnRight + EDGE_PAD;
  } else if (leftGutter >= width) {
    x = EDGE_PAD;
  }

  const list = document.querySelector('[data-journal-list]');
  let y = Math.max(EDGE_PAD, window.innerHeight * 0.28);
  if (list) {
    const rect = list.getBoundingClientRect();
    y = Math.max(EDGE_PAD, rect.top);
  }

  if (rightGutter < width && leftGutter < width) {
    y = Math.max(EDGE_PAD, window.innerHeight - height - EDGE_PAD - 20);
  }

  return clamp(x, y);
}

function overlapsJournalColumn(x: number, width: number): boolean {
  const contentWidth = Math.min(JOURNAL_CONTENT_MAX_PX, window.innerWidth - EDGE_PAD * 2);
  const columnLeft = (window.innerWidth - contentWidth) / 2 - EDGE_PAD;
  const columnRight = columnLeft + contentWidth + EDGE_PAD * 2;
  const flyerRight = x + width;

  return x < columnRight && flyerRight > columnLeft;
}

export function JournalSpecialFlyer({ article }: JournalSpecialFlyerProps) {
  const cover = article.slug === 'i-have-seen-a-conide' ? CONIDE_IMAGES.illustration : article.coverImage;
  const floaterRef = useRef<HTMLDivElement>(null);
  const dragState = useRef<DragState>({
    active: false,
    startX: 0,
    startY: 0,
    originX: 0,
    originY: 0,
  });
  const [position, setPosition] = useState<Position | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const clampPosition = useCallback((x: number, y: number): Position => {
    const el = floaterRef.current;
    if (!el) return { x, y };

    const width = el.offsetWidth;
    const height = el.offsetHeight;
    const maxX = Math.max(EDGE_PAD, window.innerWidth - width - EDGE_PAD);
    const maxY = Math.max(EDGE_PAD, window.innerHeight - height - EDGE_PAD);

    return {
      x: Math.min(Math.max(x, EDGE_PAD), maxX),
      y: Math.min(Math.max(y, EDGE_PAD), maxY),
    };
  }, []);

  const persistPosition = useCallback((next: Position) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Ignore storage failures (private mode, quota, etc.).
    }
  }, []);

  useEffect(() => {
    const el = floaterRef.current;
    if (!el) return;

    let next: Position | null = null;

    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Position;
        next = clampPosition(parsed.x, parsed.y);
        if (overlapsJournalColumn(next.x, el.offsetWidth)) {
          next = getDefaultFlyerPosition(el, clampPosition);
        }
      }
    } catch {
      next = null;
    }

    if (!next) {
      next = getDefaultFlyerPosition(el, clampPosition);
    }

    setPosition(next);
    setIsReady(true);
  }, [clampPosition]);

  useEffect(() => {
    if (!position) return;

    const onResize = () => {
      setPosition((current) => (current ? clampPosition(current.x, current.y) : current));
    };

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [clampPosition, position]);

  const onChromePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!position) return;

    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    dragState.current = {
      active: true,
      startX: event.clientX,
      startY: event.clientY,
      originX: position.x,
      originY: position.y,
    };
    setIsDragging(true);
  };

  const onChromePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragState.current.active) return;

    const dx = event.clientX - dragState.current.startX;
    const dy = event.clientY - dragState.current.startY;
    const next = clampPosition(dragState.current.originX + dx, dragState.current.originY + dy);
    setPosition(next);
  };

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragState.current.active) return;

    dragState.current.active = false;
    setIsDragging(false);

    if (position) persistPosition(position);

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <div
      ref={floaterRef}
      className={cn(styles.floater, isDragging && styles.floaterDragging, isReady && styles.floaterReady)}
      style={position ? { left: position.x, top: position.y } : undefined}
    >
      <article className={styles.popup}>
        <div
          className={styles.chrome}
          role="button"
          tabIndex={0}
          aria-label="Drag the special edition window"
          onPointerDown={onChromePointerDown}
          onPointerMove={onChromePointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          <span className={styles.dot} aria-hidden />
          <span className={styles.dot} aria-hidden />
          <span className={styles.dot} aria-hidden />
          <span className={styles.chromeTitle}>Special edition</span>
          <span className={styles.grip} aria-hidden>
            ⋮⋮
          </span>
        </div>

        <Link
          href={`/journal/${article.slug}`}
          className={styles.flyer}
          aria-label={`Special edition: ${article.title}`}
        >
          <div className={styles.media}>
            <Image
              src={cover}
              alt={article.title}
              fill
              sizes="(max-width: 900px) 88vw, 22rem"
              quality={92}
              className={styles.image}
              priority
            />
          </div>

          <div className={styles.body}>
            <p className={styles.kicker}>The Conide · {formatDate(article.date)}</p>
            <TypographyCard className={styles.title}>{article.title}</TypographyCard>
            {article.excerpt ? (
              <TypographyBody measure={false} className={styles.excerpt}>
                {article.excerpt}
              </TypographyBody>
            ) : null}
            <TypographyMeta className={styles.tail}>Open the pop-up →</TypographyMeta>
          </div>
        </Link>
      </article>
    </div>
  );
}
