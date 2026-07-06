import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/lib/types';
import { categoryLabel } from '@/lib/utils';
import { Badge } from './Badge';

type ProjectCardProps = {
  project: Project;
  priority?: boolean;
};

export function ProjectCard({ project, priority }: ProjectCardProps) {
  const isGif = project.heroImage.endsWith('.gif');
  const isSvg = project.heroImage.endsWith('.svg');

  return (
    <Link href={`/work/${project.slug}`} className="group block no-underline">
      <article>
        <div className="relative aspect-[4/3] overflow-hidden bg-ink/5">
          <Image
            src={project.heroImage}
            alt={project.title}
            fill
            className="object-cover transition duration-700 group-hover:scale-[1.03]"
            sizes="(max-width:768px) 100vw, 50vw"
            priority={priority}
            unoptimized={isGif || isSvg}
          />
        </div>
        <div className="mt-5">
          <Badge>{categoryLabel(project.category)} · {project.year}</Badge>
          <h3 className="mt-2 font-display text-2xl text-ink group-hover:text-blue md:text-3xl">
            {project.title}
          </h3>
          <p className="mt-2 text-ink/60">{project.subtitle}</p>
        </div>
      </article>
    </Link>
  );
}
