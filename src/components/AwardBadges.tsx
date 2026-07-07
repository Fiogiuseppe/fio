import Image from 'next/image';
import { cn } from '@/lib/utils';
import styles from './AwardBadges.module.css';

type AwardBadge = {
  src: string;
  alt: string;
};

type AwardBadgesProps = {
  badges: AwardBadge[];
  className?: string;
};

export function AwardBadges({ badges, className }: AwardBadgesProps) {
  if (!badges.length) return null;

  return (
    <div className={cn(styles.root, className)} aria-hidden>
      {badges.map((badge) => (
        <div key={badge.src} className={styles.badge}>
          <Image
            src={badge.src}
            alt={badge.alt}
            fill
            className={styles.image}
            sizes="(max-width: 768px) 18vw, 72px"
          />
        </div>
      ))}
    </div>
  );
}
