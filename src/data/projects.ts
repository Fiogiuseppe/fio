import type { Project, WorkCategory } from '@/lib/types';
import { WP } from '@/lib/utils';
import { LEGO_PLAYMAKER_VIDEO_ID } from '@/lib/youtube';

const LEGO_PLAYMAKER_HERO =
  'https://www.lego.com/cdn/cs/set/assets/bltcc39700f3dea9f86/00-OG-WPD_CAMPAIGNPAGE-OG-01.jpg';

function archiveProject(opts: {
  slug: string;
  title: string;
  subtitle: string;
  category: WorkCategory;
  year: number;
  client: string;
  role: string;
  heroImage: string;
  description: string;
}): Project {
  return {
    ...opts,
    gallery: [opts.heroImage],
  };
}

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
    featured: true,
  },
  {
    slug: 'lego-playmaker-jason-momoa',
    title: 'The Play Maker x LEGO',
    subtitle: 'Never Stop Playing — Jason Momoa as LEGO Playmaker for World Play Day',
    category: 'campaign',
    year: 2026,
    client: 'LEGO',
    role: 'Design Lead',
    heroImage: LEGO_PLAYMAKER_HERO,
    heroVideo: { youtubeId: LEGO_PLAYMAKER_VIDEO_ID, poster: LEGO_PLAYMAKER_HERO },
    gallery: [LEGO_PLAYMAKER_HERO],
    description:
      'Global Never Stop Playing campaign starring Jason Momoa — a comedy-led PSA to reverse the family play deficit, culminating in World Play Day.',
    body: [
      'Design Lead at Our LEGO Agency on The Play Maker — LEGO\'s first brand campaign built entirely through a comedy lens.',
      'Jason Momoa crashes a brick-built boardroom to remind the world why play matters. Created with Chaos x Magic, directed by Rhys Thomas.',
    ],
    credits: 'Our LEGO Agency · Chaos x Magic · Stink UK',
    featured: true,
  },
  archiveProject({
    slug: 'the-magazine',
    title: 'The Magazine',
    subtitle: 'Editorial layout and visual storytelling',
    category: 'art-direction',
    year: 2021,
    client: 'Personal',
    role: 'Art Direction & Design',
    heroImage: `${WP}/2021/05/Giuseppe_Fioretti_The_Magazine.jpeg`,
    description: 'Editorial design exploring magazine layout, typography and visual narrative.',
  }),
  archiveProject({
    slug: 'marianna-carolina-sale',
    title: 'Marianna Carolina Sale',
    subtitle: 'Editorial and visual project',
    category: 'art-direction',
    year: 2021,
    client: 'Marianna Carolina Sale',
    role: 'Creative Direction',
    heroImage: `${WP}/2021/05/mariannacarolinasale.gif`,
    description: 'Editorial and visual project for Marianna Carolina Sale.',
  }),
  archiveProject({
    slug: 'dmoors',
    title: "D'MOORS",
    subtitle: 'Brand identity and visual system',
    category: 'branding',
    year: 2021,
    client: "D'MOORS",
    role: 'Brand Design',
    heroImage: `${WP}/2021/05/LOGO_Instagram-1.jpg`,
    description: "Visual identity and brand design for D'MOORS.",
  }),
  archiveProject({
    slug: 'naculture',
    title: "NA'CULTURE",
    subtitle: 'Cultural branding and visual identity',
    category: 'branding',
    year: 2021,
    client: "NA'CULTURE",
    role: 'Brand Design',
    heroImage: `${WP}/2021/05/Giuseppe_Fioretti_Naculture.jpeg`,
    description: "Brand identity exploring culture, craft and contemporary visual language.",
  }),
  archiveProject({
    slug: 'master-en-produccion-artistica',
    title: 'Master en Producción Artística',
    subtitle: 'Academic and artistic production',
    category: 'personal-project',
    year: 2021,
    client: 'Academic',
    role: 'Artist & Designer',
    heroImage: `${WP}/2021/05/Giuseppe_Fioretti_MPA.jpeg`,
    description: 'Academic and artistic production work from the Master en Producción Artística.',
  }),
  archiveProject({
    slug: 'gonzalo-doctor-branding',
    title: 'Gonzalo Doctor',
    subtitle: 'Brand identity across personal and business ventures',
    category: 'branding',
    year: 2021,
    client: 'Gonzalo Doctor',
    role: 'Brand Identity',
    heroImage: `${WP}/2021/08/IG-2021-scaled.jpg`,
    description:
      'Brand identity for Gonzalo Doctor — personal brand and business ventures for a client who became a creative collaborator.',
  }),
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects() {
  return projects.filter((p) => p.featured);
}
