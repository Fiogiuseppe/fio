import type { Service } from '@/lib/types';

export const services: Service[] = [
  {
    slug: 'brand-identity',
    title: 'Brand Identity',
    description:
      'Build a distinctive visual and verbal identity that reflects who you are — and who you are becoming.',
    includes: [
      'Brand strategy & positioning',
      'Logo & visual identity system',
      'Typography, colour & art direction',
      'Brand guidelines',
    ],
    forWho: 'Founders, studios and brands ready to define or refine their visual soul.',
    ctaLabel: 'Start a project',
  },
  {
    slug: 'rebranding',
    title: 'Rebranding',
    description:
      'Return to your origins — or evolve into something new — with clarity, courage and craft.',
    includes: [
      'Brand audit & discovery',
      'Identity refresh or full rebrand',
      'Campaign & touchpoint rollout',
      'Internal alignment workshops',
    ],
    forWho: 'Established brands seeking relevance without losing their essence.',
    ctaLabel: 'Let\'s build something together',
  },
  {
    slug: 'creative-direction',
    title: 'Creative Direction',
    description:
      'Lead the creative vision across campaigns, products and culture — from concept to execution.',
    includes: [
      'Creative strategy',
      'Art direction & visual language',
      'Team leadership & creative reviews',
      'Cross-channel consistency',
    ],
    forWho: 'Companies and agencies needing a senior creative partner.',
    ctaLabel: 'Contact me',
  },
  {
    slug: 'art-direction',
    title: 'Art Direction',
    description:
      'Shape the visual narrative of your brand through photography, motion, layout and spatial thinking.',
    includes: [
      'Campaign art direction',
      'Photography & motion briefs',
      'Editorial & digital layouts',
      'Production oversight',
    ],
    forWho: 'Fashion, lifestyle and culture brands with a story to tell.',
    ctaLabel: 'Start a project',
  },
  {
    slug: 'campaign-design',
    title: 'Campaign Design',
    description:
      'Launch campaigns that feel cinematic, emotional and unmistakably yours.',
    includes: [
      'Campaign concept & narrative',
      'Key visuals & asset systems',
      'Social, digital & OOH adaptation',
      'Launch coordination',
    ],
    forWho: 'Brands launching products, collections or cultural moments.',
    ctaLabel: 'Let\'s build something together',
  },
  {
    slug: 'visual-systems',
    title: 'Visual Systems',
    description:
      'Scalable design systems that keep your brand coherent across every touchpoint.',
    includes: [
      'Design system architecture',
      'Component libraries',
      'Documentation & governance',
      'Digital & print application',
    ],
    forWho: 'Growing teams that need consistency without creative stagnation.',
    ctaLabel: 'Contact me',
  },
  {
    slug: 'brand-consulting',
    title: 'Brand Consulting',
    description:
      'Strategic guidance on brand positioning, creative culture and long-term visual direction.',
    includes: [
      'Brand workshops',
      'Competitive & cultural analysis',
      'Creative roadmap',
      'Ongoing advisory',
    ],
    forWho: 'Leaders navigating growth, pivot or creative transformation.',
    ctaLabel: 'Start a project',
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
