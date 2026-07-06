import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Gallery } from '@/components/Gallery';
import { ProjectMediaBlock } from '@/components/ProjectMediaBlock';
import { CleanVideoEmbed } from '@/components/CleanVideoEmbed';
import { Badge } from '@/components/Badge';
import { CTA } from '@/components/CTA';
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
      </div>

      <div className="mx-auto max-w-3xl px-6 py-16 md:px-10 md:py-24">
        <Badge>
          {categoryLabel(project.category)} · {project.year}
        </Badge>
        <TypographySection as="h1" className={editorial.stack.labelToTitle}>
          {project.title}
        </TypographySection>
        <TypographyLead className={editorial.stack.titleToLead}>{project.subtitle}</TypographyLead>

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

      <div className="mx-auto max-w-3xl px-6 pb-16 md:px-10 md:pb-24">
        <div className="space-y-12 border-t border-ink/10 pt-16">
          <div>
            <TypographySection>Challenge</TypographySection>
            <TypographyBody className={editorial.stack.sectionToContent}>{project.challenge}</TypographyBody>
          </div>
          <div>
            <TypographySection>Solution</TypographySection>
            <TypographyBody className={editorial.stack.sectionToContent}>{project.solution}</TypographyBody>
          </div>
          <div>
            <TypographySection>Outcome</TypographySection>
            <TypographyBody className={editorial.stack.sectionToContent}>{project.outcome}</TypographyBody>
          </div>
        </div>

        {project.credits && (
          <TypographyMeta className={editorial.stack.block}>
            Credits: {project.credits}
          </TypographyMeta>
        )}

        <div className={`flex flex-wrap gap-4 ${editorial.stack.page}`}>
          <CTA href="/contact" label="Get in touch" />
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
