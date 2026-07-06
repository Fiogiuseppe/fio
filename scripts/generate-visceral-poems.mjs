#!/usr/bin/env node
/**
 * Generate src/data/products/visceral-poems.json from fiogiuseppe.com catalog images.
 * Run: node scripts/generate-visceral-poems.mjs
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, '../src/data/products/visceral-poems.json');
const BASE = 'https://fiogiuseppe.com/wp-content/uploads/2023/03';
const FRAME_MOCKUP = `${BASE}/Poster-Mockup-Creatlon_2-scaled.jpg`;

const CATALOG = [
  { file: 'VISCERAL-POETRY-12-scaled.jpg', title: 'Visceral Poem 12' },
  { file: 'VISCERAL-POETRY-92-scaled.jpg', title: 'Visceral Poem 92' },
  { file: 'VISCERAL-POETRY-102-scaled.jpg', title: 'Visceral Poem 102' },
  { file: 'VISCERAL-POETRY-121-scaled.jpg', title: 'Visceral Poem 121' },
  { file: 'VISCERAL-POETRY-126-scaled.jpg', title: 'Visceral Poem 126' },
  { file: 'VISCERAL-POETRY-132-scaled.jpg', title: 'Visceral Poem 132' },
  { file: 'VISCERAL-POETRY-137-scaled.jpg', title: 'Visceral Poem 137' },
  { file: 'IG-STORIES-29-scaled.jpg', title: 'Escribujo 29' },
  { file: 'IG-STORIES-38-scaled.jpg', title: 'Escribujo 38' },
  { file: 'IG-STORIES-56-scaled.jpg', title: 'Escribujo 56' },
  { file: 'IG-STORIES-57-scaled.jpg', title: 'Escribujo 57' },
  { file: 'IG-STORIES-78-scaled.jpg', title: 'Escribujo 78' },
  { file: 'IG-STORIES-84-scaled.jpg', title: 'Escribujo 84' },
  { file: 'IG-STORIES-100-scaled.jpg', title: 'Escribujo 100' },
  { file: 'IG-STORIES-106-scaled.jpg', title: 'Escribujo 106' },
  {
    file: 'IG-STORIES_Mesa-de-trabajo-1-copia-2-scaled.jpg',
    title: 'Escribujo — Mesa de trabajo',
  },
];

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

const products = CATALOG.map(({ file, title }) => {
  const slug = slugify(title);
  const isEscribujo = title.startsWith('Escribujo');

  return {
    slug,
    title,
    shortDescription: isEscribujo
      ? 'Unique escribujo from the Visceral Poems street series.'
      : 'A visceral poem where language meets ink and emotion.',
    longStory:
      'Born in transit — on buses between cities, on planes between countries — each Visceral Poem is a fragment of an inner landscape. Available as a handmade original or as a signed digital print, with an optional frame.',
    images: [`${BASE}/${file}`],
    framedImage: FRAME_MOCKUP,
    price: 10,
    currency: 'EUR',
    size: 'A3',
    technique: 'Ink on paper',
    availability: 'available',
    productType: 'print',
    cta: 'buy',
    tags: isEscribujo ? ['escribujo'] : ['poem'],
  };
});

await fs.writeFile(OUT, `${JSON.stringify(products, null, 2)}\n`);
console.log(`Wrote ${products.length} visceral poems → ${OUT}`);
