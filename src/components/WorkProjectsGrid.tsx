import { ProjectCard } from '@/components/ProjectCard';
import { getProject } from '@/data/projects';
import { workProjectLayout } from '@/data/work-projects';
import styles from './WorkProjectsGrid.module.css';

export function WorkProjectsGrid() {
  const hero = workProjectLayout.find((item) => item.slot === 'hero');
  const large = workProjectLayout.filter((item) => item.slot === 'large');
  const grid = workProjectLayout.filter((item) => item.slot === 'grid');

  const heroProject = hero ? getProject(hero.slug) : undefined;
  const largeProjects = large
    .map((item) => getProject(item.slug))
    .filter((project): project is NonNullable<typeof project> => Boolean(project));
  const gridProjects = grid
    .map((item) => getProject(item.slug))
    .filter((project): project is NonNullable<typeof project> => Boolean(project));

  return (
    <section className={styles.section} aria-label="Work portfolio">
      {heroProject && (
        <div className={styles.hero}>
          <ProjectCard project={heroProject} variant="hero" priority />
        </div>
      )}

      {largeProjects.length > 0 && (
        <div className={styles.stack}>
          {largeProjects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              variant="large"
              priority={index === 0}
            />
          ))}
        </div>
      )}

      {gridProjects.length > 0 && (
        <div className={styles.grid}>
          {gridProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} variant="grid" />
          ))}
        </div>
      )}
    </section>
  );
}
