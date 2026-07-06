import type { Project } from '@/lib/types';
import { WP } from '@/lib/utils';

export const projects: Project[] = [
  {
    slug: 'desigual-rebranding',
    title: 'Re-branding x Desigual',
    subtitle: 'Go back to the origins of Desigual — what it really meant to be 100% Desigual',
    category: 'rebranding',
    year: 2019,
    client: 'Desigual',
    role: 'Logo & Visual Identity',
    heroImage: `${WP}/2021/10/Desigual-HQ-Timelapse-1.gif`,
    gallery: [
      `${WP}/2021/05/Desigual_logo-8_A.gif`,
      `${WP}/2025/07/laus-pencil-fio-02-copy.png`,
      `${WP}/2025/07/laus-pencil-fio-03.png`,
    ],
    description:
      'Logo and visual identity for Desigual — a return to the soul of the brand, launched across campaign, communications and product seasons from 2019 to 2020.',
    body: [
      '2019 — Logo and visual identity for @Desigual.',
      'The logo with the visual identity in 2019. We used it for the launch of the logo campaign, in all communications and in product season from 2019 to 2020.',
      'Some products created together with the incredible product department of @Desigual led by Clara Delmuns.',
    ],
    media: [
      { type: 'gif', src: `${WP}/2021/05/Desigual_logo-8_A.gif`, alt: 'Desigual logo animation', fullWidth: true },
      { type: 'image', src: `${WP}/2025/07/laus-pencil-fio-02-copy.png`, alt: 'LAUS Award 2020' },
      { type: 'image', src: `${WP}/2025/07/laus-pencil-fio-03.png`, alt: 'Wood Pencil 2020' },
      { type: 'gif', src: `${WP}/2021/10/Desigual-HQ-Timelapse-1.gif`, alt: 'Desigual HQ timelapse', fullWidth: true },
      { type: 'image', src: `${WP}/2021/05/19WWTKXI_2000_B-scaled.jpg`, alt: 'Desigual product' },
      { type: 'image', src: `${WP}/2021/05/19WSHP01_2000_X-copia.jpg`, alt: 'Desigual product' },
    ],
    challenge:
      'Reconnect a global fashion brand with its founding spirit without losing contemporary relevance.',
    solution:
      'A new logo and visual identity system — launched as a living campaign across HQ, retail and product.',
    outcome:
      'LAUS Award 2020 / Wood Pencil 2020. A refreshed brand narrative adopted across markets.',
    award: {
      label: 'LAUS Award 2020 / Wood Pencil 2020',
      href: 'https://www.adg-fad.org/es/laus/proyecto/rebranding-para-desigual',
    },
    credits: 'Desigual Creative Team · Clara Delmuns',
    featured: true,
  },
  {
    slug: 'desigual-sneakers-campaign',
    title: 'First Sneakers Campaign x Desigual',
    subtitle: 'Sneakers collection campaign in collaboration with Olimpic.tv',
    category: 'campaign',
    year: 2022,
    client: 'Desigual × Olimpic.tv',
    role: 'Art Direction',
    heroImage: `${WP}/2022/03/DESIGUAL_WEB_ASSETS_HOME_HEADER_PANORAMIC.gif`,
    gallery: [
      `${WP}/2022/03/DESIGUAL_MASTER_1X1_LOGO-Compressed-with-FlexClip-Compressed-with-FlexClip-_1_.gif`,
      `${WP}/2022/03/DESIGUAL_SOCIAL_CONTENT_NY_CLEAN_H264_50MB-Compressed-with-FlexClip.gif`,
    ],
    description:
      'Launch campaign for Desigual\'s first sneakers collection — bold, playful and unmistakably Desigual.',
    body: [
      'Sneakers collection campaign for @desigual in collaboration with @olimpic.tv.',
      'Panoramic web assets, social content and motion-led storytelling across cities and channels.',
    ],
    media: [
      {
        type: 'gif',
        src: `${WP}/2022/03/DESIGUAL_WEB_ASSETS_HOME_HEADER_PANORAMIC.gif`,
        alt: 'Desigual sneakers campaign panoramic',
        fullWidth: true,
      },
      {
        type: 'gif',
        src: `${WP}/2022/03/DESIGUAL_MASTER_1X1_LOGO-Compressed-with-FlexClip-Compressed-with-FlexClip-_1_.gif`,
        alt: 'Desigual sneakers logo motion',
        fullWidth: true,
      },
      {
        type: 'gif',
        src: `${WP}/2022/03/DESIGUAL_SOCIAL_CONTENT_NY_CLEAN_H264_50MB-Compressed-with-FlexClip.gif`,
        alt: 'Desigual social content New York',
        fullWidth: true,
      },
      {
        type: 'gif',
        src: `${WP}/2022/03/DESIGUAL_SOCIAL_CONTENT_PARIS_CLEAN_H264-Compressed-with-FlexClip_1.gif`,
        alt: 'Desigual social content Paris',
        fullWidth: true,
      },
      {
        type: 'gif',
        src: `${WP}/2022/03/DESIGUAL_SOCIAL_CONTENT_PISA_PRORES.gif`,
        alt: 'Desigual social content Pisa',
        fullWidth: true,
      },
    ],
    challenge: 'Introduce a new product category with a fresh visual language.',
    solution: 'Panoramic campaign assets and motion-led storytelling across web and social.',
    outcome: 'A high-impact launch that positioned sneakers as a natural extension of the brand.',
    featured: true,
  },
  {
    slug: 'urees',
    title: 'Branding x UREES',
    subtitle: 'Fusing artistry and sustainability in fashion',
    category: 'personal-project',
    year: 2020,
    client: 'UREES',
    role: 'Founder, Creative Director',
    heroImage: `${WP}/2024/01/20230907_UREES02632.jpg`,
    gallery: [
      `${WP}/2024/01/20230907_UREES02632.jpg`,
      `${WP}/2024/01/20230907_UREES02606-scaled.jpg`,
    ],
    description:
      'The UREES upcycling project — one-of-one wearable pieces where artistry meets sustainability.',
    body: [
      'The Urees upcycling project: Fusing artistry and sustainability in fashion @urees__',
      'Each garment is unique. Each process is visible. Each piece tells a story.',
    ],
    media: [
      { type: 'image', src: `${WP}/2024/01/20230907_UREES02632.jpg`, alt: 'UREES piece' },
      { type: 'image', src: `${WP}/2024/01/20230907_UREES02606-scaled.jpg`, alt: 'UREES piece' },
    ],
    challenge: 'Build a brand that sits between fashion, art and sustainability without compromise.',
    solution:
      'A philosophy-first approach: every garment is unique, every process is visible, every piece tells a story.',
    outcome:
      'A growing collector community and a distinct visual identity that lives in Work and Shop.',
    credits: 'Giuseppe Fioretti',
    featured: true,
  },
  {
    slug: 'spiritual-design',
    title: 'Spiritual Design',
    subtitle: 'When design serves something greater, it becomes sacred',
    category: 'creative-direction',
    year: 2024,
    client: 'Personal',
    role: 'Concept & Direction',
    heroImage: '/images/spiritual-design-def.svg',
    gallery: ['/images/spiritual-design-def.svg'],
    description:
      'I do not design to impress — I design to align. Spiritual Design is the practice of creating with awareness.',
    body: [
      'I do not design to impress, I design to align. To align what I feel with what the world needs.',
      'Design becomes sacred when we create with awareness. That is Spiritual Design.',
    ],
    challenge: 'Articulate a philosophy that bridges design, art and inner life.',
    solution: 'Visual language, writing and spatial thinking as one coherent expression.',
    outcome: 'A framework that informs all of Giuseppe\'s creative work.',
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
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects() {
  return projects.filter((p) => p.featured);
}
