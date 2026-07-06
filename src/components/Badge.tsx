import { cn } from '@/lib/utils';

type BadgeProps = {
  children: React.ReactNode;
  variant?: 'default' | 'sold' | 'available' | 'soon';
  className?: string;
};

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-block text-xs uppercase tracking-widest',
        variant === 'default' && 'text-ink/50',
        variant === 'sold' && 'text-ink/40',
        variant === 'available' && 'text-ink',
        variant === 'soon' && 'text-ink/60',
        className
      )}
    >
      {children}
    </span>
  );
}
