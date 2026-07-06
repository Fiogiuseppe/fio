'use client';

import { useState } from 'react';
import { TypographyButton, TypographyMeta } from '@/components/typography';
import type { VisceralPoemFormat } from '@/data/visceral-poems-pricing';
import { cn } from '@/lib/utils';

type ShopCheckoutButtonProps = {
  slug: string;
  format?: VisceralPoemFormat;
  withFrame?: boolean;
  label?: string;
  disabled?: boolean;
  className?: string;
};

export function ShopCheckoutButton({
  slug,
  format,
  withFrame,
  label = 'Buy now',
  disabled = false,
  className,
}: ShopCheckoutButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCheckout() {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, format, withFrame }),
      });

      const data = (await response.json()) as { url?: string; error?: string };

      if (!response.ok || !data.url) {
        throw new Error(data.error ?? 'Checkout failed');
      }

      window.location.href = data.url;
    } catch (checkoutError) {
      setError(checkoutError instanceof Error ? checkoutError.message : 'Checkout failed');
      setLoading(false);
    }
  }

  return (
    <div className={className}>
      <button
        type="button"
        onClick={handleCheckout}
        disabled={disabled || loading}
        className={cn('btn-on-dark px-8 py-3', loading && 'opacity-80')}
      >
        <TypographyButton as="span">{loading ? 'Redirecting to checkout…' : label}</TypographyButton>
      </button>
      {error ? (
        <TypographyMeta className="mt-4 text-red-700">{error}</TypographyMeta>
      ) : null}
    </div>
  );
}
