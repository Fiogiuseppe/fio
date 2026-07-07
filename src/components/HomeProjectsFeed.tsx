import Image from 'next/image';
import Link from 'next/link';
import { getHomeProjects } from '@/data/home-projects';
import { UREES_LOGO } from '@/data/urees/content';
import type { Project, ProjectMedia } from '@/lib/types';
import {
  TypographyBody,
  TypographyButton,
  TypographySection,
  TypographyLead,
  TypographyMeta,
} from '@/components/typography';
import { CleanVideoEmbed } from '@/components/CleanVideoEmbed';
import styles from './HomeProjectsFeed.module.css';

function mediaKey(item: ProjectMedia) {
  return item.type === 'video' ? item.youtubeId : item.src;
}

function isRasterMedia(item: ProjectMedia): item is ProjectMedia & { type: 'image' | 'gif'; src: string } {
  return item.type !== 'video';
}

function mediaAt(project: Project, index: number): ProjectMedia | undefined {
  return project.media?.[index];
}

function ProjectImage({
  href,
  src,
  alt,
  className,
}: {
  href: string;
  src: string;
  alt: string;
  className?: string;
}) {
  const isGif = src.endsWith('.gif');
  const isSvg = src.endsWith('.svg');

  return (
    <Link href={href} className={className}>
      <Image
        src={src}
        alt={alt}
        width={1600}
        height={900}
        className={styles.image}
        unoptimized={isGif || isSvg}
      />
    </Link>
  );
}

function UreesHomeEntry({ intro }: { intro: string }) {
  return (
    <>
      <TypographyLead className={styles.bodyCopy}>{intro}</TypographyLead>
      <Link href="/urees" className={styles.ureesHomeLogoLink}>
        <div className={styles.ureesHomeLogoWrap}>
          <Image
            src={UREES_LOGO}
            alt="Urees"
            width={280}
            height={76}
            className={styles.ureesHomeLogo}
          />
        </div>
        <TypographyMeta className={styles.ureesHomeLogoCaption}>
          Enter Urees
        </TypographyMeta>
      </Link>
    </>
  );
}
function SneakersIntro() {
  return (
    <TypographyBody className={styles.bodyCopy}>
      Sneakers collection campaign for{' '}
      <a href="https://www.instagram.com/desigual/" target="_blank" rel="noopener noreferrer">
        @desigual
      </a>{' '}
      in collaboration with{' '}
      <a href="https://www.instagram.com/olimpic.tv/" target="_blank" rel="noopener noreferrer">
        @olimpic.tv
      </a>
    </TypographyBody>
  );
}

export function HomeProjectsFeed() {
  const entries = getHomeProjects();

  return (
    <section className={styles.section} aria-label="Selected projects">
      {entries.map(({ config, project }) => {
        const href = project.slug === 'urees' ? '/urees' : `/work/${project.slug}`;
        const intro =
          config.intro ??
          project.body?.[0] ??
          project.subtitle;

        return (
          <article key={project.slug} className={styles.row}>
            {config.kicker && (
              <>
                <TypographyMeta className={styles.kicker}>{config.kicker}</TypographyMeta>
                <TypographyMeta className={styles.dash}>–</TypographyMeta>
              </>
            )}

            <TypographySection as="h2" className={styles.projectTitle}>
              <Link href={href}>{project.title}</Link>
            </TypographySection>

            {project.slug === 'urees' ? (
              <UreesHomeEntry intro={intro} />
            ) : project.slug === 'desigual-sneakers-campaign' ? (
              <SneakersIntro />
            ) : (
              <TypographyLead className={styles.bodyCopy}>{intro}</TypographyLead>
            )}

            {project.slug !== 'urees' &&
              config.blocks.map((block, blockIndex) => {
              if (block.type === 'split') {
                const items = block.mediaIndices
                  .map((index) => mediaAt(project, index))
                  .filter((item): item is ProjectMedia => Boolean(item))
                  .filter(isRasterMedia);

                if (!items.length) return null;

                return (
                  <div key={`split-${blockIndex}`} className={styles.split}>
                    {items.map((item) => (
                      <ProjectImage
                        key={mediaKey(item)}
                        href={href}
                        src={item.src}
                        alt={item.alt ?? project.title}
                      />
                    ))}
                  </div>
                );
              }

              const item = mediaAt(project, block.mediaIndex);

              if (item?.type === 'video') {
                return (
                  <Link key={`full-${blockIndex}`} href={href} className={styles.full}>
                    <CleanVideoEmbed
                      youtubeId={item.youtubeId}
                      title={item.alt ?? project.title}
                      poster={item.poster}
                      mode="ambient"
                      className={styles.video}
                    />
                  </Link>
                );
              }

              if (project.heroVideo?.mp4Src && !item) {
                return (
                  <Link key={`full-${blockIndex}`} href={href} className={styles.full}>
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
                  </Link>
                );
              }

              if (project.heroVideo?.youtubeId && !item) {
                return (
                  <Link key={`full-${blockIndex}`} href={href} className={styles.full}>
                    <CleanVideoEmbed
                      youtubeId={project.heroVideo.youtubeId}
                      title={project.title}
                      poster={project.heroVideo.poster ?? project.heroImage}
                      mode="ambient"
                      className={styles.video}
                    />
                  </Link>
                );
              }

              const src = item?.src ?? project.heroImage;
              const alt = item?.alt ?? project.title;

              return (
                <ProjectImage
                  key={`full-${blockIndex}`}
                  href={href}
                  src={src}
                  alt={alt}
                  className={styles.full}
                />
              );
            })}

            {config.showAward && project.award && (
              <a
                className={styles.award}
                href={project.award.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <TypographyButton as="span">&gt; {project.award.label}</TypographyButton>
              </a>
            )}
          </article>
        );
      })}
    </section>
  );
}
