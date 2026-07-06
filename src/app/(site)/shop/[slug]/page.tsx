import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Badge } from '@/components/Badge';
import { Gallery } from '@/components/Gallery';
import { getProduct } from '@/data/products';
import {
  availabilityLabel,
  categoryLabel,
  formatPrice,
  productCtaLabel,
} from '@/lib/utils';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const { products } = await import('@/data/products');
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: `${product.title} — Shop`,
    description: product.shortDescription,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const isGif = product.images[0]?.endsWith('.gif');
  const isSold = product.availability === 'sold';
  const isComingSoon = product.availability === 'coming-soon';

  return (
    <article className="px-6 py-12 md:px-10 md:py-20">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="relative aspect-[3/4] overflow-hidden bg-ink/5">
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width:1024px) 100vw, 50vw"
            unoptimized={isGif}
          />
        </div>

        <div className="flex flex-col justify-center">
          <Badge variant={isSold ? 'sold' : 'available'}>
            {availabilityLabel(product.availability)}
          </Badge>
          <p className="mt-4 text-xs uppercase tracking-widest text-ink/50">
            {categoryLabel(product.category)}
          </p>
          <h1 className="mt-2 font-display text-4xl md:text-5xl">{product.title}</h1>
          <p className="mt-4 text-lg text-ink/70">{product.shortDescription}</p>

          <dl className="mt-10 space-y-4 border-t border-ink/10 pt-10 text-sm">
            <div className="flex justify-between">
              <dt className="text-ink/50">Price</dt>
              <dd>{formatPrice(product.price, product.currency)}</dd>
            </div>
            {product.size && (
              <div className="flex justify-between">
                <dt className="text-ink/50">Size</dt>
                <dd>{product.size}</dd>
              </div>
            )}
            {product.technique && (
              <div className="flex justify-between">
                <dt className="text-ink/50">Technique</dt>
                <dd>{product.technique}</dd>
              </div>
            )}
            {product.edition && (
              <div className="flex justify-between">
                <dt className="text-ink/50">Edition</dt>
                <dd>{product.edition}</dd>
              </div>
            )}
          </dl>

          <div className="mt-10">
            {isSold ? (
              <p className="text-sm uppercase tracking-widest text-ink/40">This piece has been collected.</p>
            ) : isComingSoon ? (
              <a
                href="/contact"
                className="inline-block border border-ink px-8 py-3 text-sm uppercase tracking-widest no-underline transition hover:bg-ink hover:text-cream"
              >
                Request this piece
              </a>
            ) : (
              <button
                type="button"
                disabled
                title="Stripe checkout coming soon"
                className="border border-ink bg-ink px-8 py-3 text-sm uppercase tracking-widest text-cream opacity-90 cursor-not-allowed"
              >
                {productCtaLabel(product)} — soon
              </button>
            )}
            <p className="mt-3 text-xs text-ink/40">
              Checkout via Stripe will be available soon. For now,{' '}
              <a href="/contact" className="text-blue">contact Giuseppe</a> to collect.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-20 max-w-3xl">
        <h2 className="font-display text-2xl">The story</h2>
        <p className="mt-4 text-lg leading-relaxed text-ink/70">{product.longStory}</p>
      </div>

      {product.images.length > 1 && (
        <div className="mx-auto mt-16 max-w-7xl">
          <Gallery images={product.images.slice(1)} alt={product.title} />
        </div>
      )}
    </article>
  );
}
