import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import {
  editorialSpace,
  grid,
  motion,
  sectionVariantClass,
  type EditorialSectionVariant,
} from '@/lib/editorial';

type EditorialSectionProps = {
  children: ReactNode;
  className?: string;
  variant?: EditorialSectionVariant;
  /** Skip horizontal page padding (e.g. full-bleed imagery) */
  bleed?: boolean;
  as?: 'section' | 'article' | 'div';
};

/**
 * Art-directed section wrapper. Enforces editorial spacing and composition variants.
 * Never repeat the same variant twice in a row on a page when possible.
 */
export function EditorialSection({
  children,
  className,
  variant = 'default',
  bleed = false,
  as: Tag = 'section',
}: EditorialSectionProps) {
  return (
    <Tag
      className={cn(
        !bleed && editorialSpace.sectionX,
        variant === 'default' && editorialSpace.sectionY,
        !bleed && grid.page,
        sectionVariantClass[variant],
        motion.fade,
        className
      )}
    >
      {children}
    </Tag>
  );
}
