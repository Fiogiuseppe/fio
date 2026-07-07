'use client';

import Image from 'next/image';
import { useState } from 'react';
import { FramedArtworkPreview } from '@/components/FramedArtworkPreview';
import styles from './FramePreviewLab.module.css';

const SAMPLES = [
  {
    id: 'visceral-poem-12',
    label: 'Visceral Poem 12 (printed)',
    src: 'https://fiogiuseppe.com/wp-content/uploads/2023/03/VISCERAL-POETRY-12-scaled.jpg',
  },
  {
    id: 'pain-is-inevitable',
    label: 'Pain is inevitable… (handpainted)',
    src: '/shop/visceral-poems/pain-is-inevitable-suffering-is-optional-1-DTH5pp7iOWJ-1.jpg',
  },
  {
    id: 'amo-esta-cancion',
    label: 'Amo esta canción (handpainted)',
    src: '/shop/visceral-poems/amo-esta-cancion-Csa38HVKACd.jpg',
  },
] as const;

export function FramePreviewLab() {
  const [sampleId, setSampleId] = useState<(typeof SAMPLES)[number]['id']>(SAMPLES[0].id);
  const [withFrame, setWithFrame] = useState(true);

  const sample = SAMPLES.find((entry) => entry.id === sampleId) ?? SAMPLES[0];

  return (
    <div className={styles.root}>
      <div className={styles.controls}>
        <label className={styles.field}>
          <span className={styles.label}>Poster di prova</span>
          <select
            className={styles.select}
            value={sampleId}
            onChange={(event) => setSampleId(event.target.value as typeof sampleId)}
          >
            {SAMPLES.map((entry) => (
              <option key={entry.id} value={entry.id}>
                {entry.label}
              </option>
            ))}
          </select>
        </label>

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
            Con cornice
          </button>
        </div>
      </div>

      <div className={styles.previewShell}>
        <p className={styles.previewCaption}>
          {withFrame ? 'Mockup attuale — A3, cornice bianca, no passepartout' : 'Poster nudo — A3'}
        </p>
        <div className={styles.preview}>
          {withFrame ? (
            <FramedArtworkPreview src={sample.src} alt={sample.label} priority />
          ) : (
            <Image
              src={sample.src}
              alt={sample.label}
              fill
              className={styles.artwork}
              sizes="(max-width:1024px) 100vw, 560px"
              priority
            />
          )}
        </div>
      </div>

      <p className={styles.note}>
        URL di questa pagina: <code>/shop/frame-preview</code> — condividila per feedback prima del
        rollout su tutte le voci.
      </p>
    </div>
  );
}
