export type CareerTimelineItem = {
  org?: string;
  period: string;
  title: string;
  description: string;
};

export type CareerAward = {
  year: string;
  headline: string;
  description: string;
};

export type CareerPersonalProject = {
  title: string;
  description: string;
};

export type CareerAcademicEntry = {
  period: string;
  description: string;
};

export const CAREER_TIMELINE_INTRO = {
  greeting: 'Hello!',
  paragraphs: [
    'Throughout my career, I have cultivated a diverse skill set in design and brand direction, marked by key milestones such as launching my own sustainable fashion brand and leading creative teams at international companies. From 2011 to 2021, I worked as a freelance art director and graphic designer, collaborating with brands like @Nike, @Desigual, and @LEGO—experiences that enriched my creative approach and deepened my passion for innovation and visual storytelling.',
    'Most recently, I served as Head of Brand Design at Desigual, and I am currently part of the creative team at LEGO, where I develop campaigns and art direction concepts focused on marketing innovation.',
  ],
};

export const CAREER_TIMELINE_INHOUSE: CareerTimelineItem[] = [
  {
    org: 'LEGO',
    period: '2025 – Present – Copenhagen',
    title: 'Visual Designer Specialist, LEGO Group',
    description:
      'Merging creativity, strategy, and design to develop innovative campaigns and storytelling experiences.',
  },
  {
    org: 'BAU',
    period: '2024 – Present – Barcelona',
    title: 'Lecturer in Branding, BAU (Master in Graphic Communication Design)',
    description:
      'Guest lecturer empowering students through real-world branding projects. Fostering design thinking, entrepreneurship, and professional development at Bau University.',
  },
  {
    org: 'FLAX&KALE',
    period: '2023 – Jul 2023 – Barcelona',
    title: 'Creative Direction, Flax & Kale',
    description:
      'Creative direction for Flax & Kale, aligning with the brand’s values on food and lifestyle.',
  },
  {
    org: 'DESIGUAL',
    period: '2019 – 2022 – Barcelona',
    title: 'Head of Brand Design, Desigual',
    description: 'Led a global team in the brand identity redesign.',
  },
  {
    org: 'NIKE',
    period: '2017 – 2019 – Barcelona',
    title: 'Art Director, Lateral Thinking',
    description: 'Collaborated with @Nike on the NikeBoxBarcelona initiative.',
  },
  {
    period: '2016 – 2017 – Barcelona',
    title: 'Graphic Designer, Ancor Retail',
    description: 'Managed signage projects for major shopping centers.',
  },
  {
    period: '2015 – Naples',
    title: 'Creative Director, Na Culture',
    description: 'Developed branding for Naples tourism initiatives.',
  },
  {
    period: '2008/2009 – Naples',
    title: 'Graphic design internship, Uniongraphic Studio',
    description: 'Interned under Gaetano Gravina and Rino Sorrentino.',
  },
];

export const CAREER_TIMELINE_FREELANCE: CareerTimelineItem[] = [
  {
    period: '2023 – Present – Copenhagen',
    title: 'Founder & Creative Director, UREES',
    description:
      'Developing a sustainable fashion brand focused on upcycling unique pieces.',
  },
  {
    period: '2023 – Barcelona',
    title: 'Brand Identity for Menomale Pizzeria',
    description: 'Crafted a fresh brand identity and slogan.',
  },
  {
    period: '2021 – Barcelona',
    title: 'Logo & Brand for Zalio',
    description: 'Designed a compelling logo for a jewelry company.',
  },
  {
    period: '2020 – Barcelona',
    title: 'Brand Identity for Sec Brunch',
    description: 'Created an engaging logo and identity for a brunch spot.',
  },
  {
    period: '2015 – Naples',
    title: 'Branding for StrEAT',
    description: 'Created the logo and interior design for a restaurant.',
  },
  {
    period: '2014 – 2015 – Naples',
    title: 'Editorial Design for THE Magazine',
    description: 'Designed the first issue, establishing its visual identity.',
  },
  {
    period: 'June 2014 – Naples',
    title: 'Art direction and branding for UMF (University Music Festival)',
    description:
      'Created the corporate image and ad campaign for Università Federico II.',
  },
  {
    period: 'February 2014 – Naples',
    title: 'Logo for Academy of Fine Arts Film Festival',
    description: '',
  },
  {
    period: 'April 2009 – Naples',
    title: 'Graphic Designer for Walter Pugni',
    description: 'Worked with the Italian sculptor on visual identity projects.',
  },
];

export const CAREER_TIMELINE_AWARDS: CareerAward[] = [
  {
    year: '2020',
    headline: 'Winner of the LAUS Award for the Rebranding of Desigual.',
    description:
      'Tasked with redesigning the logo for the Barcelona-based fashion company Desigual, the goal was to return to the brand’s origins, redefining what it means to be “100% Desigual.”',
  },
  {
    year: '2020',
    headline: 'Winner of the D&AD Wooden Pencil for the Rebranding of Desigual.',
    description:
      'Recognised for the bold and unconventional redesign of Desigual’s logo, which flipped the brand’s name to reflect its DNA—literally. This identity shift celebrated the brand’s essence of being “different,” turning asymmetry and playfulness into a powerful statement. The project challenged conventions and gained global attention for its originality.',
  },
  {
    year: '2015',
    headline:
      'Winner of the contest for the new corporate identity for the Master in Artistic Production at the Universitat Politècnica de València for its tenth anniversary.',
    description: '',
  },
  {
    year: '2015',
    headline:
      'Winner of the contest for a 150-hour contract at the Academy of Fine Arts of Naples.',
    description:
      'The project involved maintaining and improving the aesthetic aspect, focusing on graphic design and publicity.',
  },
  {
    year: '2014',
    headline: 'Participation in the “Fight Against AIDS” competition for World AIDS Day.',
    description:
      'Posters were exhibited in various institutions across Spain for a year.',
  },
  {
    year: '2009',
    headline:
      'Second prize at the Fabio Merola national art exhibition in Naples, curated by Luca Pacioli.',
    description: '',
  },
  {
    year: '2009',
    headline:
      'First prize in the competition organized by Società Umanitaria di Piero Amos Nannini with the photograph Il Dolore Silente.',
    description: '',
  },
  {
    year: '2008',
    headline:
      'First prize in the logo design competition for the Wako World Kickboxing Championship, organized by the City of Naples.',
    description: '',
  },
];

export const CAREER_TIMELINE_PERSONAL: CareerPersonalProject[] = [
  {
    title: 'VISERAL POEMS – 2022',
    description:
      'An exploration of the intersection of poetry and visual art, utilizing various mediums to express complex emotional experiences.',
  },
  {
    title: 'CACOPHOBIA – 2018',
    description:
      'Creator and photographer of Cacophobia, a project reflecting on the importance of established beauty standards in culture. It seeks to highlight ugliness through ethical conclusions in a medium like Instagram, where image and aesthetics hold significant importance.',
  },
  {
    title: 'SKIN IS THE NEW CANVAS – 2016',
    description:
      'Director of photography with over 60k followers and millions of views on Instagram for artist Claudia Sahuquillo’s project Skin is the New Canvas.',
  },
  {
    title: 'DOCTORATE ON THE CÓNIDE – 2015',
    description:
      'An ongoing research project initiated in 2015, with the next objective being the development of a doctoral thesis. The Cónide is a term I coined for my research theses, aiming to give proper recognition to artists not considered as such by so-called experts.',
  },
  {
    title: 'THE MAGAZINE – 2015',
    description:
      'Art director and designer of THE Magazine, focusing on art, design, and photography.',
  },
  {
    title: 'EYE – 2009',
    description:
      'Eye is a photography project exploring the worlds that can be found within our eyes.',
  },
];

export const CAREER_TIMELINE_ACADEMIC: CareerAcademicEntry[] = [
  {
    period: '2017 – 2018',
    description:
      'Master’s Degree in Education and ICT (e-Learning) at Universitat Oberta de Catalunya.',
  },
  {
    period: '2016 – 2017',
    description: 'Master’s in Art and Design Research at EINA.',
  },
  {
    period: '2012 – 2015',
    description: 'Bachelor’s Degree in Graphic Design at the Academy of Fine Arts of Naples.',
  },
  {
    period: '2014 – 2015',
    description:
      'Completed 60 credits at the Faculty of Fine Arts of the Polytechnic University of Valencia during the fourth and final year of the Graphic Design program.',
  },
  {
    period: '2004 – 2009',
    description:
      'High School Diploma in Graphic Design and Photography at the State Institute of Art Umberto Boccioni in Naples.',
  },
];
