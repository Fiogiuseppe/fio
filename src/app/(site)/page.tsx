import { Hero } from '@/components/Hero';
import { ProjectCard } from '@/components/ProjectCard';
import { JournalCard } from '@/components/JournalCard';
import { SectionIntro } from '@/components/SectionIntro';
import { CTA } from '@/components/CTA';
import { getFeaturedProjects } from '@/data/projects';
import { articles } from '@/data/articles';

export default function HomePage() {
  const featured = getFeaturedProjects().slice(0, 3);
  const latestArticle = articles[0];

  return (
    <>
      <Hero
        title="A creative universe"
        subtitle="Designer, art director, artist and founder of UREES — building brands, campaigns and visual worlds from Copenhagen."
        paths={[
          {
            href: '/work',
            title: 'Work',
            description: 'Explore selected branding, campaign and art direction work.',
          },
          {
            href: '/services',
            title: 'Services',
            description: 'Build a brand, campaign or visual system with Giuseppe.',
          },
          {
            href: '/shop',
            title: 'Shop',
            description: 'Collect original artworks, paintings and UREES pieces.',
          },
        ]}
      />

      <section className="border-t border-ink/10 px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-7xl">
          <SectionIntro
            kicker="Selected work"
            title="Projects that shaped the vision"
            description="From global rebrands to personal universes — each project carries intention."
          />
          <div className="mt-14 grid gap-12 md:grid-cols-3 md:gap-8">
            {featured.map((project, i) => (
              <ProjectCard key={project.slug} project={project} priority={i === 0} />
            ))}
          </div>
          <div className="mt-12">
            <CTA href="/work" label="View all work" variant="ghost" />
          </div>
        </div>
      </section>

      {latestArticle && (
        <section className="border-t border-ink/10 bg-cream-soft px-6 py-20 md:px-10 md:py-28">
          <div className="mx-auto max-w-7xl">
            <SectionIntro kicker="Journal" title="Thoughts & reflections" />
            <div className="mt-14 max-w-2xl">
              <JournalCard article={latestArticle} />
            </div>
            <div className="mt-12">
              <CTA href="/journal" label="Read the journal" variant="ghost" />
            </div>
          </div>
        </section>
      )}

      <section className="border-t border-ink/10 px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-7xl text-center">
          <SectionIntro
            align="center"
            title="Let's build something together"
            description="Whether it's a brand, a campaign or a one-of-one piece — the conversation starts here."
          />
          <div className="mt-10">
            <CTA href="/contact" label="Get in touch" />
          </div>
        </div>
      </section>
    </>
  );
}
