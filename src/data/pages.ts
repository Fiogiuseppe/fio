export type ProjectPage = {
  slug: string;
  title: string;
  description: string;
  image?: string;
  body?: string[];
};

export const PROJECT_PAGES: ProjectPage[] = [
  {
    slug: 'spiritual-design',
    title: 'Spiritual Design',
    description: 'When design serves something greater, it becomes sacred.',
    image: '/images/spiritual-design-def.svg',
    body: [
      'I do not design to impress, I design to align. To align what I feel with what the world needs.',
      'Design becomes sacred when we create with awareness. That is Spiritual Design.',
    ],
  },
  {
    slug: 'think_possible',
    title: 'Think Possible',
    description: 'Branding and visual experimentation.',
    image: 'https://fiogiuseppe.com/wp-content/uploads/2024/01/20230907_UREES02632.jpg',
  },
  {
    slug: 'new-desigual-sneakers-collection',
    title: 'First Sneakers Campaign x Desigual',
    description: 'Sneakers collection campaign for Desigual in collaboration with Olimpic.tv.',
    image:
      'https://fiogiuseppe.com/wp-content/uploads/2022/03/DESIGUAL_WEB_ASSETS_HOME_HEADER_PANORAMIC.gif',
  },
  {
    slug: 'desigual-rebranding-giuseppe-fioretti',
    title: 'Re-branding x Desigual',
    description: 'Go back to the origins of Desigual — what it really meant to be 100% Desigual.',
    image: 'https://fiogiuseppe.com/wp-content/uploads/2021/10/Desigual-HQ-Timelapse-1.gif',
  },
  {
    slug: 'blog',
    title: 'Blog',
    description: 'Writing, notes and reflections from Giuseppe Fioretti.',
    image: 'https://fiogiuseppe.com/wp-content/uploads/2025/07/Giuseppe_Fioretti.png',
  },
  {
    slug: 'visceralpoems',
    title: 'Visceral Poems',
    description: 'Poetry and visceral expression.',
    image: 'https://fiogiuseppe.com/wp-content/uploads/2023/03/VISCERAL-POETRY-12-scaled.jpg',
  },
  {
    slug: 'art-by-giuseppe-fioretti',
    title: 'Some Art',
    description: 'Selected artworks by Giuseppe Fioretti.',
    image: 'https://fiogiuseppe.com/wp-content/uploads/2025/07/Giuseppe_Fioretti_2.png',
  },
  {
    slug: 'the_conide',
    title: 'The Conide',
    description: 'On the importance of the spectator in the art world.',
    image: 'https://fiogiuseppe.com/wp-content/uploads/2021/05/FIO_1626-scaled.jpg',
  },
  {
    slug: 'giuseppe-fioretti-career-timeline',
    title: 'Career Timeline',
    description: 'Key milestones across design, brand direction and creative leadership.',
    image:
      'https://fiogiuseppe.com/wp-content/uploads/2025/07/fiogiuseppe_Professional_profile_photo_of_a_man_with_strong_f_ceb96722-fabf-4550-a1f5-e453b89d6378_3.png',
  },
  {
    slug: 'marianna-carolina-sale',
    title: 'Marianna Carolina Sale',
    description: 'Editorial and visual project.',
    image: 'https://fiogiuseppe.com/wp-content/uploads/2021/05/mariannacarolinasale.gif',
  },
  {
    slug: 'master-en-produccion-artistica',
    title: 'Master en Producción Artística',
    description: 'Academic and artistic production work.',
    image: 'https://fiogiuseppe.com/wp-content/uploads/2021/05/Giuseppe_Fioretti_MPA.jpeg',
  },
  {
    slug: 'skin-is-the-new-canvas',
    title: 'Skin is the New Canvas',
    description: 'Visual exploration on body and canvas.',
    image: 'https://fiogiuseppe.com/wp-content/uploads/2021/05/IG-202114-scaled.jpg',
  },
  {
    slug: 'inchiodiamo-il-passato',
    title: 'Inchiodiamo il Passato',
    description: 'Art project by Giuseppe Fioretti.',
    image: 'https://fiogiuseppe.com/wp-content/uploads/2021/05/SACRA-BIBLIA-scaled.jpg',
  },
  {
    slug: 'pee-pee',
    title: 'Pee Pee',
    description: 'Art project by Giuseppe Fioretti.',
    image: 'https://fiogiuseppe.com/wp-content/uploads/2021/05/IG-202131-scaled.jpg',
  },
  {
    slug: 'expanding-drawing',
    title: 'Expanding Drawing',
    description: 'The experience of drawing with space.',
    image: 'https://fiogiuseppe.com/wp-content/uploads/2024/06/Screenshot-2024-06-19-at-11.35.03.png',
  },
];

export function getProjectPage(slug: string): ProjectPage | undefined {
  return PROJECT_PAGES.find((page) => page.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return PROJECT_PAGES.map((page) => page.slug);
}
