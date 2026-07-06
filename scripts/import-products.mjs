#!/usr/bin/env node
/**
 * Bulk-import shop products from CSV into src/data/products/*.json
 *
 * Usage:
 *   node scripts/import-products.mjs                    # reads scripts/products.csv
 *   node scripts/import-products.mjs path/to/file.csv   # custom CSV path
 *   node scripts/import-products.mjs --merge              # merge with existing (default: replace per category in CSV)
 *
 * Copy scripts/products-template.csv to scripts/products.csv and fill in your catalog.
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const PRODUCTS_DIR = path.join(ROOT, 'src/data/products');

const VALID_CATEGORIES = new Set(['visceral-poems', 'paintings', 'urees']);
const VALID_AVAILABILITY = new Set(['available', 'sold', 'coming-soon']);
const VALID_PRODUCT_TYPES = new Set(['original', 'print', 'one-of-one', 'wearable']);
const VALID_CTA = new Set(['buy', 'request', 'sold']);

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const next = text[i + 1];

    if (inQuotes) {
      if (char === '"' && next === '"') {
        field += '"';
        i++;
      } else if (char === '"') {
        inQuotes = false;
      } else {
        field += char;
      }
      continue;
    }

    if (char === '"') {
      inQuotes = true;
      continue;
    }

    if (char === ',') {
      row.push(field);
      field = '';
      continue;
    }

    if (char === '\n' || (char === '\r' && next === '\n')) {
      row.push(field);
      if (row.some((cell) => cell.trim() !== '')) rows.push(row);
      row = [];
      field = '';
      if (char === '\r') i++;
      continue;
    }

    if (char === '\r') continue;

    field += char;
  }

  if (field.length > 0 || row.length > 0) {
    row.push(field);
    if (row.some((cell) => cell.trim() !== '')) rows.push(row);
  }

  return rows;
}

function splitList(value, separator) {
  return value
    .split(separator)
    .map((part) => part.trim())
    .filter(Boolean);
}

function rowToProduct(headers, values) {
  const record = Object.fromEntries(headers.map((header, index) => [header, values[index]?.trim() ?? '']));

  const category = record.category;
  if (!VALID_CATEGORIES.has(category)) {
    throw new Error(`Invalid category "${category}" for slug "${record.slug}"`);
  }

  if (!record.slug || !record.title) {
    throw new Error(`Row missing slug or title: ${JSON.stringify(record)}`);
  }

  if (!VALID_AVAILABILITY.has(record.availability)) {
    throw new Error(`Invalid availability "${record.availability}" for "${record.slug}"`);
  }

  if (!VALID_PRODUCT_TYPES.has(record.productType)) {
    throw new Error(`Invalid productType "${record.productType}" for "${record.slug}"`);
  }

  if (!VALID_CTA.has(record.cta)) {
    throw new Error(`Invalid cta "${record.cta}" for "${record.slug}"`);
  }

  const images = splitList(record.images, '|');
  if (images.length === 0) {
    throw new Error(`Product "${record.slug}" needs at least one image URL`);
  }

  const product = {
    slug: record.slug,
    title: record.title,
    shortDescription: record.shortDescription,
    longStory: record.longStory,
    images,
    price: Number(record.price),
    currency: 'EUR',
    availability: record.availability,
    productType: record.productType,
    cta: record.cta,
  };

  if (!Number.isFinite(product.price) || product.price < 0) {
    throw new Error(`Invalid price for "${record.slug}"`);
  }

  if (record.size) product.size = record.size;
  if (record.technique) product.technique = record.technique;
  if (record.edition) product.edition = record.edition;

  const tags = splitList(record.tags, ',');
  if (tags.length > 0) product.tags = tags;

  return { category, product };
}

async function readCategoryFile(category) {
  const filePath = path.join(PRODUCTS_DIR, `${category}.json`);
  try {
    const raw = await fs.readFile(filePath, 'utf8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

async function main() {
  const args = process.argv.slice(2);
  const merge = args.includes('--merge');
  const csvPath = args.find((arg) => !arg.startsWith('--')) ?? path.join(__dirname, 'products.csv');

  let csv;
  try {
    csv = await fs.readFile(csvPath, 'utf8');
  } catch {
    console.error(`CSV not found: ${csvPath}`);
    console.error('Copy scripts/products-template.csv to scripts/products.csv and add your products.');
    process.exit(1);
  }

  const rows = parseCsv(csv);
  if (rows.length < 2) {
    throw new Error('CSV must include a header row and at least one product row');
  }

  const [headerRow, ...dataRows] = rows;
  const headers = headerRow.map((header) => header.trim());
  const required = ['slug', 'title', 'category', 'shortDescription', 'longStory', 'images', 'price', 'availability', 'productType', 'cta'];
  for (const field of required) {
    if (!headers.includes(field)) {
      throw new Error(`CSV missing required column: ${field}`);
    }
  }

  const byCategory = new Map();
  const slugs = new Set();

  for (const values of dataRows) {
    const { category, product } = rowToProduct(headers, values);
    if (slugs.has(product.slug)) {
      throw new Error(`Duplicate slug in CSV: ${product.slug}`);
    }
    slugs.add(product.slug);

    if (!byCategory.has(category)) byCategory.set(category, []);
    byCategory.get(category).push(product);
  }

  for (const category of byCategory.keys()) {
    let products = byCategory.get(category);

    if (merge) {
      const existing = await readCategoryFile(category);
      const importedSlugs = new Set(products.map((p) => p.slug));
      const kept = existing.filter((p) => !importedSlugs.has(p.slug));
      products = [...kept, ...products];
    }

    products.sort((a, b) => a.title.localeCompare(b.title));

    const filePath = path.join(PRODUCTS_DIR, `${category}.json`);
    await fs.writeFile(filePath, `${JSON.stringify(products, null, 2)}\n`, 'utf8');
    console.log(`  ✓ ${category}: ${products.length} products → ${path.relative(ROOT, filePath)}`);
  }

  console.log(`\nImported ${slugs.size} products from ${path.relative(ROOT, csvPath)}`);
  console.log('Run npm run build to regenerate shop pages.');
}

main().catch((err) => {
  console.error(err.message ?? err);
  process.exit(1);
});
