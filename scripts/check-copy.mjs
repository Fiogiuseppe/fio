#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { normalizeWebsiteCopy } from './lib/website-copy.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const emDash = String.fromCodePoint(0x2014);
const forbidden = new RegExp(`${emDash}|&mdash;|&#0*8212;|&#x0*2014;|\\\\u2014`, 'i');
const extensions = new Set(['.ts', '.tsx', '.js', '.jsx', '.json', '.css', '.html', '.md', '.csv']);
const failures = [];

async function check(filePath) {
  const stat = await fs.stat(filePath);
  if (stat.isDirectory()) {
    for (const entry of await fs.readdir(filePath)) await check(path.join(filePath, entry));
    return;
  }
  if (!extensions.has(path.extname(filePath))) return;
  const source = await fs.readFile(filePath, 'utf8');
  // This imported archive is normalized by src/data/urees/index.ts before display.
  const publicCopy = path.relative(root, filePath) === 'src/data/urees/site.json'
    ? JSON.stringify(normalizeWebsiteCopy(JSON.parse(source)))
    : source;
  const lines = publicCopy.split('\n');
  lines.forEach((line, index) => {
    if (forbidden.test(line)) failures.push(`${path.relative(root, filePath)}:${index + 1}`);
  });
}

for (const source of ['src', 'scripts/data', 'scripts/products-template.csv']) {
  await check(path.join(root, source));
}

if (failures.length) {
  console.error('Website copy must not contain em dashes (U+2014). Rewrite with suitable punctuation.');
  console.error(failures.join('\n'));
  process.exitCode = 1;
} else {
  console.log('Website copy check passed: no em dashes.');
}
