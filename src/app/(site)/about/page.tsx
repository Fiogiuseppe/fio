import type { Metadata } from 'next';
import { AboutPortrait } from '@/components/AboutPortrait';
import { SectionIntro } from '@/components/SectionIntro';
import { PageSection } from '@/components/PageSection';
import { CTA } from '@/components/CTA';
import { TypographyBody } from '@/components/typography';
import { editorial } from '@/lib/typography';

export const metadata: Metadata = {
  title: 'About | Giuseppe Fioretti',
  description:
    'Giuseppe Fioretti is a designer and art director from Naples, based in Copenhagen. His work includes LEGO, Desigual, Nike and independent art projects.',
};

export default function AboutPage() {
  return (
    <PageSection>
      <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionIntro asHero kicker="About" title="I'm Giuseppe Fioretti." />
          <div className={`${editorial.stack.leadToContent} space-y-6`}>
            <TypographyBody>
              I was born in Naples, lived in Barcelona for more than ten years, and am now based
              in Copenhagen.
            </TypographyBody>
            <TypographyBody>
              I work on brand identities and campaigns, from the first idea to the final image.
              At LEGO, I develop campaign and art-direction concepts as part of the creative team.
            </TypographyBody>
            <TypographyBody>
              Before LEGO, I was Head of Brand Design at Desigual, where I worked on its global
              visual identity. I also collaborated with Nike on cultural initiatives in Barcelona
              and spent more than a decade working independently across fashion, retail and culture.
              Alongside this work, I teach branding at BAU in Barcelona and develop my own
              projects, including UREES and Visceral Poems.
            </TypographyBody>
            <TypographyBody>
              I call my independent approach Spiritual Design. It connects the purpose of a
              project with how it looks and feels.
            </TypographyBody>
            <TypographyBody>
              I want my work to give people something to notice, think about or feel.
            </TypographyBody>
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
