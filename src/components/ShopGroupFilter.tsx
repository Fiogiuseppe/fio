'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { SHOP_GROUP_OPTIONS, type ShopGroupFilter } from '@/data/shop-catalog';
import styles from '@/app/(site)/shop/shop.module.css';

export function ShopGroupFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const active = (searchParams.get('group') as ShopGroupFilter) ?? 'all';

  function setGroup(value: ShopGroupFilter) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === 'all') {
      params.delete('group');
    } else {
      params.set('group', value);
    }
    const query = params.toString();
    router.push(query ? `/shop?${query}` : '/shop', { scroll: false });
  }

  return (
    <div className={styles.filters} role="toolbar" aria-label="Filter by category">
      {SHOP_GROUP_OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          className={`${styles.filterButton} ${
            active === option.value ? styles.filterButtonActive : ''
          }`}
          onClick={() => setGroup(option.value)}
          aria-pressed={active === option.value}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
