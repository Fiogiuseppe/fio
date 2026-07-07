'use client';

import { useEffect, useRef } from 'react';
import type { FrameRect, SpiritualTitleLines } from '@/lib/spiritual-cover-title';
import { sanitizeTitleLine, titleFontSizeForRect } from '@/lib/spiritual-cover-title';

function editFontSize(rect: FrameRect, value: string, defaultLength: number) {
  const base = titleFontSizeForRect(rect);
  const length = Math.max(sanitizeTitleLine(value).length, 1);
  return Math.max(16, Math.round(base * Math.min(1, defaultLength / length)));
}

type Props = {
  lineRects: [FrameRect, FrameRect];
  draft: SpiritualTitleLines;
  onDraftChange: (draft: SpiritualTitleLines) => void;
  onCommit: () => void;
  onCancel: () => void;
};

export function SpiritualCoverTitleEditor({
  lineRects,
  draft,
  onDraftChange,
  onCommit,
  onCancel,
}: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLInputElement>(null);
  const line2Ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    line1Ref.current?.focus();
    line1Ref.current?.select();
  }, []);

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        onCommit();
      }
    };

    const timer = window.setTimeout(() => {
      window.addEventListener('pointerdown', onPointerDown);
    }, 0);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('pointerdown', onPointerDown);
    };
  }, [onCommit]);

  const [rect1, rect2] = lineRects;

  return (
    <div ref={rootRef} className="spiritual-cover__title-editor">
      <input
        ref={line1Ref}
        className="spiritual-cover__title-input"
        style={{
          left: rect1.left,
          top: rect1.top,
          width: rect1.width,
          height: rect1.height,
          fontSize: editFontSize(rect1, draft.line1, 9),
        }}
        value={draft.line1}
        maxLength={28}
        aria-label="Cover title line 1"
        onChange={(event) => onDraftChange({ ...draft, line1: event.target.value })}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            event.preventDefault();
            line2Ref.current?.focus();
            line2Ref.current?.select();
          }
          if (event.key === 'Escape') {
            event.preventDefault();
            onCancel();
          }
        }}
      />
      <input
        ref={line2Ref}
        className="spiritual-cover__title-input"
        style={{
          left: rect2.left,
          top: rect2.top,
          width: rect2.width,
          height: rect2.height,
          fontSize: editFontSize(rect2, draft.line2, 6),
        }}
        value={draft.line2}
        maxLength={28}
        aria-label="Cover title line 2"
        onChange={(event) => onDraftChange({ ...draft, line2: event.target.value })}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            event.preventDefault();
            onCommit();
          }
          if (event.key === 'Escape') {
            event.preventDefault();
            onCancel();
          }
        }}
      />
    </div>
  );
}
