import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { availabilityLabel, formatPrice, productCtaLabel } from '@/lib/utils';
import { Badge } from './Badge';

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const isGif = product.images[0]?.endsWith('.gif');

  return (
    <Link href={`/shop/${product.slug}`} className="group block no-underline">
      <article>
        <div className="relative aspect-[3/4] overflow-hidden bg-ink/5">
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            className="object-cover transition duration-700 group-hover:scale-[1.03]"
            sizes="(max-width:768px) 100vw, 33vw"
            unoptimized={isGif}
          />
          {product.availability === 'sold' && (
            <div className="absolute inset-0 flex items-center justify-center bg-ink/30">
              <span className="text-sm uppercase tracking-widest text-cream">Sold</span>
            </div>
          )}
        </div>
        <div className="mt-5">
          <Badge variant={product.availability === 'sold' ? 'sold' : 'available'}>
            {availabilityLabel(product.availability)}
          </Badge>
          <h3 className="mt-2 font-display text-xl text-ink group-hover:text-blue md:text-2xl">
            {product.title}
          </h3>
          <p className="mt-1 text-sm text-ink/60">{product.shortDescription}</p>
          <div className="mt-3 flex items-baseline justify-between gap-4">
            <span className="text-sm">{formatPrice(product.price, product.currency)}</span>
            <span className="text-xs uppercase tracking-widest text-ink/50">
              {productCtaLabel(product)}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
