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
        'transition',
        variant === 'primary' && 'btn-on-dark px-8 py-3',
        variant === 'secondary' && 'btn-outline-on-light px-8 py-3',
        variant === 'ghost' && 'text-on-light underline-offset-4 no-underline hover:text-blue hover:underline',
        className
      )}
    >
      <TypographyButton as="span">{label}</TypographyButton>
    </Link>
  );
}
