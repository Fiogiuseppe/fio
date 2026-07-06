import { TypographyMeta } from '@/components/typography';
import { cn } from '@/lib/utils';

type BadgeProps = {
  children: React.ReactNode;
  variant?: 'default' | 'available' | 'sold';
};

export function Badge({ children, variant = 'default' }: BadgeProps) {
  return (
    <TypographyMeta
      as="span"
      className={cn(
        'inline-block',
        variant === 'available' && 'text-blue',
        variant === 'sold' && 'text-ink/35'
      )}
    >
      {children}
    </TypographyMeta>
  );
}
