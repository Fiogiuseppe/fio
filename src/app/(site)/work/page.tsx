import type { Metadata } from 'next';
import { SectionIntro } from '@/components/SectionIntro';
import { PageSection } from '@/components/PageSection';
import { ProjectCard } from '@/components/ProjectCard';
import { projects } from '@/data/projects';

export const metadata: Metadata = {
  title: 'Work — Giuseppe Fioretti',
  description: 'Selected branding, campaigns, art direction and creative direction work.',
};

export default function WorkPage() {
  return (
    <PageSection>
      <SectionIntro
        kicker="Portfolio"
        title="Work"
        description="Professional projects across branding, campaigns, art direction and personal creative universes. Not for sale — for inquiry."
      />
      <div className="mt-16 grid gap-16 md:grid-cols-2 md:gap-12">
        {projects.map((project, i) => (
          <ProjectCard key={project.slug} project={project} priority={i < 2} />
        ))}
      </div>
    </PageSection>
  );
}
