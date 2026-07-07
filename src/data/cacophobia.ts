import { WP } from '@/lib/utils';

export const CACOPHOBIA_HREF = '/cacophobia';

const CACOPHOBIA_BASE = `${WP}/2021/05`;

export const CACOPHOBIA_IMAGE = `${CACOPHOBIA_BASE}/IG-202117-scaled.jpg`;

export const CACOPHOBIA_INTRO =
  'The Cacophobia project invites us to step outside the aesthetics of decorum and engage with “difference” through spontaneity, naturalness, and playfulness. Etymologically, cacophobia means “fear of ugliness”.';

export const CACOPHOBIA_BODY = [
  'Think about when you want to take a selfie and delete photo after photo until you finally choose the one that looks just right.',
  'This project proposes the exact opposite: to seek out your flaws, your embarrassments, and bring them out into the open.',
];

export const CACOPHOBIA_GALLERY = [
  'FIO_1852-copia.jpg',
  'FIO_2072.jpg',
  'FIO_2676.jpg',
  'FIO_3505-copia.jpg',
  'FIO_1858-copia.jpg',
  'FIO_2081.jpg',
  'FIO_2682.jpg',
  'FIO_1885.jpg',
  'FIO_1889.jpg',
  'FIO_2103.jpg',
  'FIO_2690.jpg',
  'FIO_2120.jpg',
  'FIO_2033.jpg',
  'FIO_2671.jpg',
  'FIO_3348.jpg',
  'FIO_2651-copia.jpg',
].map((file) => `${CACOPHOBIA_BASE}/${file}`);

export const CACOPHOBIA_WATCH_BUTTON_COUNT = 4;
