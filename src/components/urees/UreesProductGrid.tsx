import type { UreesProduct } from '@/lib/urees-types';
import { UreesProductCard } from './UreesProductCard';

type UreesProductGridProps = {
  products: UreesProduct[];
};

export function UreesProductGrid({ products }: UreesProductGridProps) {
  return (
    <div className="urees-grid">
      {products.map((product) => (
        <UreesProductCard key={product.handle} product={product} />
      ))}
    </div>
  );
}
