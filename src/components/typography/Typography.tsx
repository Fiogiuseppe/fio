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

/** Quartz only. Max 6 words. Hero / cover statements. */
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

/** Section titles — Helvetica Bold, uppercase. */
export function TypographyH2<T extends ElementType = 'h2'>({
  as,
  className,
  children,
  ...props
}: TypographyProps<T>) {
  const Tag = (as ?? 'h2') as ElementType;
  return (
    <Tag className={cn(editorial.h2, className)} {...props}>
      {children}
    </Tag>
  );
}

/** Subsection / card titles — Helvetica Bold, uppercase. */
export function TypographyH3<T extends ElementType = 'h3'>({
  as,
  className,
  children,
  ...props
}: TypographyProps<T>) {
  const Tag = (as ?? 'h3') as ElementType;
  return (
    <Tag className={cn(editorial.h3, className)} {...props}>
      {children}
    </Tag>
  );
}

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

/** Quartz — short centered artistic statements. */
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
