#!/usr/bin/env node
/**
 * Syncs the full UREES catalog from urees.shop (Shopify) into src/data/urees/catalog.json
 * Run: node scripts/sync-urees-shop.mjs
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'src/data/urees/catalog.json');

const PRODUCTS_URL = 'https://urees.shop/products.json?limit=250';
const FRONTPAGE_URL = 'https://urees.shop/collections/frontpage/products.json?limit=250';

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Fetch failed ${url}: ${res.status}`);
  return res.json();
}

function normalizeProduct(product) {
  const variants = product.variants.map((variant) => ({
    id: variant.id,
    title: variant.title,
    price: variant.price,
    available: variant.available,
    option1: variant.option1,
    option2: variant.option2,
    option3: variant.option3,
  }));

  return {
    id: product.id,
    handle: product.handle,
    title: product.title,
    productType: product.product_type || '',
    vendor: product.vendor || 'Urees',
    tags: product.tags || [],
    descriptionHtml: product.body_html || '',
    images: product.images.map((image) => ({
      src: image.src,
      alt: image.alt || product.title,
      width: image.width,
      height: image.height,
    })),
    options: (product.options || []).map((option) => ({
      name: option.name,
      values: option.values,
    })),
    variants,
    available: variants.some((variant) => variant.available),
  };
}

async function main() {
  const [allData, frontpageData] = await Promise.all([
    fetchJson(PRODUCTS_URL),
    fetchJson(FRONTPAGE_URL),
  ]);

  const products = allData.products.map(normalizeProduct);
  const featuredHandles = frontpageData.products.map((product) => product.handle);

  const byHandle = new Map(products.map((product) => [product.handle, product]));
  const featured = featuredHandles
    .map((handle) => byHandle.get(handle))
    .filter(Boolean);

  const catalog = {
    syncedAt: new Date().toISOString(),
    source: 'https://urees.shop',
    currency: 'EUR',
    featuredHandles,
    products,
    featured,
  };

  await fs.mkdir(path.dirname(OUT), { recursive: true });
  await fs.writeFile(OUT, `${JSON.stringify(catalog, null, 2)}\n`, 'utf8');

  console.log(`Synced ${products.length} products (${featured.length} featured on homepage)`);
  console.log(`→ ${path.relative(ROOT, OUT)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
