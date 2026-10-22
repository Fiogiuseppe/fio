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
    'Designer and art director from Naples, shaped in Barcelona, based in Copenhagen — brands, campaigns, teaching, and personal artistic practice.',
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
              Copenhagen. Those three cities are not just places I lived — they are chapters in how
              I learned to see.
            </TypographyBody>
            <TypographyBody>
              I work as a designer and art director. Day to day, that means building brands,
              shaping campaigns, and finding the image or sentence that makes a story feel true.
              For the past years I have been part of the creative team at LEGO, where I develop
              campaign and art-direction concepts around marketing innovation.
            </TypographyBody>
            <TypographyBody>
              Before that, I led brand design at Desigual — including a global identity redesign —
              and collaborated with Nike on cultural initiatives in Barcelona. Earlier, as a
              freelance art director and graphic designer, I worked across fashion, retail, and
              culture for more than a decade. Alongside client and studio work, I teach branding
              at BAU in Barcelona, and I continue independent projects: UREES, visual poems, and
              what I call Spiritual Design.
            </TypographyBody>
            <TypographyBody>
              Spiritual Design is my personal compass — alignment between purpose, emotion, and
              form. Design and art are the languages I use; what drives me is still the same: ideas
              that help people see, feel, and connect differently with the world around them.
            </TypographyBody>
            <TypographyBody>
              I do not chase work that only looks different. I am interested in work that helps
              people see differently. That is the practice I keep returning to.
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
