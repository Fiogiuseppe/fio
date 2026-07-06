import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/lib/types';
import { categoryLabel, cn } from '@/lib/utils';
import { TypographyCard, TypographyMeta } from '@/components/typography';
import { editorial } from '@/lib/typography';
import { Badge } from './Badge';
import styles from './ProjectCard.module.css';

export type ProjectCardVariant = 'hero' | 'large' | 'grid';

type ProjectCardProps = {
  project: Project;
  variant?: ProjectCardVariant;
  priority?: boolean;
};

export function ProjectCard({ project, variant = 'grid', priority }: ProjectCardProps) {
  const isGif = project.heroImage.endsWith('.gif');
  const isSvg = project.heroImage.endsWith('.svg');
  const href = project.slug === 'urees' ? '/urees' : `/work/${project.slug}`;

  const sizes =
    variant === 'hero'
      ? '100vw'
      : variant === 'large'
        ? '(max-width: 768px) 100vw, 50vw'
        : '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw';

  return (
    <Link href={href} className={cn('group block no-underline', styles.link, styles[variant])}>
      <article>
        <div className={cn(styles.media, styles[`media_${variant}`])}>
          <Image
            src={project.heroImage}
            alt={project.title}
            fill
            className={styles.image}
            sizes={sizes}
            priority={priority}
            unoptimized={isGif || isSvg}
          />
        </div>
        <div className={cn(styles.copy, editorial.stack.block)}>
          <Badge>
            {categoryLabel(project.category)} · {project.year}
          </Badge>
          <TypographyCard
            className={cn(
              editorial.stack.labelToTitle,
              'text-ink group-hover:text-blue',
              variant === 'hero' && styles.titleHero
            )}
          >
            {project.title}
          </TypographyCard>
          {variant !== 'grid' && (
            <TypographyMeta as="p" className={editorial.stack.labelToTitle}>
              {project.subtitle}
            </TypographyMeta>
          )}
        </div>
      </article>
    </Link>
  );
}
