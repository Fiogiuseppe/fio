import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { UreesProductDetail } from '@/components/urees/UreesProductDetail';
import { getUreesProduct, ureesProducts } from '@/data/urees';

type Props = { params: Promise<{ handle: string }> };

export async function generateStaticParams() {
  return ureesProducts.map((product) => ({ handle: product.handle }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  const product = getUreesProduct(handle);
  if (!product) return {};
  return {
    title: `${product.title} — Urees Store`,
    description: product.title,
  };
}

export default async function UreesProductPage({ params }: Props) {
  const { handle } = await params;
  const product = getUreesProduct(handle);
  if (!product) notFound();

  return <UreesProductDetail product={product} />;
}
