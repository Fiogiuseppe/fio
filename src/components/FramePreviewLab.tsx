'use client';

import Image from 'next/image';
import { useState } from 'react';
import { FramedArtworkPreview } from '@/components/FramedArtworkPreview';
import { WOOD_FRAME_PRINTED_SLUG } from '@/data/frame-mockup';
import styles from './FramePreviewLab.module.css';

const SAMPLE = {
  slug: WOOD_FRAME_PRINTED_SLUG,
  label: 'Visceral Poem 12 (printed)',
  src: 'https://fiogiuseppe.com/wp-content/uploads/2023/03/VISCERAL-POETRY-12-scaled.jpg',
};

export function FramePreviewLab() {
  const [withFrame, setWithFrame] = useState(true);

  return (
    <div className={styles.root}>
      <div className={styles.controls}>
        <p className={styles.fieldNote}>
          Prova su <strong>un solo printed</strong>: {SAMPLE.label}. Handpainted e altri printed
          restano col mockup precedente finché non approvi questo.
        </p>

        <div className={styles.toggleRow}>
          <button
            type="button"
            className={`${styles.toggle} ${!withFrame ? styles.toggleActive : ''}`}
            onClick={() => setWithFrame(false)}
          >
            Senza cornice
          </button>
          <button
            type="button"
            className={`${styles.toggle} ${withFrame ? styles.toggleActive : ''}`}
            onClick={() => setWithFrame(true)}
          >
            Con cornice legno
          </button>
        </div>
      </div>

      <div className={styles.previewShell}>
        <p className={styles.previewCaption}>
          {withFrame
            ? 'Mockup base — cornice legno chiaro su parete, A3, no passepartout'
            : 'Poster nudo — A3'}
        </p>
        <div className={`${styles.preview} ${withFrame ? styles.previewWood : ''}`}>
          {withFrame ? (
            <FramedArtworkPreview
              src={SAMPLE.src}
              alt={SAMPLE.label}
              priority
              variant="wood-wall"
            />
          ) : (
            <Image
              src={SAMPLE.src}
              alt={SAMPLE.label}
              fill
              className={styles.artwork}
              sizes="(max-width:1024px) 100vw, 560px"
              priority
            />
          )}
        </div>
      </div>

      <p className={styles.note}>
        Pagina prova: <code>/shop/frame-preview</code> · Prodotto:{' '}
        <code>/shop/{SAMPLE.slug}</code>
      </p>
    </div>
  );
}
