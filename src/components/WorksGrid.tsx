import Image from 'next/image';
import Link from 'next/link';
import { OTHER_WORKS } from '@/data/site';
import styles from './WorksGrid.module.css';

export function WorksGrid() {
  return (
    <section className={styles.section} aria-labelledby="other-works">
      <h2 className={styles.title} id="other-works">
        Other Works
      </h2>
      <div className={styles.grid}>
        {OTHER_WORKS.map((work) => (
          <Link className={styles.cell} href={work.href} key={`${work.href}-${work.alt}`}>
            <Image
              className={styles.image}
              src={work.image}
              alt={work.alt}
              width={800}
              height={800}
              unoptimized={work.image.endsWith('.gif')}
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
