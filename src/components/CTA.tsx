import Link from 'next/link';
import { TypographyButton } from '@/components/typography';
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
        'inline-block no-underline transition',
        variant === 'primary' &&
          'border border-ink bg-ink px-8 py-3 text-on-dark hover:border-blue hover:bg-blue',
        variant === 'secondary' &&
          'border border-ink px-8 py-3 text-on-light hover:bg-ink hover:text-on-dark',
        variant === 'ghost' && 'text-on-light underline-offset-4 hover:text-blue hover:underline',
        className
      )}
    >
      <TypographyButton as="span">{label}</TypographyButton>
    </Link>
  );
}
