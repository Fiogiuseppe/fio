import Image from 'next/image';
import Link from 'next/link';
import { FEATURED_PROJECTS } from '@/data/site';
import styles from './FeaturedProjects.module.css';

export function FeaturedProjects() {
  return (
    <section className={styles.section} aria-label="Featured projects">
      {FEATURED_PROJECTS.map((project, index) => (
        <article className={styles.block} key={project.href}>
          {index === 0 && 'kicker' in project && (
            <>
              <p className={styles.kicker}>{project.kicker}</p>
              <p className={styles.dash}>{project.dash}</p>
            </>
          )}
          <h2 className={styles.title}>
            <Link href={project.href}>{project.title}</Link>
          </h2>
          <p className={styles.description}>
            {project.description}
            {'links' in project &&
              project.links?.map((link) => (
                <span key={link.href}>
                  {' '}
                  <a href={link.href} target="_blank" rel="noopener noreferrer">
                    {link.label}
                  </a>
                </span>
              ))}
          </p>
          <Link className={styles.media} href={project.href}>
            <Image
              className={styles.image}
              src={project.image}
              alt={project.imageAlt}
              width={1600}
              height={900}
              unoptimized={project.image.endsWith('.gif')}
            />
          </Link>
          {'award' in project && project.award && (
            <a className={styles.award} href={project.awardHref} target="_blank" rel="noopener noreferrer">
              {project.award}
            </a>
          )}
        </article>
      ))}
    </section>
  );
}
