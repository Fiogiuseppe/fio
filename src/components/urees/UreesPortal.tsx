import Link from 'next/link';
import { FIO_PORTAL } from '@/data/urees/content';

export function UreesPortal() {
  return (
    <div className="urees-portal">
      <div className="urees-page-width urees-portal__inner">
        <Link href={FIO_PORTAL.href} className="urees-portal__link" title={FIO_PORTAL.hint}>
          <span aria-hidden="true">←</span> {FIO_PORTAL.label}
        </Link>
        <span className="urees-portal__hint">{FIO_PORTAL.hint}</span>
      </div>
    </div>
  );
}
