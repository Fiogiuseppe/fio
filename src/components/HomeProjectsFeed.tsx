import Image from 'next/image';
import Link from 'next/link';
import { getHomeProjects } from '@/data/home-projects';
import type { Project, ProjectMedia } from '@/lib/types';
import styles from './HomeProjectsFeed.module.css';

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

function SneakersIntro() {
  return (
    <p className={styles.bodyCopy}>
      Sneakers collection campaign for{' '}
      <a href="https://www.instagram.com/desigual/" target="_blank" rel="noopener noreferrer">
        @desigual
      </a>{' '}
      in collaboration with{' '}
      <a href="https://www.instagram.com/olimpic.tv/" target="_blank" rel="noopener noreferrer">
        @olimpic.tv
      </a>
    </p>
  );
}

export function HomeProjectsFeed() {
  const entries = getHomeProjects();

  return (
    <section className={styles.section} aria-label="Selected projects">
      {entries.map(({ config, project }) => {
        const href = `/work/${project.slug}`;
        const intro =
          config.intro ??
          project.body?.[0] ??
          project.subtitle;

        return (
          <article key={project.slug} className={styles.row}>
            {config.kicker && (
              <>
                <p className={styles.kicker}>{config.kicker}</p>
                <p className={styles.dash}>–</p>
              </>
            )}

            <h2 className={styles.projectTitle}>
              <Link href={href}>{project.title}</Link>
            </h2>

            {project.slug === 'desigual-sneakers-campaign' ? (
              <SneakersIntro />
            ) : (
              <p className={styles.bodyCopy}>{intro}</p>
            )}

            {config.blocks.map((block, blockIndex) => {
              if (block.type === 'split') {
                const items = block.mediaIndices
                  .map((index) => mediaAt(project, index))
                  .filter((item): item is ProjectMedia => Boolean(item));

                if (!items.length) return null;

                return (
                  <div key={`split-${blockIndex}`} className={styles.split}>
                    {items.map((item) => (
                      <ProjectImage
                        key={item.src}
                        href={href}
                        src={item.src}
                        alt={item.alt ?? project.title}
                      />
                    ))}
                  </div>
                );
              }

              const item = mediaAt(project, block.mediaIndex);
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
                &gt; {project.award.label.toUpperCase()}
              </a>
            )}
          </article>
        );
      })}
    </section>
  );
}
