'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import type { Product } from '@/lib/types';
import { getProductShopGroups } from '@/data/shop-catalog';
import {
  VISCERAL_POEMS_PRICING,
  visceralPoemLongStory,
  visceralPoemPrice,
  type VisceralPoemFormat,
} from '@/data/visceral-poems-pricing';
import { formatPrice } from '@/lib/utils';
import { TypographyBody } from '@/components/typography';
import { ShopCheckoutButton } from '@/components/ShopCheckoutButton';
import { FramedArtworkPreview } from '@/components/FramedArtworkPreview';
import { usesWoodFrameMockup } from '@/data/frame-mockup';
import styles from './VisceralPoemOptions.module.css';

type VisceralPoemOptionsProps = {
  product: Product;
};

export function VisceralPoemOptions({ product }: VisceralPoemOptionsProps) {
  const groups = getProductShopGroups(product);
  const defaultFormat: VisceralPoemFormat = groups.includes('handmade') ? 'handmade' : 'digital';
  const [format, setFormat] = useState<VisceralPoemFormat>(defaultFormat);
  const [withFrame, setWithFrame] = useState(false);

  const price = visceralPoemPrice(format, withFrame);
  const artwork = product.images[0];
  const isGif = artwork?.endsWith('.gif');

  const formatLabel = useMemo(
    () => VISCERAL_POEMS_PRICING[format].label,
    [format],
  );
  const woodFrameMockup = usesWoodFrameMockup(product.slug, format);

  return (
    <div className={styles.root}>
      <div
        className={`${styles.preview} ${woodFrameMockup && withFrame ? styles.previewWoodFrame : ''}`}
      >
        {withFrame ? (
          <FramedArtworkPreview
            src={artwork}
            alt={product.title}
            unoptimized={isGif}
            priority
            variant={woodFrameMockup ? 'wood-wall' : 'white'}
          />
        ) : (
          <Image
            key={artwork}
            src={artwork}
            alt={product.title}
            fill
            className={styles.artwork}
            sizes="(max-width:1024px) 100vw, 50vw"
            unoptimized={isGif}
            priority
          />
        )}
      </div>

      <div className={styles.options}>
        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>Format</legend>
          <div className={styles.choiceRow}>
            {(Object.keys(VISCERAL_POEMS_PRICING) as VisceralPoemFormat[])
              .filter((key) => groups.includes(key))
              .map((key) => (
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
            {woodFrameMockup
              ? 'Frame preview — cornice legno chiaro su parete, A3 senza passepartout.'
              : 'Frame preview — A3 white frame, no passepartout. The poster fills the frame edge to edge.'}
          </p>
        ) : null}

        <ShopCheckoutButton
          slug={product.slug}
          format={format}
          withFrame={withFrame}
          label="Buy now"
          className={styles.checkout}
        />

        <TypographyBody measure={false} className={styles.story}>
          {visceralPoemLongStory(format)}
        </TypographyBody>
      </div>
    </div>
  );
}
