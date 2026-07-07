import Image from 'next/image';
import { cn } from '@/lib/utils';
import styles from './AwardBadges.module.css';

type AwardBadge = {
  src: string;
  alt: string;
  href: string;
};

type AwardBadgesProps = {
  badges: AwardBadge[];
  className?: string;
};

export function AwardBadges({ badges, className }: AwardBadgesProps) {
  if (!badges.length) return null;

  return (
    <div className={cn(styles.root, className)}>
      {badges.map((badge) => (
        <a
          key={badge.src}
          href={badge.href}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.badge}
          aria-label={badge.alt}
          title={badge.alt}
        >
          <Image
            src={badge.src}
            alt=""
            fill
            className={styles.image}
            sizes="(max-width: 768px) 22vw, 88px"
          />
        </a>
      ))}
    </div>
  );
}
