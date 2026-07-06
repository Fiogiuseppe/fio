#!/usr/bin/env node
/**
 * Imports Medium articles from @fiogiuseppe RSS into src/data/articles.ts
 * Run: node scripts/import-medium-articles.mjs
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const FEED_URL = 'https://medium.com/feed/@fiogiuseppe';

function cdata(text, tag) {
  const re = new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></${tag}>`, 'i');
  const m = text.match(re);
  return m ? m[1].trim() : '';
}

function tagValue(text, tag) {
  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, 'i');
  const m = text.match(re);
  if (!m) return '';
  return m[1].replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').trim();
}

function slugFromLink(link) {
  const url = new URL(link.split('?')[0]);
  const segment = url.pathname.split('/').filter(Boolean).pop() ?? 'article';
  return segment.replace(/-[a-f0-9]{12}$/i, '');
}

function formatDate(pubDate) {
  return new Date(pubDate).toISOString().slice(0, 10);
}

function firstImage(html) {
  const m = html.match(/<img[^>]+src="([^"]+)"/i);
  return m?.[1] ?? '/images/spiritual-design-def.svg';
}

function plainText(html) {
  return html
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
}

function excerptFromHtml(html, title) {
  const h3 = html.match(/<h3>([\s\S]*?)<\/h3>/i);
  if (h3) return plainText(h3[1]);

  const em = html.match(/<p><em>([\s\S]*?)<\/em><\/p>/i);
  if (em) {
    const text = plainText(em[1]);
    if (!/^about the author$/i.test(text)) return text;
  }

  const paragraphs = [...html.matchAll(/<p>([\s\S]*?)<\/p>/gi)];
  for (const match of paragraphs) {
    const text = plainText(match[1]);
    if (text.length < 40) continue;
    if (/^about the author$/i.test(text)) continue;
    if (text.startsWith('—')) continue;
    return text.length > 220 ? `${text.slice(0, 217)}…` : text;
  }

  return title;
}

function cleanContent(html) {
  return html
    .replace(/<img[^>]+src="https:\/\/medium\.com\/_\/stat[^"]*"[^>]*>/gi, '')
    .replace(/<hr>[\s\S]*$/i, '')
    .replace(/<p><a href="https:\/\/medium\.com[^<]*<\/a> was originally published[\s\S]*$/i, '')
    .trim();
}

function escapeTs(str) {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\$\{/g, '\\${');
}

async function main() {
  const res = await fetch(FEED_URL);
  if (!res.ok) throw new Error(`Feed fetch failed: ${res.status}`);
  const xml = await res.text();

  const chunks = xml.split('<item>').slice(1);
  const articles = chunks.map((chunk) => {
    const item = `<item>${chunk.split('</item>')[0]}</item>`;
    const title = cdata(item, 'title');
    const link = tagValue(item, 'link');
    const pubDate = tagValue(item, 'pubDate');
    const rawHtml = cdata(item, 'content:encoded');
    const contentHtml = cleanContent(rawHtml);

    const categories = [...item.matchAll(/<category><!\[CDATA\[([^\]]+)\]\]><\/category>/g)].map(
      (m) => m[1]
    );

    return {
      slug: slugFromLink(link),
      title,
      date: formatDate(pubDate),
      excerpt: excerptFromHtml(rawHtml, title),
      coverImage: firstImage(rawHtml),
      tags: categories.length ? categories : ['design'],
      contentHtml,
      mediumUrl: link.split('?')[0],
    };
  });

  const file = `import type { Article } from '@/lib/types';

/** Imported from https://medium.com/@fiogiuseppe — run scripts/import-medium-articles.mjs to refresh */
export const articles: Article[] = [
${articles
  .map(
    (a) => `  {
    slug: '${a.slug}',
    title: ${JSON.stringify(a.title)},
    date: '${a.date}',
    excerpt: ${JSON.stringify(a.excerpt)},
    coverImage: ${JSON.stringify(a.coverImage)},
    tags: ${JSON.stringify(a.tags)},
    mediumUrl: ${JSON.stringify(a.mediumUrl)},
    contentHtml: \`${escapeTs(a.contentHtml)}\`,
  }`
  )
  .join(',\n')}
];

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}
`;

  await fs.writeFile(path.join(ROOT, 'src/data/articles.ts'), file, 'utf8');
  console.log(`Imported ${articles.length} articles:`);
  articles.forEach((a) => console.log(`  - ${a.date}  ${a.title}`));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
