import { TypographyCard, TypographySection } from '@/components/typography';
import { splitOverlayTitle } from '@/lib/overlay-title';
import { cn } from '@/lib/utils';
import styles from './ProjectOverlayTitle.module.css';

type ProjectOverlayTitleProps = {
  title: string;
  className?: string;
  variant?: 'card' | 'detail';
};

export function ProjectOverlayTitle({
  title,
  className,
  variant = 'card',
}: ProjectOverlayTitleProps) {
  const [lineOne, lineTwo] = splitOverlayTitle(title);
  const lineClassName = styles.line;

  if (variant === 'detail') {
    return (
      <TypographySection as="h1" className={cn(styles.title, className)}>
        <span className={lineClassName}>{lineOne}</span>
        <span className={lineClassName}>{lineTwo}</span>
      </TypographySection>
    );
  }

  return (
    <TypographyCard className={cn(styles.title, className)}>
      <span className={lineClassName}>{lineOne}</span>
      <span className={lineClassName}>{lineTwo}</span>
    </TypographyCard>
  );
}
