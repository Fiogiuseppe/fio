import type { Metadata } from 'next';
import { AboutPortrait } from '@/components/AboutPortrait';
import { SectionIntro } from '@/components/SectionIntro';
import { PageSection } from '@/components/PageSection';
import { CTA } from '@/components/CTA';
import { TypographyBody } from '@/components/typography';
import { editorial } from '@/lib/typography';

export const metadata: Metadata = {
  title: 'About — Giuseppe Fioretti',
  description:
    'Designer and creative director based in Copenhagen — LEGO, Desigual, Nike, and work that helps people see differently.',
};

export default function AboutPage() {
  return (
    <PageSection>
      <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionIntro asHero kicker="About" title="I'm Giuseppe Fioretti." />
          <div className={`${editorial.stack.leadToContent} space-y-6`}>
            <TypographyBody>
              I was born in Naples, spent more than a decade in Barcelona, and now live in
              Copenhagen, where I&apos;m part of the creative team at LEGO.
            </TypographyBody>
            <TypographyBody>
              Over the last 15 years, I&apos;ve had the opportunity to work with brands such as LEGO,
              Desigual and Nike, lead international creative teams, teach branding at university,
              launch my own fashion label, and develop independent artistic projects. Each experience
              has shaped the way I think, create and collaborate.
            </TypographyBody>
            <TypographyBody>
              But what has always driven me goes beyond design itself.
            </TypographyBody>
            <TypographyBody>
              I&apos;m interested in ideas that can change the way people see, feel and connect with
              the world around them.
            </TypographyBody>
            <TypographyBody>
              Design and art simply became the language through which I explore those ideas.
            </TypographyBody>
            <TypographyBody>
              Over time, this way of thinking evolved into what I call{' '}
              <strong>Spiritual Design</strong> — a personal approach that seeks alignment between
              purpose, emotion and form. For me, design is not only about what we create, but also why
              we create it and how it resonates with people.
            </TypographyBody>
            <TypographyBody>
              Whether I&apos;m building a brand, creating a campaign, writing a visual poem or
              experimenting with technology, I&apos;m always searching for work that feels honest,
              meaningful and deeply human.
            </TypographyBody>
            <TypographyBody>
              I don&apos;t think creativity is about making things look different.
            </TypographyBody>
            <TypographyBody>
              I believe its real value lies in helping people see things differently.
            </TypographyBody>
            <TypographyBody>That&apos;s the work I&apos;m most interested in.</TypographyBody>
          </div>
          <div className={editorial.stack.leadToContent}>
            <CTA href="/about/career-timeline" label="Career timeline" variant="ghost" />
          </div>
          <div className={`flex flex-wrap gap-4 ${editorial.stack.block}`}>
            <CTA href="/work" label="View work" variant="secondary" />
            <CTA href="/contact" label="Get in touch" />
          </div>
        </div>

        <AboutPortrait />
      </div>
    </PageSection>
  );
}
