import { WP } from '@/lib/utils';

export const CACOPHOBIA_HREF = '/cacophobia';

const CACOPHOBIA_BASE = `${WP}/2021/05`;

export const CACOPHOBIA_IMAGE = `${CACOPHOBIA_BASE}/IG-202117-scaled.jpg`;

export const CACOPHOBIA_INTRO =
  'Il progetto cacophobia propone di uscire dall’estetica del decoro per affrontare la “diversità” attraverso la spontaneità, la naturalezza, e la spensieratezza. Etimologicamente la parola cacofobia significa “ paura del brutto”.';

export const CACOPHOBIA_BODY = [
  'Immagina quando vuoi fare un selfie e cancelli più di una foto per poi finalmente scegliere quella esatta.',
  'In questo progetto si propone totalmente il contrario di questo. Cercare i propri difetti, le proprie vergogne e rigettarle fuori!',
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
