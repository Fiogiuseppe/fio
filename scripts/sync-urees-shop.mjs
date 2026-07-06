#!/usr/bin/env node
/**
 * Syncs the full UREES site from urees.shop (Shopify) into src/data/urees/
 * Run: npm run sync:urees
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const DATA_DIR = path.join(ROOT, 'src/data/urees');
const BASE = 'https://urees.shop';

const PAGE_HANDLES = [
  'manifesto',
  'contact-1',
  'discover-your-style-your-perfect-fit-urees-custom',
  'size-guide-by-urees',
  'care-for-your-urees-washing-and-maintenance-guide',
  'join-our-newsletter-stay-informed-and-get-exclusive-updates',
  'become-our-global-urees-seller',
  'data-sharing-opt-out',
];

const POLICY_HANDLES = [
  'privacy-policy',
  'refund-policy',
  'terms-of-service',
  'legal-notice',
  'contact-information',
];

const COLLECTION_HANDLES = [
  'frontpage',
  'discover-the-best-in-sustainable-fashion-best-sellers-collection-urees',
];

const HOMEPAGE_FALLBACK = {
  heroImage: `${BASE}/cdn/shop/files/home.jpg?v=1722951171&width=3840`,
  hero: {
    headline:
      'UREES® IS A LUXURY CONSCIOUS BRAND THAT TRANSFORMS USED GARMENTS INTO UNIQUE, HANDCRAFTED PIECES.',
    cta: { label: 'MANIFESTO', href: '/pages/manifesto' },
  },
  video: {
    mp4: `${BASE}/cdn/shop/videos/c/vp/6460d894a2504497a75ad40c9e7d1fe7/6460d894a2504497a75ad40c9e7d1fe7.HD-1080p-4.8Mbps-17201661.mp4?v=0`,
    poster: `${BASE}/cdn/shop/files/preview_images/6460d894a2504497a75ad40c9e7d1fe7.thumbnail.0000000000_1100x.jpg?v=1691763361`,
  },
  podcast: {
    title: 'PODCAST: Revive & Thrive: The Upcycling Journey',
    body: '"Revive & Thrive: The Upcycling Journey," is a podcast dedicated to exploring the world of sustainable fashion and the art of upcycling. Join your host, William Paz, as he engages with thought leaders, designers, and advocates who are reshaping the fashion industry through innovative and environmentally conscious practices.',
    note: '*The characters are fictional. Enjoy the content.',
    image: `${BASE}/cdn/shop/files/podcast_urees-06.png`,
    spotifyUrl: 'https://open.spotify.com/show/6LRQafJ5NJ0HRByCMnzVe1?si=0fc83a45d4634e5b',
  },
  dreaming: {
    title: 'DREAMING OF OUR PANTS WORN BY THOSE WHO HAVE INSPIRED US.',
  },
  reviving: [
    {
      title: 'REVIVING TIMELESS ICONS FRIDA',
      image: `${BASE}/cdn/shop/files/2.png?v=1699637007&width=3840`,
    },
    {
      title: 'REVIVING ALBERT',
      image: `${BASE}/cdn/shop/files/3.png?v=1699637001&width=3840`,
    },
    {
      title: 'REVIVING MARIE',
      image: `${BASE}/cdn/shop/files/2_9624e6a5-78e6-461f-9e1b-6099c5b61e39.png?v=1699637023&width=3840`,
    },
    {
      title: 'REVIVING NERI',
      image: `${BASE}/cdn/shop/files/2_786b1b50-95c7-4f72-b7c3-bc452c15a23a.png?v=1699637033&width=3840`,
    },
    {
      title: 'REVIVING GALA',
      image: `${BASE}/cdn/shop/files/2_67d68aa7-19fb-44c7-af53-d49b81046728.png?v=1699637013&width=3840`,
    },
  ],
  featuredNews: [],
};

function stripHtml(html) {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function featuredNewsFromHtml(html) {
  const idx = html.indexOf('Urees news');
  if (idx === -1) return [];

  const chunk = html.slice(idx, idx + 35000);
  return chunk
    .split('blog__post')
    .slice(1)
    .map((part) => {
      const handle = part.match(/\/blogs\/urees-news\/([^"?]+)/)?.[1];
      if (!handle) return null;

      const titleMatch = part.match(/card__heading[\s\S]*?<a[^>]*>\s*([^<]+)/);
      const imgMatch = part.match(/src="(\/\/urees\.shop\/cdn\/shop\/articles\/[^"]+)"/);
      const timeMatch = part.match(/datetime="([^"]+)"/);
      const tagMatch = part.match(/<\/time><\/span><span>([^<]+)<\/span>/);
      const excMatch = part.match(/article-card__excerpt[\s\S]*?<p>([\s\S]*?)<\/p>/);

      return {
        handle,
        title: titleMatch?.[1]?.replace(/\s+/g, ' ').trim() ?? '',
        image: imgMatch ? `https:${imgMatch[1]}` : '',
        publishedAt: timeMatch?.[1] ?? '',
        tag: tagMatch?.[1]?.trim() ?? 'Urees Reuse',
        excerpt: excMatch ? stripHtml(excMatch[1]) : '',
      };
    })
    .filter((item) => Boolean(item?.handle))
    .slice(0, 3);
}

function normalizeShopImageUrl(url) {
  const cleaned = url.replace(/&amp;/g, '&').replace(/width=\d+/, 'width=3840');
  if (cleaned.startsWith('http')) return cleaned;
  return `https:${cleaned}`;
}

function revivingSlideshowFromHtml(html) {
  const slideStart = html.indexOf('slideshow banner');
  if (slideStart === -1) return null;

  const slideEnd = html.indexOf('image-with-text', slideStart);
  const slideshow = html.slice(slideStart, slideEnd > slideStart ? slideEnd : slideStart + 25000);
  const slides = [];

  for (const part of slideshow.split('slideshow__slide').slice(1)) {
    const slide = part.split('slideshow__slide')[0];
    const titleMatch = slide.match(/<h2[^>]*>([\s\S]*?)<\/h2>/);
    const srcMatch = slide.match(/<img[^>]+src="([^"]+)"/);
    if (!titleMatch || !srcMatch) continue;

    const title = titleMatch[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    const image = normalizeShopImageUrl(srcMatch[1]);
    if (!image.includes('/cdn/shop/files/')) continue;

    slides.push({ title, image });
  }

  return slides.length > 0 ? slides : null;
}

function homepageFromHtml(html) {
  const heroBlock = html.match(/home\.jpg[\s\S]*?FIRST DROP UREES/i)?.[0] ?? html;
  const headlineMatch = heroBlock.match(/<h2[^>]*>([\s\S]*?)<\/h2>/i);
  const headline = headlineMatch?.[1]?.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()
    ?? HOMEPAGE_FALLBACK.hero.headline;
  const ctaMatch = heroBlock.match(/class="button[^"]*"[^>]*>\s*([^<]+)/i);
  const ctaLabel = ctaMatch?.[1]?.trim() || HOMEPAGE_FALLBACK.hero.cta.label;

  const videoBlock = html.match(/FIRST DROP UREES[\s\S]*?video-section/i)?.[0] ?? html;
  const mp4Match = videoBlock.match(/src="(\/\/urees\.shop\/cdn\/shop\/videos[^"]+\.mp4[^"]*)"/i)
    ?? html.match(/src="(\/\/urees\.shop\/cdn\/shop\/videos[^"]+\.mp4[^"]*)"/i);
  const posterMatch = videoBlock.match(/poster="(\/\/urees\.shop[^"]+)"/i)
    ?? html.match(/poster="(\/\/urees\.shop\/cdn\/shop\/files\/preview_images[^"]+)"/i);

  const podcastBlock = html.match(/PODCAST: Revive[\s\S]*?Subscribe to our emails/i)?.[0] ?? '';
  const podcastImage = podcastBlock.match(/\/\/urees\.shop\/cdn\/shop\/files\/podcast[^"\s?]+/)?.[0];
  const spotifyUrl = podcastBlock.match(/https:\/\/open\.spotify\.com\/[^"\s]+/)?.[0];

  const dreamingTitle = html.match(
    /<h2[^>]*>\s*(DREAMING OF OUR PANTS[\s\S]*?)\s*<\/h2>/i,
  )?.[1]?.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  const revivingSlides = revivingSlideshowFromHtml(html);

  return {
    ...HOMEPAGE_FALLBACK,
    dreaming: {
      title: dreamingTitle || HOMEPAGE_FALLBACK.dreaming.title,
    },
    reviving: revivingSlides ?? HOMEPAGE_FALLBACK.reviving,
    hero: {
      headline,
      cta: { label: ctaLabel, href: '/pages/manifesto' },
    },
    video: {
      mp4: mp4Match ? `https:${mp4Match[1]}` : HOMEPAGE_FALLBACK.video.mp4,
      poster: posterMatch ? `https:${posterMatch[1]}` : HOMEPAGE_FALLBACK.video.poster,
    },
    podcast: {
      ...HOMEPAGE_FALLBACK.podcast,
      image: podcastImage ? `https:${podcastImage}` : HOMEPAGE_FALLBACK.podcast.image,
      spotifyUrl: spotifyUrl ?? HOMEPAGE_FALLBACK.podcast.spotifyUrl,
    },
    featuredNews: featuredNewsFromHtml(html),
  };
}

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Fetch failed ${url}: ${res.status}`);
  return res.json();
}

async function fetchText(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Fetch failed ${url}: ${res.status}`);
  return res.text();
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

function tagValue(html, tag) {
  const match = html.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, 'i'));
  return match ? match[1].replace(/<[^>]+>/g, '').trim() : '';
}

function articleFromHtml(html, articlePath) {
  const handle = articlePath.split('/').pop();
  const titleMatch = html.match(/<h1[^>]*class="article-template__title"[^>]*>([\s\S]*?)<\/h1>/i);
  const title = titleMatch?.[1]?.replace(/<[^>]+>/g, '').trim() ?? '';
  const timeMatch = html.match(/<time[^>]*datetime="([^"]+)"/i);
  const publishedAt = timeMatch?.[1] ?? '';

  const contentStart = html.search(/class="article-template__content[\s\S]*?itemprop="articleBody"[\s\S]*?>/i);
  let bodyHtml = '';
  if (contentStart !== -1) {
    const afterOpen = html.indexOf('>', contentStart) + 1;
    const contentEnd = html.indexOf('<div class="article-template__social-sharing"', afterOpen);
    bodyHtml = html
      .slice(afterOpen, contentEnd > -1 ? contentEnd : undefined)
      .trim();
  }

  const imageMatch =
    html.match(/property="og:image"[^>]+content="(https:\/\/[^"]+)"/i) ??
    html.match(/article-template__hero-container[\s\S]*?<img[^>]+src="(https:\/\/[^"]+)"/i) ??
    html.match(/src="(https:\/\/[^"]*\/cdn\/shop\/articles\/[^"]+)"/i);

  return {
    handle,
    title,
    publishedAt,
    bodyHtml,
    image: imageMatch?.[1] ?? '',
    path: articlePath,
  };
}

async function syncBlogArticles() {
  const indexHtml = await fetchText(`${BASE}/blogs/urees-news`);
  const paths = [
    ...new Set(
      [...indexHtml.matchAll(/href="(\/blogs\/urees-news\/[^"#?]+)"/g)].map((match) => match[1])
    ),
  ].filter((p) => p !== '/blogs/urees-news');

  const articles = [];
  for (const articlePath of paths) {
    const html = await fetchText(`${BASE}${articlePath}`);
    const article = articleFromHtml(html, articlePath);
    if (article.title) articles.push(article);
  }

  return articles.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

async function main() {
  const [allData, ...collectionData] = await Promise.all([
    fetchJson(`${BASE}/products.json?limit=250`),
    ...COLLECTION_HANDLES.map((handle) =>
      fetchJson(`${BASE}/collections/${handle}/products.json?limit=250`).then((data) => ({
        handle,
        productHandles: data.products.map((product) => product.handle),
      }))
    ),
  ]);

  const products = allData.products.map(normalizeProduct);
  const byHandle = new Map(products.map((product) => [product.handle, product]));

  const collections = collectionData.map((collection) => ({
    handle: collection.handle,
    productHandles: collection.productHandles,
    products: collection.productHandles.map((handle) => byHandle.get(handle)).filter(Boolean),
  }));

  const pages = [];
  for (const handle of PAGE_HANDLES) {
    const data = await fetchJson(`${BASE}/pages/${handle}.json`);
    pages.push({
      handle: data.page.handle,
      title: data.page.title,
      bodyHtml: data.page.body_html || '',
    });
  }

  const policies = [];
  for (const handle of POLICY_HANDLES) {
    const data = await fetchJson(`${BASE}/policies/${handle}.json`);
    policies.push({
      handle,
      title: data.policy.title,
      bodyHtml: data.policy.body || '',
    });
  }

  const articles = await syncBlogArticles();
  const homeHtml = await fetchText(`${BASE}/`);
  const homepage = homepageFromHtml(homeHtml);

  for (const article of articles) {
    const featured = homepage.featuredNews?.find((item) => item.handle === article.handle);
    if (featured?.image && !article.image) article.image = featured.image;
    if (featured?.excerpt && !article.bodyHtml) article.excerpt = featured.excerpt;
  }

  const frontpage = collections.find((c) => c.handle === 'frontpage');
  const bestsellers = collections.find(
    (c) => c.handle === 'discover-the-best-in-sustainable-fashion-best-sellers-collection-urees'
  );

  const catalog = {
    syncedAt: new Date().toISOString(),
    source: BASE,
    currency: 'EUR',
    featuredHandles: frontpage?.productHandles ?? [],
    products,
    featured: (frontpage?.productHandles ?? [])
      .map((handle) => byHandle.get(handle))
      .filter(Boolean),
    collections: collections.map(({ handle, productHandles }) => ({ handle, productHandles })),
    bestsellerHandles: bestsellers?.productHandles ?? [],
    bestsellers: bestsellers?.products ?? [],
  };

  const site = {
    syncedAt: new Date().toISOString(),
    pages,
    policies,
    articles,
    homepage,
  };

  await fs.mkdir(DATA_DIR, { recursive: true });
  await Promise.all([
    fs.writeFile(path.join(DATA_DIR, 'catalog.json'), `${JSON.stringify(catalog, null, 2)}\n`),
    fs.writeFile(path.join(DATA_DIR, 'site.json'), `${JSON.stringify(site, null, 2)}\n`),
  ]);

  console.log(`Synced ${products.length} products`);
  console.log(`Synced ${pages.length} pages, ${policies.length} policies, ${articles.length} articles`);
  console.log(`→ src/data/urees/catalog.json`);
  console.log(`→ src/data/urees/site.json`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
