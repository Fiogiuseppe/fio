import Image from 'next/image';
import Link from 'next/link';
import { WP } from '@/data/site';
import styles from './FeaturedProjects.module.css';

export function FeaturedProjects() {
  return (
    <section className={styles.section} aria-label="Featured projects">
      <div className={styles.row}>
        <p className={styles.kicker}>Last project</p>
        <p className={styles.dash}>–</p>
        <h2 className={styles.projectTitle}>
          <Link href="/think_possible">BRANDING X UREES</Link>
        </h2>
        <p className={styles.bodyCopy}>
          The Urees upcycling project: Fusing artistry and sustainability in fashion @urees__
        </p>
        <div className={styles.split}>
          <Link href="/think_possible">
            <Image
              src={`${WP}/2024/01/20230907_UREES02632.jpg`}
              alt="Branding X Urees"
              width={1200}
              height={900}
              className={styles.image}
            />
          </Link>
          <Link href="/think_possible">
            <Image
              src={`${WP}/2024/01/20230907_UREES02606-scaled.jpg`}
              alt="Branding X Urees"
              width={1200}
              height={900}
              className={styles.image}
            />
          </Link>
        </div>
      </div>

      <div className={styles.row}>
        <h2 className={styles.projectTitle}>
          <Link href="/new-desigual-sneakers-collection">FIRST SNEAKERS CAMPAIGN X DESIGUAL</Link>
        </h2>
        <p className={styles.bodyCopy}>
          Sneakers collection campaign for{' '}
          <a href="https://www.instagram.com/desigual/" target="_blank" rel="noopener noreferrer">
            @desigual
          </a>{' '}
          in collaboration with{' '}
          <a href="https://www.instagram.com/olimpic.tv/" target="_blank" rel="noopener noreferrer">
            @olimpic.tv
          </a>
        </p>
        <Link href="/new-desigual-sneakers-collection" className={styles.full}>
          <Image
            src={`${WP}/2022/03/DESIGUAL_WEB_ASSETS_HOME_HEADER_PANORAMIC.gif`}
            alt="Desigual sneakers campaign"
            width={1600}
            height={900}
            className={styles.image}
            unoptimized
          />
        </Link>
      </div>

      <div className={styles.row}>
        <h2 className={styles.projectTitle}>
          <Link href="/desigual-rebranding-giuseppe-fioretti">RE-BRANDING X DESIGUAL</Link>
        </h2>
        <p className={styles.bodyCopy}>
          Go back to the origins of Desigual, when the word was invented, what it really meant. Being
          100% Desigual means going backwards.
        </p>
        <div className={styles.split}>
          <Image
            src={`${WP}/2025/07/laus-pencil-fio-02-copy.png`}
            alt="LAUS Award 2020"
            width={800}
            height={800}
            className={styles.image}
          />
          <Image
            src={`${WP}/2025/07/laus-pencil-fio-03.png`}
            alt="Wood Pencil 2020"
            width={800}
            height={800}
            className={styles.image}
          />
        </div>
        <Link href="/desigual-rebranding-giuseppe-fioretti" className={styles.full}>
          <Image
            src={`${WP}/2021/10/Desigual-HQ-Timelapse-1.gif`}
            alt="Desigual rebranding"
            width={1600}
            height={900}
            className={styles.image}
            unoptimized
          />
        </Link>
        <a
          className={styles.award}
          href="https://www.adg-fad.org/es/laus/proyecto/rebranding-para-desigual"
          target="_blank"
          rel="noopener noreferrer"
        >
          &gt; LAUS AWARD 2020 / WOOD PENCIL 2020
        </a>
      </div>
    </section>
  );
}
