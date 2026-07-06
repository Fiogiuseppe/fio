#!/usr/bin/env node
/**
 * Sync Visceral Poems catalog with handmade pieces from @visceralpoems on Instagram.
 * Run: npm run sync:visceral-poems
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, '../src/data/products/visceral-poems.json');
const IG_CACHE = path.join(__dirname, 'data/visceral-poems-ig-handmade.json');
const BASE = 'https://fiogiuseppe.com/wp-content/uploads/2023/03';
const FRAME_MOCKUP = `${BASE}/Poster-Mockup-Creatlon_2-scaled.jpg`;

const HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'X-IG-App-ID': '936619743392459',
  'X-ASBD-ID': '129477',
  'X-IG-WWW-Claim': '0',
  Referer: 'https://www.instagram.com/visceralpoems/',
};

/** Signed digital prints from the Visceral Poems archive — not one-of-one handmade originals. */
const WP_DIGITAL_POEM_PRINTS = [
  { file: 'VISCERAL-POETRY-12-scaled.jpg', title: 'Visceral Poem 12' },
  { file: 'VISCERAL-POETRY-92-scaled.jpg', title: 'Visceral Poem 92' },
  { file: 'VISCERAL-POETRY-102-scaled.jpg', title: 'Visceral Poem 102' },
  { file: 'VISCERAL-POETRY-121-scaled.jpg', title: 'Visceral Poem 121' },
  { file: 'VISCERAL-POETRY-126-scaled.jpg', title: 'Visceral Poem 126' },
  { file: 'VISCERAL-POETRY-132-scaled.jpg', title: 'Visceral Poem 132' },
  { file: 'VISCERAL-POETRY-137-scaled.jpg', title: 'Visceral Poem 137' },
  { file: 'VISCERAL-POETRY-138-scaled.jpg', title: 'Visceral Poem 138' },
];

/** Digital escribujo prints — handmade originals live on @visceralpoems (#escribujos). */
const WP_DIGITAL_ESCRIJUJOS = [
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

const WP_HANDMADE_POSTERS = [
  {
    file: 'Poster-Mockup-Creatlon_2-scaled.jpg',
    title: 'Amor',
    shortDescription: 'Handmade poster — Amor by Visceral Poems.',
  },
  {
    file: 'Poster-Mockup-Creatlon-copia-scaled.jpg',
    title: 'Visceral Poem — Poster',
    shortDescription: 'Handmade signed poster from the Visceral Poems series.',
  },
  {
    file: 'Poster-Mockup-Creatlon_3-scaled.jpg',
    title: 'Jamás',
    shortDescription: 'Handmade poster — Jamás by Visceral Poems.',
  },
  {
    file: 'Poster-Mockup-Creatlon_4-scaled.jpg',
    title: 'Still Loving You',
    shortDescription: 'Handmade poster — Still Loving You by Visceral Poems.',
  },
];

function slugify(title) {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function baseProduct({ slug, title, shortDescription, images, formats, tags = [] }) {
  return {
    slug,
    title,
    shortDescription,
    longStory:
      'Born in transit — on buses between cities, on planes between countries — each Visceral Poem is a fragment of an inner landscape. Available as a handmade original or as a signed digital print, with an optional frame.',
    images,
    framedImage: FRAME_MOCKUP,
    price: 10,
    currency: 'EUR',
    size: 'A3',
    technique: 'Ink on paper',
    availability: 'available',
    productType: 'print',
    cta: 'buy',
    formats,
    tags,
  };
}

function wpProduct({ file, title, shortDescription, formats, tags }) {
  const isEscribujo = title.startsWith('Escribujo');
  return baseProduct({
    slug: slugify(title),
    title,
    shortDescription:
      shortDescription ??
      (isEscribujo
        ? 'Signed digital print of an escribujo from the Visceral Poems street series.'
        : 'Signed digital print — a visceral poem where language meets ink and emotion.'),
    images: [`${BASE}/${file}`],
    formats,
    tags: tags ?? (isEscribujo ? ['escribujo'] : ['poem']),
  });
}

function titleFromCaption(caption) {
  const cleaned = caption
    .replace(/#[\w]+/g, '')
    .replace(/@\w+/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  const first = cleaned.split(/[.!?]/)[0]?.trim();
  if (first && first.length > 3 && first.length < 80) return first;
  return cleaned.slice(0, 60) || 'Visceral Poem';
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchWithRetry(url, options, retries = 4) {
  for (let attempt = 0; attempt < retries; attempt++) {
    const res = await fetch(url, options);
    if (res.status === 429) {
      const wait = 4000 * 2 ** attempt;
      console.warn(`Instagram rate limit (429) — retrying in ${wait / 1000}s…`);
      await sleep(wait);
      continue;
    }
    return res;
  }
  return fetch(url, options);
}

async function fetchFeed(maxId) {
  const url = new URL('https://www.instagram.com/api/v1/feed/user/55356529144/');
  url.searchParams.set('count', '50');
  if (maxId) url.searchParams.set('max_id', maxId);
  const res = await fetchWithRetry(url, { headers: HEADERS });
  if (!res.ok) return null;
  return res.json();
}

async function loadIgCache() {
  try {
    const raw = await fs.readFile(IG_CACHE, 'utf8');
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.map((entry) =>
      entry.longStory
        ? entry
        : baseProduct({
            slug: entry.slug,
            title: entry.title,
            shortDescription:
              entry.shortDescription ?? 'Handmade ink original from @visceralpoems.',
            images: entry.images,
            formats: entry.formats ?? ['handmade'],
            tags: entry.tags ?? ['instagram'],
          }),
    );
  } catch {
    return [];
  }
}

async function saveIgCache(products) {
  await fs.mkdir(path.dirname(IG_CACHE), { recursive: true });
  await fs.writeFile(IG_CACHE, `${JSON.stringify(products, null, 2)}\n`);
}

async function fetchInstagramHandmade() {
  const profileRes = await fetchWithRetry(
    'https://www.instagram.com/api/v1/users/web_profile_info/?username=visceralpoems',
    { headers: HEADERS },
  );

  if (!profileRes.ok) {
    console.warn(`Instagram profile API returned ${profileRes.status} — using cached handmade pieces.`);
    return null;
  }

  const profile = await profileRes.json();
  const handmade = [];
  const seenUrls = new Set();

  function addFromItem(item, titleOverride, tag) {
    const media = item.carousel_media?.length ? item.carousel_media : [item];
    media.forEach((slide, index) => {
      const url = slide.image_versions2?.candidates?.[0]?.url;
      if (!url || seenUrls.has(url)) return;
      seenUrls.add(url);
      const caption = item.caption?.text ?? '';
      const title =
        titleOverride ??
        (media.length > 1 ? `${titleFromCaption(caption)} — ${index + 1}` : titleFromCaption(caption));
      const slug = `${slugify(title)}-${item.code}${media.length > 1 ? `-${index + 1}` : ''}`;
      handmade.push(
        baseProduct({
          slug,
          title,
          shortDescription: 'Handmade ink original from @visceralpoems.',
          images: [url.split('?')[0]],
          formats: ['handmade'],
          tags: [tag, 'instagram'],
        }),
      );
    });
  }

  const timeline = profile.data?.user?.edge_owner_to_timeline_media;
  const queue = [...(timeline?.edges ?? []).map((edge) => edge.node)];

  let maxId = timeline?.page_info?.end_cursor ?? null;
  for (let page = 0; page < 8 && maxId; page++) {
    const feed = await fetchFeed(maxId);
    if (!feed?.items?.length) break;
    queue.push(...feed.items);
    maxId = feed.more_available ? feed.next_max_id : null;
    await sleep(2000);
  }

  for (const item of queue) {
    const caption = item.caption?.text ?? item.edge_media_to_caption?.edges?.[0]?.node?.text ?? '';
    const code = item.code ?? item.shortcode;
    const normalized = {
      code,
      caption: { text: caption },
      carousel_media: item.carousel_media,
      image_versions2: item.image_versions2,
    };

    if (/some handmade #visceralpoems available/i.test(caption)) {
      addFromItem(normalized, null, 'handmade');
      continue;
    }

    if (/#escribujos/i.test(caption)) {
      addFromItem(normalized, null, 'escribujo');
      continue;
    }

    if (/writing and drawing at the same time/i.test(caption) && item.carousel_media?.length > 3) {
      addFromItem(normalized, null, 'notebook');
    }
  }

  return handmade;
}

function mergeUniqueProducts(base, extras) {
  const slugs = new Set(base.map((product) => product.slug));
  const merged = [...base];

  for (const product of extras) {
    let slug = product.slug;
    let suffix = 2;
    while (slugs.has(slug)) {
      slug = `${product.slug}-${suffix}`;
      suffix += 1;
    }
    slugs.add(slug);
    merged.push({ ...product, slug });
  }

  return merged;
}

async function main() {
  const products = [
    ...WP_DIGITAL_POEM_PRINTS.map((entry) =>
      wpProduct({ ...entry, formats: ['digital'], tags: ['poem', 'digital'] }),
    ),
    ...WP_DIGITAL_ESCRIJUJOS.map((entry) =>
      wpProduct({ ...entry, formats: ['digital'], tags: ['escribujo', 'digital'] }),
    ),
    ...WP_HANDMADE_POSTERS.map((entry) =>
      wpProduct({
        file: entry.file,
        title: entry.title,
        shortDescription: entry.shortDescription,
        formats: ['handmade'],
        tags: ['poster'],
      }),
    ),
  ];

  const igHandmade = await fetchInstagramHandmade();
  let igProducts = igHandmade;

  if (igHandmade === null) {
    igProducts = await loadIgCache();
    if (igProducts.length > 0) {
      console.log(`Loaded ${igProducts.length} handmade pieces from cache.`);
    } else {
      console.warn('No IG cache yet — run sync again when Instagram rate limit clears.');
    }
  } else if (igHandmade.length > 0) {
    await saveIgCache(igHandmade);
    console.log(`Cached ${igHandmade.length} handmade pieces from @visceralpoems.`);
  }

  const catalog = mergeUniqueProducts(products, igProducts);

  await fs.writeFile(OUT, `${JSON.stringify(catalog, null, 2)}\n`);
  const handmadeCount = catalog.filter((product) => product.formats?.includes('handmade')).length;
  const digitalCount = catalog.filter((product) => product.formats?.includes('digital')).length;
  console.log(`Wrote ${catalog.length} products (${handmadeCount} handmade, ${digitalCount} digital)`);
  console.log(`→ ${OUT}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
