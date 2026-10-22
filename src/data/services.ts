import type { Service } from '@/lib/types';

export const services: Service[] = [
  {
    slug: 'brand-identity',
    title: 'Brand Identity',
    description:
      'I develop brand identities, from positioning and the first sketches to a complete visual system.',
    includes: [
      'Brand strategy & positioning',
      'Logo & visual identity system',
      'Typography, colour & art direction',
      'Brand guidelines',
    ],
    forWho: 'Founders, studios and brands creating or updating an identity.',
    ctaLabel: 'Start a project',
  },
  {
    slug: 'rebranding',
    title: 'Rebranding',
    description:
      'I help brands decide what to keep, what to change and how to bring a new identity into use.',
    includes: [
      'Brand audit & discovery',
      'Identity refresh or full rebrand',
      'Campaign & touchpoint rollout',
      'Internal alignment workshops',
    ],
    forWho: 'Established brands rethinking their identity.',
    ctaLabel: 'Let\'s build something together',
  },
  {
    slug: 'creative-direction',
    title: 'Creative Direction',
    description:
      'I guide creative teams from the initial concept through design and production.',
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
      'I develop the look of a project through photography, film, typography and layout.',
    includes: [
      'Campaign art direction',
      'Photography & motion briefs',
      'Editorial & digital layouts',
      'Production oversight',
    ],
    forWho: 'Fashion, lifestyle and culture brands planning a visual project.',
    ctaLabel: 'Start a project',
  },
  {
    slug: 'campaign-design',
    title: 'Campaign Design',
    description:
      'I turn campaign ideas into key visuals and materials for digital, print and outdoor use.',
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
      'I build design systems that teams can use across digital and printed materials.',
    includes: [
      'Design system architecture',
      'Component libraries',
      'Documentation & governance',
      'Digital & print application',
    ],
    forWho: 'Teams working with a shared identity across different formats.',
    ctaLabel: 'Contact me',
  },
  {
    slug: 'brand-consulting',
    title: 'Brand Consulting',
    description:
      'I review brand positioning and visual direction, then work with teams on the next steps.',
    includes: [
      'Brand workshops',
      'Competitive & cultural analysis',
      'Creative roadmap',
      'Ongoing advisory',
    ],
    forWho: 'Founders and creative teams deciding where to take a brand.',
    ctaLabel: 'Start a project',
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
