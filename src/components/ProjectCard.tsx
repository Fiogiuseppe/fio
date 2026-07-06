import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/lib/types';
import { categoryLabel, cn } from '@/lib/utils';
import { splitOverlayTitle } from '@/lib/overlay-title';
import { TypographyCard, TypographyMeta } from '@/components/typography';
import { Badge } from './Badge';
import { CleanVideoEmbed } from './CleanVideoEmbed';
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
  const [titleLineOne, titleLineTwo] = splitOverlayTitle(project.title);

  const sizes =
    variant === 'hero'
      ? '100vw'
      : variant === 'large'
        ? '100vw'
        : '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw';

  return (
    <Link href={href} className={cn('group block no-underline', styles.link, styles[variant])}>
      <article>
        <div className={cn(styles.media, styles[`media_${variant}`])}>
          {project.heroVideo && variant === 'hero' ? (
            <CleanVideoEmbed
              youtubeId={project.heroVideo.youtubeId}
              title={project.title}
              poster={project.heroVideo.poster ?? project.heroImage}
              mode="ambient"
              className={styles.video}
            />
          ) : (
            <Image
              src={project.heroImage}
              alt={project.title}
              fill
              className={styles.image}
              sizes={sizes}
              priority={priority}
              unoptimized={isGif || isSvg}
            />
          )}

          <div className={cn(styles.overlay, styles[`overlay_${variant}`])}>
            <Badge className={styles.overlayBadge}>
              {categoryLabel(project.category)} · {project.year}
            </Badge>
            <TypographyCard className={cn(styles.overlayTitle, variant === 'hero' && styles.titleHero)}>
              {titleLineOne}
              <br />
              {titleLineTwo}
            </TypographyCard>
            {variant !== 'grid' && (
              <TypographyMeta as="p" className={styles.overlaySubtitle}>
                {project.subtitle}
              </TypographyMeta>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
