import Link from 'next/link';
import { cn } from '@/lib/utils';

type CTAProps = {
  href: string;
  label: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
};

export function CTA({ href, label, variant = 'primary', className }: CTAProps) {
  return (
    <Link
      href={href}
      className={cn(
        'inline-block text-sm uppercase tracking-widest no-underline transition',
        variant === 'primary' && 'border border-ink bg-ink px-6 py-3 text-cream hover:bg-blue hover:border-blue',
        variant === 'secondary' && 'border border-ink px-6 py-3 text-ink hover:bg-ink hover:text-cream',
        variant === 'ghost' && 'text-ink underline-offset-4 hover:text-blue hover:underline',
        className
      )}
    >
      {label}
    </Link>
  );
}
