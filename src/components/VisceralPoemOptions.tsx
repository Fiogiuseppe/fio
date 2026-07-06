'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import type { Product } from '@/lib/types';
import {
  VISCERAL_POEMS_PRICING,
  visceralPoemPrice,
  type VisceralPoemFormat,
} from '@/data/visceral-poems-pricing';
import { formatPrice } from '@/lib/utils';
import styles from './VisceralPoemOptions.module.css';

type VisceralPoemOptionsProps = {
  product: Product;
};

export function VisceralPoemOptions({ product }: VisceralPoemOptionsProps) {
  const [format, setFormat] = useState<VisceralPoemFormat>('handmade');
  const [withFrame, setWithFrame] = useState(false);

  const price = visceralPoemPrice(format, withFrame);
  const image = withFrame && product.framedImage ? product.framedImage : product.images[0];
  const isGif = image?.endsWith('.gif');

  const formatLabel = useMemo(
    () => VISCERAL_POEMS_PRICING[format].label,
    [format],
  );

  return (
    <div className={styles.root}>
      <div className={styles.preview}>
        <Image
          key={image}
          src={image}
          alt={product.title}
          fill
          className="object-cover"
          sizes="(max-width:1024px) 100vw, 50vw"
          unoptimized={isGif}
          priority
        />
      </div>

      <div className={styles.options}>
        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>Format</legend>
          <div className={styles.choiceRow}>
            {(Object.keys(VISCERAL_POEMS_PRICING) as VisceralPoemFormat[]).map((key) => (
              <button
                key={key}
                type="button"
                className={`${styles.choice} ${format === key ? styles.choiceActive : ''}`}
                onClick={() => setFormat(key)}
              >
                {VISCERAL_POEMS_PRICING[key].label}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>Frame</legend>
          <div className={styles.choiceRow}>
            <button
              type="button"
              className={`${styles.choice} ${!withFrame ? styles.choiceActive : ''}`}
              onClick={() => setWithFrame(false)}
            >
              Without frame — {formatPrice(VISCERAL_POEMS_PRICING[format].withoutFrame)}
            </button>
            <button
              type="button"
              className={`${styles.choice} ${withFrame ? styles.choiceActive : ''}`}
              onClick={() => setWithFrame(true)}
            >
              With frame — {formatPrice(VISCERAL_POEMS_PRICING[format].withFrame)}
            </button>
          </div>
        </fieldset>

        <p className={styles.price}>
          <span className={styles.priceLabel}>Selected</span>
          <span>
            {formatLabel}
            {withFrame ? ' · with frame' : ' · without frame'} — {formatPrice(price)}
          </span>
        </p>

        {withFrame ? (
          <p className={styles.frameNote}>
            Frame preview uses a placeholder mockup. Final framed piece will use the real frame.
          </p>
        ) : null}
      </div>
    </div>
  );
}
