import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/lib/types';
import { categoryLabel, cn } from '@/lib/utils';
import { splitOverlayTitle } from '@/lib/overlay-title';
import { TypographyCard, TypographyMeta } from '@/components/typography';
import { Badge } from './Badge';
import { AwardBadges } from './AwardBadges';
import { CleanVideoEmbed } from './CleanVideoEmbed';
import styles from './ProjectCard.module.css';

export type ProjectCardVariant = 'hero' | 'large' | 'grid';

type ProjectCardProps = {
  project: Project;
  variant?: ProjectCardVariant;
  priority?: boolean;
};

export function ProjectCard({ project, variant = 'grid', priority }: ProjectCardProps) {
  const coverImage = project.workCoverImage ?? project.heroImage;
  const isGif = coverImage.endsWith('.gif');
  const isSvg = coverImage.endsWith('.svg');
  const href = project.externalUrl ?? `/work/${project.slug}`;
  const isExternal = Boolean(project.externalUrl);
  const [titleLineOne, titleLineTwo] = splitOverlayTitle(project.title);
  const showAwardBadges = Boolean(project.award?.badges?.length && variant !== 'grid');

  const sizes =
    variant === 'hero'
      ? '100vw'
      : variant === 'large'
        ? '100vw'
        : '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw';

  const className = cn('group block no-underline', styles.link, styles[variant]);

  const content = (
    <article>
      <div className={cn(styles.media, styles[`media_${variant}`])}>
        {project.heroVideo?.mp4Src && variant === 'hero' ? (
          <video
            className={styles.video}
            src={project.heroVideo.mp4Src}
            poster={project.heroVideo.poster ?? project.heroImage}
            muted
            playsInline
            autoPlay
            loop
            preload="metadata"
          />
        ) : project.heroVideo?.youtubeId && variant === 'hero' ? (
          <CleanVideoEmbed
            youtubeId={project.heroVideo.youtubeId}
            title={project.title}
            poster={project.heroVideo.poster ?? project.heroImage}
            mode="ambient"
            className={styles.video}
          />
        ) : (
          <Image
            src={coverImage}
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
  );

  const card = (
    <div className={styles.card}>
      {isExternal ? (
        <a
          href={href}
          className={className}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} — opens in a new tab`}
        >
          {content}
        </a>
      ) : (
        <Link href={href} className={className}>
          {content}
        </Link>
      )}
      {showAwardBadges ? (
        <AwardBadges badges={project.award!.badges!} className={styles.awardBadges} />
      ) : null}
    </div>
  );

  return card;
}
