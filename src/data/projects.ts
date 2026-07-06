import type { Project } from '@/lib/types';
import { WP } from '@/lib/utils';

export const projects: Project[] = [
  {
    slug: 'desigual-rebranding',
    title: 'Desigual Rebranding',
    subtitle: 'Go back to the origins of what it meant to be 100% Desigual',
    category: 'rebranding',
    year: 2021,
    client: 'Desigual',
    role: 'Creative Direction',
    heroImage: `${WP}/2021/10/Desigual-HQ-Timelapse-1.gif`,
    gallery: [
      `${WP}/2021/10/Desigual-HQ-Timelapse-1.gif`,
      `${WP}/2022/03/DESIGUAL_WEB_ASSETS_HOME_HEADER_PANORAMIC.gif`,
    ],
    description:
      'A strategic return to the soul of Desigual — colour, optimism and Mediterranean irreverence — translated into a living visual system.',
    challenge:
      'Reconnect a global fashion brand with its founding spirit without losing contemporary relevance.',
    solution:
      'Led creative direction across identity, campaign language and internal culture — building a system that could scale across markets.',
    outcome:
      'A refreshed brand narrative adopted across HQ, retail and digital — anchoring Desigual in authenticity.',
    credits: 'Desigual Creative Team',
    featured: true,
  },
  {
    slug: 'desigual-sneakers-campaign',
    title: 'Desigual Sneakers Campaign',
    subtitle: 'First sneakers collection with Olimpic.tv',
    category: 'campaign',
    year: 2022,
    client: 'Desigual × Olimpic.tv',
    role: 'Art Direction',
    heroImage: `${WP}/2022/03/DESIGUAL_WEB_ASSETS_HOME_HEADER_PANORAMIC.gif`,
    gallery: [`${WP}/2022/03/DESIGUAL_WEB_ASSETS_HOME_HEADER_PANORAMIC.gif`],
    description:
      'Launch campaign for Desigual\'s first sneakers collection — bold, playful and unmistakably Desigual.',
    challenge: 'Introduce a new product category with a fresh visual language.',
    solution: 'Panoramic campaign assets and motion-led storytelling across web and social.',
    outcome: 'A high-impact launch that positioned sneakers as a natural extension of the brand.',
    featured: true,
  },
  {
    slug: 'lego-creative-direction',
    title: 'LEGO Creative Direction',
    subtitle: 'Play, imagination and visual storytelling at scale',
    category: 'creative-direction',
    year: 2023,
    client: 'LEGO',
    role: 'Creative Direction',
    heroImage: `${WP}/2025/07/Giuseppe_Fioretti.png`,
    gallery: [`${WP}/2025/07/Giuseppe_Fioretti.png`],
    description:
      'Creative direction work for one of the world\'s most beloved brands — where play meets purpose.',
    challenge: 'Balance global brand consistency with creative experimentation.',
    solution: 'Visual systems and campaign thinking rooted in imagination and cultural relevance.',
    outcome: 'Work that honours LEGO\'s legacy while pushing creative boundaries.',
    featured: true,
  },
  {
    slug: 'urees',
    title: 'UREES',
    subtitle: 'One-of-one upcycled wearable art',
    category: 'personal-project',
    year: 2020,
    client: 'UREES',
    role: 'Founder, Creative Director',
    heroImage: `${WP}/2024/01/20230907_UREES02632.jpg`,
    gallery: [
      `${WP}/2024/01/20230907_UREES02632.jpg`,
      `${WP}/2023/03/VISCERAL-POETRY-12-scaled.jpg`,
    ],
    description:
      'UREES is a personal universe — upcycled garments transformed into one-of-one wearable pieces. Each piece carries memory, craft and intention.',
    challenge: 'Build a brand that sits between fashion, art and sustainability without compromise.',
    solution:
      'A philosophy-first approach: every garment is unique, every process is visible, every piece tells a story.',
    outcome:
      'A growing collector community and a distinct visual identity that lives in Work and Shop.',
    credits: 'Giuseppe Fioretti',
    featured: true,
  },
  {
    slug: 'think-possible',
    title: 'Think Possible',
    subtitle: 'Branding and visual experimentation',
    category: 'branding',
    year: 2023,
    client: 'Personal',
    role: 'Brand Identity',
    heroImage: `${WP}/2024/01/20230907_UREES02632.jpg`,
    gallery: [`${WP}/2024/01/20230907_UREES02632.jpg`],
    description: 'A visual exploration of optimism, colour and creative possibility.',
    challenge: 'Create a flexible identity for an open-ended creative platform.',
    solution: 'Modular typography, bold colour and editorial layouts.',
    outcome: 'A living brand system ready for future projects and collaborations.',
  },
  {
    slug: 'spiritual-design',
    title: 'Spiritual Design',
    subtitle: 'When design serves something greater',
    category: 'creative-direction',
    year: 2024,
    client: 'Personal',
    role: 'Concept & Direction',
    heroImage: '/images/spiritual-design-def.svg',
    gallery: ['/images/spiritual-design-def.svg'],
    description:
      'I do not design to impress — I design to align. Spiritual Design is the practice of creating with awareness.',
    challenge: 'Articulate a philosophy that bridges design, art and inner life.',
    solution: 'Visual language, writing and spatial thinking as one coherent expression.',
    outcome: 'A framework that informs all of Giuseppe\'s creative work.',
    featured: true,
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects() {
  return projects.filter((p) => p.featured);
}
