#!/usr/bin/env node
/**
 * Sync Visceral Poems catalog with handmade pieces from @visceralpoems on Instagram.
 * Run: npm run sync:visceral-poems
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, '../src/data/products/visceral-poems.json');
const IG_CACHE = path.join(__dirname, 'data/visceral-poems-ig-handmade.json');
const FEED_PAGES_DIR = path.join(__dirname, 'data/ig-feed-pages');
const BASE = 'https://fiogiuseppe.com/wp-content/uploads/2023/03';

const EXCLUDED_IG_CODES = new Set(['C69CZk3qIxZ', 'C69CKd5qj3w', 'C69B51MKtYc', 'C5nhdPEKiVg']);

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

function longStoryForFormats(formats) {
  const intro =
    'Born in transit — on buses between cities, on planes between countries — each Visceral Poem is a fragment of an inner landscape.';
  if (formats.includes('handmade') && !formats.includes('digital')) {
    return `${intro} Handpainted A3 original (29.7 × 42 cm). Optional white frame without passepartout — the work fills the frame edge to edge.`;
  }
  return `${intro} A3 signed print (29.7 × 42 cm). Optional white frame without passepartout — the poster fills the frame edge to edge.`;
}

function baseProduct({ slug, title, shortDescription, images, formats, tags = [], igCode }) {
  return {
    slug,
    title,
    shortDescription,
    longStory: longStoryForFormats(formats),
    images,
    price: 10,
    currency: 'EUR',
    size: 'A3',
    technique: 'Ink on paper',
    availability: 'available',
    productType: 'print',
    cta: 'buy',
    formats,
    tags,
    ...(igCode ? { igCode } : {}),
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
  const hashtagTitles = caption.match(/#([\w\u00C0-\u024F]+)/gi);
  if (hashtagTitles?.length) {
    const named = hashtagTitles
      .map((tag) => tag.slice(1))
      .filter((tag) => !/visceralpoems|escribujos|napoli|barcelona|amor/i.test(tag))
      .map((tag) => tag.charAt(0).toUpperCase() + tag.slice(1));
    if (named.length > 0) return named.join(' · ');
  }

  const cleaned = caption
    .replace(/#[\w]+/g, '')
    .replace(/@\w+/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  const first = cleaned.split(/[.!?¿¡]/)[0]?.trim();
  if (first && first.length > 3 && first.length < 80) return first;
  return cleaned.slice(0, 60) || 'Visceral Poem';
}

function captionText(item) {
  return item.caption?.text ?? item.edge_media_to_caption?.edges?.[0]?.node?.text ?? item.caption ?? '';
}

function carouselCount(item) {
  return item.carousel_media?.length ?? item.edge_sidecar_to_children?.edges?.length ?? 0;
}

function isExcludedHandmade(caption) {
  if (!caption?.trim()) return true;
  if (/@iqos|smell like|colab with|thank you/i.test(caption)) return true;
  if (/resistendo sulla parete|alguien se llevó el cartel|pensando en ti 📸/i.test(caption)) return true;
  if (/el arte, ese poderoso canal de expresión/i.test(caption)) return true;
  if (/^yes\s*[….]+\s*better/i.test(caption.replace(/#[\w]+/g, '').trim())) return true;
  if (/\byes\b[\s….]*better\b/i.test(caption)) return true;

  if (/#visceralpoems|#escribujos/i.test(caption)) return false;

  const text = caption
    .replace(/#[\w\u00C0-\u024F]+/gi, '')
    .replace(/@\w+/g, '')
    .replace(/[\u{1F300}-\u{1FAFF}]/gu, '')
    .trim();
  if (text.length < 3) return true;
  return false;
}

function classifyHandmadeTag(caption, slides) {
  if (isExcludedHandmade(caption)) return null;
  if (/some handmade #visceralpoems available/i.test(caption)) return 'handmade';
  if (/#escribujos/i.test(caption)) return 'escribujo';
  if (/writing and drawing at the same time/i.test(caption) && slides > 3) return 'notebook';
  if (/#visceralpoems/i.test(caption)) return 'poem';

  const text = caption
    .replace(/#[\w\u00C0-\u024F]+/gi, '')
    .replace(/@\w+/g, '')
    .replace(/[\u{1F300}-\u{1FAFF}]/gu, '')
    .replace(/\s+/g, ' ')
    .trim();
  if (text.length >= 4 && text.length <= 140) return 'poem';
  return null;
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

async function saveFeedPage(pageIndex, data) {
  await fs.mkdir(FEED_PAGES_DIR, { recursive: true });
  await fs.writeFile(
    path.join(FEED_PAGES_DIR, `feed-page-${String(pageIndex).padStart(2, '0')}.json`),
    `${JSON.stringify(data)}\n`,
  );
}

async function loadSavedFeedPages() {
  const queue = [];
  const seen = new Set();

  function addItem(item) {
    const code = item.code ?? item.shortcode;
    if (!code || seen.has(code)) return;
    seen.add(code);
    queue.push(item);
  }

  try {
    const files = (await fs.readdir(FEED_PAGES_DIR)).filter((name) => name.endsWith('.json')).sort();
    for (const name of files) {
      const raw = await fs.readFile(path.join(FEED_PAGES_DIR, name), 'utf8');
      const data = JSON.parse(raw);
      if (data.data?.user?.edge_owner_to_timeline_media) {
        for (const edge of data.data.user.edge_owner_to_timeline_media.edges) addItem(edge.node);
      }
      if (data.items) for (const item of data.items) addItem(item);
    }
  } catch {
    // no saved pages yet
  }

  return queue;
}

async function fetchPostImagesFromHtml(code) {
  const res = await fetch(`https://www.instagram.com/p/${code}/`, {
    headers: { 'User-Agent': HEADERS['User-Agent'] },
    redirect: 'follow',
  });
  if (!res.ok) return [];
  const html = await res.text();
  const urls = [...html.matchAll(/https:\/\/scontent[^"\\]+cdninstagram\.com\/[^"\\]+\.jpg[^"\\]*/g)].map(
    (match) => match[0].replace(/\\u0026/g, '&'),
  );
  return [...new Set(urls)];
}

async function loadIgCache() {
  try {
    const raw = await fs.readFile(IG_CACHE, 'utf8');
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((entry) => !entry.igCode || !EXCLUDED_IG_CODES.has(entry.igCode))
      .map((entry) =>
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
            igCode: entry.igCode,
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

function normalizeItem(item) {
  const code = item.code ?? item.shortcode;
  const caption = captionText(item);
  return {
    code,
    caption: { text: caption },
    carousel_media: item.carousel_media,
    image_versions2: item.image_versions2,
    edge_sidecar_to_children: item.edge_sidecar_to_children,
  };
}

function buildProductsFromItem(item, tag, seenUrls) {
  const code = item.code ?? item.shortcode;
  const caption = captionText(item);
  const slides = item.carousel_media?.length
    ? item.carousel_media
    : item.edge_sidecar_to_children?.edges?.map((edge) => edge.node) ?? [item];
  const products = [];

  slides.forEach((slide, index) => {
    const url =
      slide.image_versions2?.candidates?.[0]?.url ??
      slide.display_url ??
      slide.thumbnail_src;
    if (!url) return;
    if (seenUrls.has(url)) return;
    seenUrls.add(url);

    const title =
      slides.length > 1 ? `${titleFromCaption(caption)} — ${index + 1}` : titleFromCaption(caption);
    const slug = `${slugify(title)}-${code}${slides.length > 1 ? `-${index + 1}` : ''}`;

    products.push(
      baseProduct({
        slug,
        title,
        shortDescription: 'Handmade ink original from @visceralpoems.',
        images: [url],
        formats: ['handmade'],
        tags: [tag, 'instagram'],
        igCode: code,
      }),
    );
  });

  return products;
}

async function buildProductsFromHtml(code, caption, tag, seenUrls) {
  const urls = await fetchPostImagesFromHtml(code);
  if (!urls.length) return [];

  const products = [];
  urls.forEach((url, index) => {
    if (seenUrls.has(url)) return;
    seenUrls.add(url);
    const title =
      urls.length > 1 ? `${titleFromCaption(caption)} — ${index + 1}` : titleFromCaption(caption);
    const slug = `${slugify(title)}-${code}${urls.length > 1 ? `-${index + 1}` : ''}`;
    products.push(
      baseProduct({
        slug,
        title,
        shortDescription: 'Handmade ink original from @visceralpoems.',
        images: [url],
        formats: ['handmade'],
        tags: [tag, 'instagram'],
        igCode: code,
      }),
    );
  });
  return products;
}

function mergeIgProducts(existing, incoming) {
  const byKey = new Map();
  for (const product of [...existing, ...incoming]) {
    const slideMatch = product.slug.match(/-(\d+)$/);
    const slide = slideMatch ? slideMatch[1] : '1';
    const key = product.igCode ? `${product.igCode}:${slide}` : product.images?.[0];
    if (!key) continue;
    if (!byKey.has(key)) {
      byKey.set(key, product);
      continue;
    }
    const current = byKey.get(key);
    const prefer =
      product.images?.[0]?.includes('scontent') && !current.images?.[0]?.includes('scontent')
        ? product
        : current;
    byKey.set(key, prefer);
  }
  return [...byKey.values()];
}

async function fetchInstagramHandmade(cachedProducts = []) {
  const seenUrls = new Set(cachedProducts.map((product) => product.images?.[0]).filter(Boolean));
  const handmade = [];
  const cachedByCode = new Set(cachedProducts.map((product) => product.igCode).filter(Boolean));
  const queue = [];
  const seenCodes = new Set();

  function enqueue(item) {
    const code = item.code ?? item.shortcode;
    if (!code || seenCodes.has(code)) return;
    seenCodes.add(code);
    queue.push(item);
  }

  const profileRes = await fetchWithRetry(
    'https://www.instagram.com/api/v1/users/web_profile_info/?username=visceralpoems',
    { headers: HEADERS },
  );

  if (profileRes.ok) {
    const profile = await profileRes.json();
    await saveFeedPage(0, profile);
    const timeline = profile.data?.user?.edge_owner_to_timeline_media;
    for (const edge of timeline?.edges ?? []) enqueue(edge.node);

    let maxId = timeline?.page_info?.end_cursor ?? null;
    for (let page = 0; page < 12 && maxId; page++) {
      const feed = await fetchFeed(maxId);
      if (!feed?.items?.length || feed.require_login) break;
      await saveFeedPage(page + 1, feed);
      for (const item of feed.items) enqueue(item);
      maxId = feed.more_available ? feed.next_max_id : null;
      await sleep(2500);
    }
  } else {
    console.warn(`Instagram profile API returned ${profileRes.status} — using saved feed pages.`);
  }

  for (const item of await loadSavedFeedPages()) enqueue(item);

  const htmlQueue = [];
  const codesWithApi = new Set();

  for (const raw of queue) {
    const item = normalizeItem(raw);
    if (EXCLUDED_IG_CODES.has(item.code)) continue;
    const caption = captionText(item);
    const tag = classifyHandmadeTag(caption, carouselCount(raw));
    if (!tag) continue;

    const fromApi = buildProductsFromItem(item, tag, seenUrls);
    if (fromApi.length > 0) {
      handmade.push(...fromApi);
      codesWithApi.add(item.code);
    } else if (!codesWithApi.has(item.code) && !cachedByCode.has(item.code)) {
      htmlQueue.push({ code: item.code, caption, tag });
    }
  }

  for (const entry of htmlQueue) {
    await sleep(800);
    const fromHtml = await buildProductsFromHtml(entry.code, entry.caption, entry.tag, seenUrls);
    handmade.push(...fromHtml);
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

  const cached = await loadIgCache();
  const igHandmade = await fetchInstagramHandmade(cached);
  const igProducts = mergeIgProducts(cached, igHandmade);

  if (igProducts.length > 0) {
    await saveIgCache(igProducts);
    console.log(`Cached ${igProducts.length} handmade pieces from @visceralpoems.`);
  } else {
    console.warn('No handmade pieces found — check Instagram access or saved feed pages.');
  }

  const catalog = mergeUniqueProducts(products, igProducts);

  await fs.writeFile(OUT, `${JSON.stringify(catalog, null, 2)}\n`);

  await new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [path.join(__dirname, 'host-visceral-poem-images.mjs')], {
      stdio: 'inherit',
    });
    child.on('exit', (code) => (code === 0 ? resolve() : reject(new Error(`host images exited ${code}`))));
  });

  const handmadeCount = catalog.filter((product) => product.formats?.includes('handmade')).length;
  const digitalCount = catalog.filter((product) => product.formats?.includes('digital')).length;
  console.log(`Wrote ${catalog.length} products (${handmadeCount} handmade, ${digitalCount} digital)`);
  console.log(`→ ${OUT}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
