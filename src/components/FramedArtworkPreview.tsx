import Image from 'next/image';
import styles from './FramedArtworkPreview.module.css';

type FramedArtworkPreviewProps = {
  src: string;
  alt: string;
  unoptimized?: boolean;
  priority?: boolean;
};

export function FramedArtworkPreview({
  src,
  alt,
  unoptimized = false,
  priority = false,
}: FramedArtworkPreviewProps) {
  return (
    <div className={styles.scene}>
      <div className={styles.wall} aria-hidden="true" />
      <div className={styles.baseboard} aria-hidden="true" />
      <div className={styles.floor} aria-hidden="true" />

      <div className={styles.frameGroup}>
        <div className={styles.frameShadow} aria-hidden="true" />
        <div className={styles.frame}>
          <div className={styles.mat}>
            <div className={styles.paper}>
              <Image
                src={src}
                alt={alt}
                fill
                className={styles.image}
                sizes="(max-width:1024px) 42vw, 22vw"
                unoptimized={unoptimized}
                priority={priority}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
