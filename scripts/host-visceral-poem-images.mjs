#!/usr/bin/env node
/**
 * Download @visceralpoems product images to public/ so they survive IG URL expiry.
 * Run: npm run host:visceral-poem-images
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CATALOG = path.join(__dirname, '../src/data/products/visceral-poems.json');
const IG_CACHE = path.join(__dirname, 'data/visceral-poems-ig-handmade.json');
const FEED_PAGES_DIR = path.join(__dirname, 'data/ig-feed-pages');
const OUT_DIR = path.join(__dirname, '../public/shop/visceral-poems');

const DOWNLOAD_HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  Referer: 'https://www.instagram.com/',
};

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function slideIndexFromSlug(slug) {
  const match = slug.match(/-(\d+)$/);
  return match ? Number(match[1]) - 1 : 0;
}

function urlsFromNode(node) {
  const urls = [];

  if (node.carousel_media?.length) {
    for (const slide of node.carousel_media) {
      urls.push(slide.image_versions2?.candidates?.[0]?.url);
    }
  } else if (node.edge_sidecar_to_children?.edges?.length) {
    for (const edge of node.edge_sidecar_to_children.edges) {
      urls.push(edge.node.display_url ?? edge.node.thumbnail_src);
    }
  } else {
    urls.push(
      node.image_versions2?.candidates?.[0]?.url ??
        node.display_url ??
        node.thumbnail_src,
    );
  }

  return urls.filter(Boolean);
}

async function loadFeedImageIndex() {
  const byCode = new Map();

  async function addNode(node) {
    const code = node.code ?? node.shortcode;
    if (!code) return;
    const urls = urlsFromNode(node);
    if (urls.length) byCode.set(code, urls);
  }

  const files = (await fs.readdir(FEED_PAGES_DIR)).filter((name) => name.endsWith('.json')).sort();
  for (const name of files) {
    const data = JSON.parse(await fs.readFile(path.join(FEED_PAGES_DIR, name), 'utf8'));
    if (data.data?.user?.edge_owner_to_timeline_media) {
      for (const edge of data.data.user.edge_owner_to_timeline_media.edges) {
        await addNode(edge.node);
      }
    }
    if (data.items) {
      for (const item of data.items) await addNode(item);
    }
  }

  return byCode;
}

async function scrapePostUrls(code) {
  const res = await fetch(`https://www.instagram.com/p/${code}/`, {
    headers: { 'User-Agent': DOWNLOAD_HEADERS['User-Agent'] },
    redirect: 'follow',
  });
  if (!res.ok) return [];
  const html = await res.text();
  const urls = [
    ...html.matchAll(/https:\/\/scontent[^"\\]+cdninstagram\.com\/[^"\\]+\.jpg[^"\\]*/g),
  ].map((match) => match[0].replace(/\\u0026/g, '&'));
  return [...new Set(urls)];
}

async function resolveSourceUrl(product, feedIndex) {
  const remote = product.images?.[0];
  if (remote && !remote.includes('cdninstagram.com')) return null;

  if (remote?.includes('?')) return remote;

  if (product.igCode && feedIndex.has(product.igCode)) {
    const urls = feedIndex.get(product.igCode);
    const index = slideIndexFromSlug(product.slug);
    if (urls[index]) return urls[index];
    if (urls[0]) return urls[0];
  }

  if (product.igCode) {
    const scraped = await scrapePostUrls(product.igCode);
    const index = slideIndexFromSlug(product.slug);
    if (scraped[index]) return scraped[index];
    if (scraped[0]) return scraped[0];
  }

  return remote;
}

async function downloadImage(url, dest) {
  const res = await fetch(url, { headers: DOWNLOAD_HEADERS });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const type = res.headers.get('content-type') ?? '';
  if (!type.includes('image')) throw new Error(`Not an image (${type})`);
  const buffer = Buffer.from(await res.arrayBuffer());
  await fs.writeFile(dest, buffer);
}

async function hostProductImages(products, feedIndex) {
  await fs.mkdir(OUT_DIR, { recursive: true });
  let hosted = 0;
  let failed = 0;

  for (const product of products) {
    const remote = product.images?.[0];
    if (!remote?.includes('cdninstagram.com') && !product.igCode) continue;

    const localPath = `/shop/visceral-poems/${product.slug}.jpg`;
    const dest = path.join(OUT_DIR, `${product.slug}.jpg`);

    try {
      await fs.access(dest);
      product.images = [localPath];
      hosted += 1;
      continue;
    } catch {
      // download below
    }

    const sourceUrl = await resolveSourceUrl(product, feedIndex);
    if (!sourceUrl) {
      console.warn(`No source URL for ${product.slug}`);
      failed += 1;
      continue;
    }

    try {
      await downloadImage(sourceUrl, dest);
      product.images = [localPath];
      hosted += 1;
      console.log(`Hosted ${product.slug}`);
      await sleep(300);
    } catch (error) {
      console.warn(`Failed ${product.slug}: ${error.message}`);
      failed += 1;
    }
  }

  return { hosted, failed };
}

async function main() {
  const feedIndex = await loadFeedImageIndex();
  console.log(`Feed index: ${feedIndex.size} posts with image URLs`);

  const catalog = JSON.parse(await fs.readFile(CATALOG, 'utf8'));
  const catalogStats = await hostProductImages(catalog, feedIndex);
  await fs.writeFile(CATALOG, `${JSON.stringify(catalog, null, 2)}\n`);

  let cacheStats = { hosted: 0, failed: 0 };
  try {
    const cache = JSON.parse(await fs.readFile(IG_CACHE, 'utf8'));
    cacheStats = await hostProductImages(cache, feedIndex);
    await fs.writeFile(IG_CACHE, `${JSON.stringify(cache, null, 2)}\n`);
  } catch {
    // cache optional
  }

  console.log(
    `Done — catalog ${catalogStats.hosted} hosted (${catalogStats.failed} failed), cache ${cacheStats.hosted} hosted (${cacheStats.failed} failed)`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
