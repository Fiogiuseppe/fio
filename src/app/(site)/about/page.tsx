import Image from 'next/image';
import type { Metadata } from 'next';
import { SectionIntro } from '@/components/SectionIntro';
import { PageSection } from '@/components/PageSection';
import { CTA } from '@/components/CTA';
import { TypographyBody } from '@/components/typography';
import { editorial } from '@/lib/typography';
import { WP } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'About — Giuseppe Fioretti',
  description:
    'Italian designer and art director based in Copenhagen — branding, campaigns, art and UREES.',
};

export default function AboutPage() {
  return (
    <PageSection>
      <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionIntro
            asHero
            kicker="About"
            title="Giuseppe Fioretti"
            description="Designer, art director, artist and creative thinker — building worlds where design, art and meaning meet."
          />
          <div className={`${editorial.stack.leadToContent} space-y-6`}>
            <TypographyBody>
              Italian by origin, Copenhagen by choice. Giuseppe works at the intersection of
              branding, campaigns and visual storytelling — with experience at LEGO, Desigual and
              beyond.
            </TypographyBody>
            <TypographyBody>
              His practice is rooted in <em>Spiritual Design</em> — the belief that design should
              align inner truth with outer form. Not decoration. Alignment.
            </TypographyBody>
            <TypographyBody>
              Beyond client work, Giuseppe builds personal universes: <strong>UREES</strong> (one-of-one
              upcycled wearable art) and <strong>Visceral Poems</strong> (poetic artworks where
              language becomes physical).
            </TypographyBody>
            <TypographyBody>
              He designs brands, directs campaigns, paints, writes and collects fragments of culture
              — always with intention, never with noise.
            </TypographyBody>
          </div>
          <div className={`flex flex-wrap gap-4 ${editorial.stack.block}`}>
            <CTA href="/work" label="View work" variant="secondary" />
            <CTA href="/contact" label="Get in touch" />
          </div>
        </div>

        <div className="relative aspect-[3/4] overflow-hidden bg-ink/5 lg:aspect-auto lg:min-h-[600px]">
          <Image
            src={`${WP}/2025/07/Giuseppe_Fioretti.png`}
            alt="Giuseppe Fioretti"
            fill
            className="object-cover"
            sizes="(max-width:1024px) 100vw, 50vw"
          />
        </div>
      </div>
    </PageSection>
  );
}
