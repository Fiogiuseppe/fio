'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import type { UreesProduct } from '@/lib/urees-types';
import {
  formatUreesPrice,
  ureesCheckoutUrl,
  ureesProductCta,
} from '@/data/urees';

type UreesProductDetailProps = {
  product: UreesProduct;
};

export function UreesProductDetail({ product }: UreesProductDetailProps) {
  const defaultVariant =
    product.variants.find((variant) => variant.available) ?? product.variants[0];
  const [selectedVariantId, setSelectedVariantId] = useState(defaultVariant?.id);
  const [activeImage, setActiveImage] = useState(0);

  const selectedVariant = useMemo(
    () => product.variants.find((variant) => variant.id === selectedVariantId) ?? defaultVariant,
    [defaultVariant, product.variants, selectedVariantId]
  );

  const cta = ureesProductCta(product);
  const checkoutUrl = selectedVariant
    ? ureesCheckoutUrl(product, selectedVariant.id)
    : ureesCheckoutUrl(product);

  return (
    <div className="urees-page-width urees-product">
      <div>
        <div className="urees-product__gallery">
          <div className="urees-product__gallery-main">
            {product.images[activeImage] && (
              <Image
                src={product.images[activeImage].src}
                alt={product.images[activeImage].alt}
                fill
                priority
                sizes="(max-width: 990px) 100vw, 50vw"
                className="object-cover"
              />
            )}
          </div>
          {product.images.length > 1 && (
            <div className="urees-product__thumbs">
              {product.images.map((image, index) => (
                <button
                  key={image.src}
                  type="button"
                  className={`urees-product__thumb ${
                    index === activeImage ? 'urees-product__thumb--active' : ''
                  }`}
                  onClick={() => setActiveImage(index)}
                  aria-label={`View image ${index + 1}`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={200}
                    height={200}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div>
        <p className="urees-card__vendor">{product.vendor}</p>
        <h1 className="urees-product__title">{product.title}</h1>
        <p className="urees-product__price">
          {formatUreesPrice(selectedVariant?.price ?? product.variants[0]?.price ?? '0')}
        </p>

        {product.variants.length > 1 && (
          <label>
            <span className="sr-only">Select variant</span>
            <select
              className="urees-variant-select"
              value={selectedVariantId}
              onChange={(event) => setSelectedVariantId(Number(event.target.value))}
            >
              {product.variants.map((variant) => (
                <option key={variant.id} value={variant.id} disabled={!variant.available}>
                  {variant.title}
                  {!variant.available ? ' — Sold out' : ''}
                </option>
              ))}
            </select>
          </label>
        )}

        {cta === 'sold-out' || !selectedVariant?.available ? (
          <button type="button" className="urees-button" disabled>
            Sold out
          </button>
        ) : (
          <a href={checkoutUrl} className="urees-button">
            {cta === 'choose-options' ? 'Choose options' : 'Add to cart'}
          </a>
        )}

        {product.descriptionHtml && (
          <div
            className="urees-product__description"
            dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
          />
        )}
      </div>
    </div>
  );
}
