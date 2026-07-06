import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Gallery } from '@/components/Gallery';
import { ProjectMediaBlock } from '@/components/ProjectMediaBlock';
import { CleanVideoEmbed } from '@/components/CleanVideoEmbed';
import { Badge } from '@/components/Badge';
import {
  TypographyBody,
  TypographyButton,
  TypographySection,
  TypographyLabel,
  TypographyLead,
  TypographyMeta,
} from '@/components/typography';
import { editorial } from '@/lib/typography';
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
        {project.heroVideo ? (
          <CleanVideoEmbed
            youtubeId={project.heroVideo.youtubeId}
            title={project.title}
            poster={project.heroVideo.poster ?? project.heroImage}
            mode="cinema"
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <Image
            src={project.heroImage}
            alt={project.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
            unoptimized={isGif || isSvg}
          />
        )}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex flex-col items-start gap-2 bg-gradient-to-t from-ink/70 via-ink/30 to-transparent px-6 pb-8 pt-24 text-page md:gap-2.5 md:px-10 md:pb-10 md:pt-32">
          <Badge className="text-page/80">{categoryLabel(project.category)} · {project.year}</Badge>
          <TypographySection as="h1" className="m-0 text-page">
            {project.title}
          </TypographySection>
          <TypographyLead className="m-0 max-w-2xl text-page/85">{project.subtitle}</TypographyLead>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 py-16 md:px-10 md:py-24">
        <dl className={`grid gap-6 border-t border-ink/10 pt-10 md:grid-cols-2 ${editorial.stack.block}`}>
          <div>
            <TypographyLabel as="dt">Client</TypographyLabel>
            <TypographyBody as="dd" measure={false} className={editorial.stack.labelToTitle}>
              {project.client}
            </TypographyBody>
          </div>
          <div>
            <TypographyLabel as="dt">Role</TypographyLabel>
            <TypographyBody as="dd" measure={false} className={editorial.stack.labelToTitle}>
              {project.role}
            </TypographyBody>
          </div>
        </dl>

        <div className={`${editorial.stack.block} space-y-6`}>
          <TypographyBody>{project.description}</TypographyBody>
          {project.body?.map((paragraph) => (
            <TypographyBody key={paragraph}>{paragraph}</TypographyBody>
          ))}
        </div>

        {project.award && (
          <a
            href={project.award.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`${editorial.stack.block} inline-block text-blue no-underline hover:underline`}
          >
            <TypographyButton as="span">→ {project.award.label}</TypographyButton>
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

      {project.credits && (
        <div className="mx-auto max-w-3xl px-6 pb-16 md:px-10 md:pb-24">
          <TypographyMeta className="border-t border-ink/10 pt-10">
            Credits: {project.credits}
          </TypographyMeta>
        </div>
      )}

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
