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
    <div className={styles.root}>
      <div className={styles.frame} aria-hidden="true">
        <div className={styles.mat}>
          <div className={styles.paper}>
            <Image
              src={src}
              alt={alt}
              fill
              className={styles.image}
              sizes="(max-width:1024px) 40vw, 20vw"
              unoptimized={unoptimized}
              priority={priority}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
