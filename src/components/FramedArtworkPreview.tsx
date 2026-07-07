import Image from 'next/image';
import { WOOD_FRAME_POSTER_INSET, WOOD_FRAME_SCENE } from '@/data/frame-mockup';
import styles from './FramedArtworkPreview.module.css';

type FramedArtworkPreviewProps = {
  src: string;
  alt: string;
  unoptimized?: boolean;
  priority?: boolean;
  variant?: 'wood-wall' | 'white';
};

export function FramedArtworkPreview({
  src,
  alt,
  unoptimized = false,
  priority = false,
  variant = 'white',
}: FramedArtworkPreviewProps) {
  if (variant === 'wood-wall') {
    return (
      <div className={styles.woodScene}>
        <Image
          src={WOOD_FRAME_SCENE}
          alt=""
          fill
          className={styles.woodSceneImage}
          sizes="(max-width:1024px) 100vw, 50vw"
          priority={priority}
          aria-hidden
        />

        <div
          className={styles.woodPosterSlot}
          style={{
            left: `${WOOD_FRAME_POSTER_INSET.left}%`,
            top: `${WOOD_FRAME_POSTER_INSET.top}%`,
            width: `${WOOD_FRAME_POSTER_INSET.width}%`,
            height: `${WOOD_FRAME_POSTER_INSET.height}%`,
          }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            className={styles.woodPoster}
            sizes="(max-width:1024px) 54vw, 28vw"
            unoptimized={unoptimized}
            priority={priority}
          />
        </div>
      </div>
    );
  }

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
