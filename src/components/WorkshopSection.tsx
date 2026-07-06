import Image from 'next/image';
import Link from 'next/link';
import { WORKSHOP } from '@/data/site';
import styles from './WorkshopSection.module.css';

export function WorkshopSection() {
  return (
    <section className={styles.section} aria-labelledby="workshop-title">
      <div className={styles.inner}>
        <div>
          <h2 className={styles.kicker} id="workshop-title">
            {WORKSHOP.title}
          </h2>
          <h3 className={styles.name}>
            <Link href={WORKSHOP.href}>{WORKSHOP.name}</Link>
          </h3>
          <p className={styles.description}>{WORKSHOP.description}</p>
        </div>
        <Link href={WORKSHOP.href}>
          <Image
            className={styles.image}
            src={WORKSHOP.image}
            alt={WORKSHOP.name}
            width={1200}
            height={800}
          />
        </Link>
      </div>
    </section>
  );
}
