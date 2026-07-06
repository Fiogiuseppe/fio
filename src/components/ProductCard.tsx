import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { availabilityLabel, formatPrice, productCtaLabel } from '@/lib/utils';
import { TypographyButton, TypographyH3, TypographyMeta } from '@/components/typography';
import { editorial } from '@/lib/typography';
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
              <TypographyButton as="span" className="text-cream">
                Sold
              </TypographyButton>
            </div>
          )}
        </div>
        <div className={editorial.stack.block}>
          <Badge variant={product.availability === 'sold' ? 'sold' : 'available'}>
            {availabilityLabel(product.availability)}
          </Badge>
          <TypographyH3 className={`${editorial.stack.labelToTitle} text-ink group-hover:text-blue`}>
            {product.title}
          </TypographyH3>
          <TypographyMeta as="p" className={editorial.stack.labelToTitle}>
            {product.shortDescription}
          </TypographyMeta>
          <div className={`flex items-baseline justify-between gap-4 ${editorial.stack.labelToTitle}`}>
            <TypographyMeta>{formatPrice(product.price, product.currency)}</TypographyMeta>
            <TypographyMeta>{productCtaLabel(product)}</TypographyMeta>
          </div>
        </div>
      </article>
    </Link>
  );
}
