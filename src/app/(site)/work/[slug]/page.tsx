import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Gallery } from '@/components/Gallery';
import { ProjectMediaBlock } from '@/components/ProjectMediaBlock';
import { Badge } from '@/components/Badge';
import { CTA } from '@/components/CTA';
import { getProject } from '@/data/projects';
import { categoryLabel } from '@/lib/utils';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const { projects } = await import('@/data/projects');
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} — Giuseppe Fioretti`,
    description: project.description,
  };
}

export default async function WorkDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const isGif = project.heroImage.endsWith('.gif');
  const isSvg = project.heroImage.endsWith('.svg');

  return (
    <article>
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-ink/5 md:aspect-[21/9]">
        <Image
          src={project.heroImage}
          alt={project.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
          unoptimized={isGif || isSvg}
        />
      </div>

      <div className="mx-auto max-w-3xl px-6 py-16 md:px-10 md:py-24">
        <Badge>{categoryLabel(project.category)} · {project.year}</Badge>
        <h1 className="mt-4 font-display text-4xl leading-tight md:text-6xl">{project.title}</h1>
        <p className="mt-4 text-xl text-ink/70">{project.subtitle}</p>

        <dl className="mt-10 grid gap-4 border-t border-ink/10 pt-10 text-sm md:grid-cols-2">
          <div>
            <dt className="text-xs uppercase tracking-widest text-ink/50">Client</dt>
            <dd className="mt-1">{project.client}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-widest text-ink/50">Role</dt>
            <dd className="mt-1">{project.role}</dd>
          </div>
        </dl>

        <div className="mt-12 space-y-5 text-lg leading-relaxed text-ink/80">
          <p>{project.description}</p>
          {project.body?.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        {project.award && (
          <a
            href={project.award.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block text-sm uppercase tracking-widest text-blue no-underline hover:underline"
          >
            → {project.award.label}
          </a>
        )}
      </div>

      {project.media && project.media.length > 0 && (
        <div className="border-t border-ink/10 px-6 py-16 md:px-10 md:py-24">
          <div className="mx-auto max-w-5xl">
            <ProjectMediaBlock items={project.media} title={project.title} />
          </div>
        </div>
      )}

      <div className="mx-auto max-w-3xl px-6 pb-16 md:px-10 md:pb-24">
        <div className="space-y-10 border-t border-ink/10 pt-16">
          <div>
            <h2 className="font-display text-2xl">Challenge</h2>
            <p className="mt-3 text-ink/70">{project.challenge}</p>
          </div>
          <div>
            <h2 className="font-display text-2xl">Solution</h2>
            <p className="mt-3 text-ink/70">{project.solution}</p>
          </div>
          <div>
            <h2 className="font-display text-2xl">Outcome</h2>
            <p className="mt-3 text-ink/70">{project.outcome}</p>
          </div>
        </div>

        {project.credits && (
          <p className="mt-10 text-sm text-ink/50">Credits: {project.credits}</p>
        )}

        <div className="mt-16 flex flex-wrap gap-4">
          <CTA href="/contact" label="Start a conversation" />
          <CTA href="/work" label="All work" variant="ghost" />
        </div>
      </div>

      {project.gallery.length > 0 && !project.media && (
        <div className="border-t border-ink/10 px-6 py-16 md:px-10 md:py-24">
          <div className="mx-auto max-w-7xl">
            <Gallery images={project.gallery} alt={project.title} />
          </div>
        </div>
      )}
    </article>
  );
}
