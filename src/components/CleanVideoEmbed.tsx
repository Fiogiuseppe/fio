'use client';

import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { youtubeEmbedUrl } from '@/lib/youtube';
import styles from './CleanVideoEmbed.module.css';

type CleanVideoEmbedProps = {
  youtubeId: string;
  title: string;
  poster?: string;
  /** Ambient: autoplay muted loop, cropped — no YouTube chrome. Cinema: poster + play. */
  mode?: 'ambient' | 'cinema';
  className?: string;
};

export function CleanVideoEmbed({
  youtubeId,
  title,
  poster,
  mode = 'ambient',
  className,
}: CleanVideoEmbedProps) {
  const [playing, setPlaying] = useState(mode === 'ambient');

  if (!playing && poster) {
    return (
      <button
        type="button"
        className={cn(styles.frame, styles.frame_cinema, className)}
        onClick={() => setPlaying(true)}
        aria-label={`Play video: ${title}`}
      >
        <Image src={poster} alt="" fill className={styles.posterImage} sizes="100vw" />
        <span className={styles.play} aria-hidden>
          <span className={styles.playIcon}>▶</span>
        </span>
        <span className={styles.srOnly}>Play {title}</span>
      </button>
    );
  }

  const src =
    mode === 'ambient'
      ? youtubeEmbedUrl(youtubeId, { autoplay: true, mute: true, loop: true, controls: false })
      : youtubeEmbedUrl(youtubeId, { autoplay: true, mute: false, loop: false, controls: true });

  return (
    <div
      className={cn(styles.frame, mode === 'cinema' && styles.frame_cinema, className)}
      aria-label={title}
    >
      <iframe
        className={styles.iframe}
        src={src}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen={mode === 'cinema'}
      />
    </div>
  );
}
