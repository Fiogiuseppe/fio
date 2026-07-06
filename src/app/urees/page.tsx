import { UreesHomeSections } from '@/components/urees/UreesHomeSections';
import { ureesFeaturedProducts } from '@/data/urees';

export default function UreesHomePage() {
  return <UreesHomeSections products={ureesFeaturedProducts} />;
}
