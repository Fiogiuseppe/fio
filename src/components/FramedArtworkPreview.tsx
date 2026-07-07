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
    <div className={styles.stage}>
      <div className={styles.frameWrap}>
        <div className={styles.frameShadow} aria-hidden="true" />
        <div className={styles.frame}>
          <div className={styles.artwork}>
            <Image
              src={src}
              alt={alt}
              fill
              className={styles.image}
              sizes="(max-width:1024px) 88vw, 44vw"
              unoptimized={unoptimized}
              priority={priority}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
