import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { editorial } from '@/lib/typography';

type TypographyProps<T extends ElementType> = {
  as?: T;
  className?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'className' | 'children'>;

type BodyProps<T extends ElementType> = TypographyProps<T> & {
  measure?: boolean;
};

export function TypographyLabel<T extends ElementType = 'p'>({
  as,
  className,
  children,
  ...props
}: TypographyProps<T>) {
  const Tag = (as ?? 'p') as ElementType;
  return (
    <Tag className={cn(editorial.label, className)} {...props}>
      {children}
    </Tag>
  );
}

/** VOICE 01 — Quartz only. Max 6 words. Hero / cover statements. */
export function TypographyHero<T extends ElementType = 'h1'>({
  as,
  className,
  children,
  ...props
}: TypographyProps<T>) {
  const Tag = (as ?? 'h1') as ElementType;
  return (
    <Tag className={cn(editorial.hero, className)} {...props}>
      {children}
    </Tag>
  );
}

/** VOICE 02 — section titles. Helvetica Bold, uppercase. */
export function TypographySection<T extends ElementType = 'h2'>({
  as,
  className,
  children,
  ...props
}: TypographyProps<T>) {
  const Tag = (as ?? 'h2') as ElementType;
  return (
    <Tag className={cn(editorial.section, className)} {...props}>
      {children}
    </Tag>
  );
}

/** VOICE 02 — card / project / journal titles. Helvetica Bold, uppercase. */
export function TypographyCard<T extends ElementType = 'h3'>({
  as,
  className,
  children,
  ...props
}: TypographyProps<T>) {
  const Tag = (as ?? 'h3') as ElementType;
  return (
    <Tag className={cn(editorial.card, className)} {...props}>
      {children}
    </Tag>
  );
}

/** @deprecated Use TypographySection */
export const TypographyH2 = TypographySection;

/** @deprecated Use TypographyCard */
export const TypographyH3 = TypographyCard;

export function TypographyLead<T extends ElementType = 'p'>({
  as,
  className,
  children,
  measure = true,
  ...props
}: BodyProps<T>) {
  const Tag = (as ?? 'p') as ElementType;
  return (
    <Tag className={cn(editorial.lead, measure && editorial.measure, className)} {...props}>
      {children}
    </Tag>
  );
}

export function TypographyBody<T extends ElementType = 'p'>({
  as,
  className,
  children,
  measure = true,
  ...props
}: BodyProps<T>) {
  const Tag = (as ?? 'p') as ElementType;
  return (
    <Tag className={cn(editorial.body, measure && editorial.measure, className)} {...props}>
      {children}
    </Tag>
  );
}

export function TypographyMeta<T extends ElementType = 'p'>({
  as,
  className,
  children,
  ...props
}: TypographyProps<T>) {
  const Tag = (as ?? 'p') as ElementType;
  return (
    <Tag className={cn(editorial.meta, className)} {...props}>
      {children}
    </Tag>
  );
}

export function TypographyButton<T extends ElementType = 'span'>({
  as,
  className,
  children,
  ...props
}: TypographyProps<T>) {
  const Tag = (as ?? 'span') as ElementType;
  return (
    <Tag className={cn(editorial.button, className)} {...props}>
      {children}
    </Tag>
  );
}

/** VOICE 01 — Quartz artistic statements. Centered. */
export function TypographyQuote<T extends ElementType = 'blockquote'>({
  as,
  className,
  children,
  ...props
}: TypographyProps<T>) {
  const Tag = (as ?? 'blockquote') as ElementType;
  return (
    <Tag className={cn(editorial.quote, 'text-center', className)} {...props}>
      {children}
    </Tag>
  );
}
