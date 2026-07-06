import type { Metadata } from 'next';
import { SectionIntro } from '@/components/SectionIntro';
import { ProjectCard } from '@/components/ProjectCard';
import { projects } from '@/data/projects';

export const metadata: Metadata = {
  title: 'Work — Giuseppe Fioretti',
  description: 'Selected branding, campaigns, art direction and creative direction work.',
};

export default function WorkPage() {
  return (
    <div className="px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionIntro
          kicker="Portfolio"
          title="Work"
          description="Professional projects across branding, campaigns, art direction and personal creative universes."
        />
        <div className="mt-16 grid gap-16 md:grid-cols-2 md:gap-12">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} priority={i < 2} />
          ))}
        </div>
      </div>
    </div>
  );
}
