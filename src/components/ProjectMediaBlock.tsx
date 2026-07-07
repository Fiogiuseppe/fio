import Image from 'next/image';
import type { ProjectMedia } from '@/lib/types';
import { CleanVideoEmbed } from './CleanVideoEmbed';
import styles from './ProjectMediaBlock.module.css';

type ProjectMediaBlockProps = {
  items: ProjectMedia[];
  title: string;
};

function isLandscape(width?: number, height?: number) {
  if (!width || !height) return true;
  return width >= height * 1.05;
}

export function ProjectMediaBlock({ items, title }: ProjectMediaBlockProps) {
  if (!items.length) return null;

  return (
    <div className={styles.stack}>
      {items.map((item) => {
        if (item.type === 'video') {
          const landscape = item.fullWidth !== false;

          return (
            <div
              key={item.youtubeId}
              className={`${styles.frame} ${styles.videoFrame} ${
                landscape ? `${styles.landscape} ${styles.videoLandscape}` : `${styles.portrait} ${styles.videoPortrait}`
              }`}
            >
              <CleanVideoEmbed
                youtubeId={item.youtubeId}
                title={item.alt ?? title}
                poster={item.poster}
                mode="cinema"
                className="absolute inset-0 h-full w-full"
              />
            </div>
          );
        }

        const isGif = item.type === 'gif' || item.src.endsWith('.gif');
        const isSvg = item.src.endsWith('.svg');
        const useContain = item.fit === 'contain';
        const landscape = isLandscape(item.width, item.height);
        const orientationClass = landscape ? styles.landscape : styles.portrait;
        const sizes = landscape
          ? '(max-width: 767px) 94vw, 85vw'
          : '(max-width: 767px) 88vw, 42vw';

        if (useContain) {
          return (
            <div key={item.src} className={`${styles.frame} ${orientationClass}`}>
              <Image
                src={item.src}
                alt={item.alt ?? title}
                width={item.width ?? 1440}
                height={item.height ?? 1795}
                className={landscape ? styles.image : `${styles.image} ${styles.portraitImage}`}
                sizes={sizes}
                unoptimized={isGif || isSvg}
              />
            </div>
          );
        }

        return (
          <div
            key={item.src}
            className={`${styles.frame} ${orientationClass} ${styles.coverFrame} ${
              landscape ? styles.coverLandscape : styles.coverPortrait
            }`}
          >
            <Image
              src={item.src}
              alt={item.alt ?? title}
              fill
              className="object-cover"
              sizes={sizes}
              unoptimized={isGif || isSvg}
            />
          </div>
        );
      })}
    </div>
  );
}
