import { cn } from '@/lib/utils';
import styles from './ProjectNewBadge.module.css';

type ProjectNewBadgeProps = {
  className?: string;
};

export function ProjectNewBadge({ className }: ProjectNewBadgeProps) {
  return (
    <div className={cn(styles.root, className)} aria-label="New project">
      <svg className={styles.shape} viewBox="0 0 72 72" aria-hidden>
        <path d="M72 0 L72 72 L0 72 Z" fill="#ffffff" stroke="#001FFF" strokeWidth="2" />
      </svg>
      <span className={styles.label}>NEW</span>
    </div>
  );
}
