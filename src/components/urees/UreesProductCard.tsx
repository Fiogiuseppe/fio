import Image from 'next/image';
import Link from 'next/link';
import type { UreesProduct } from '@/lib/urees-types';
import { formatUreesPrice, ureesProductCta } from '@/data/urees';

type UreesProductCardProps = {
  product: UreesProduct;
};

function ctaLabel(product: UreesProduct) {
  const cta = ureesProductCta(product);
  if (cta === 'sold-out') return 'Sold out';
  if (cta === 'choose-options') return 'Choose options';
  return 'Add to cart';
}

export function UreesProductCard({ product }: UreesProductCardProps) {
  const image = product.images[0];
  const price = product.variants[0]?.price ?? '0';

  return (
    <Link href={`/urees/products/${product.handle}`} className="urees-card">
      <div className="urees-card__media">
        {image && (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 750px) 50vw, 25vw"
            className="object-cover"
          />
        )}
      </div>
      <div>
        <h3 className="urees-card__title">{product.title}</h3>
        <p className="urees-card__vendor">{product.vendor}</p>
        <p className="urees-card__price">{formatUreesPrice(price)}</p>
        <span className="urees-card__badge">{ctaLabel(product)}</span>
      </div>
    </Link>
  );
}
