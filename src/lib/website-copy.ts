const emDash = String.fromCodePoint(0x2014);
const marker = new RegExp(
  `[ \\t\\u00a0]*(?:${emDash}|&(?:mdash|#0*8212|#x0*2014);)[ \\t\\u00a0]*`,
  'gi',
);

const identityKeys = new Set([
  'id', 'slug', 'handle', 'href', 'src', 'url', 'uri', 'shortcode', 'permalink',
  'image', 'images', 'coverImage', 'heroImage', 'framedImage', 'mediumUrl',
]);

/** Keep the imported archive intact and normalize its public copy before rendering. */
export function normalizeImportedCopy<T>(value: T, key = ''): T {
  if (identityKeys.has(key) || /urls?$/i.test(key)) return value;
  if (typeof value === 'string') {
    if (/^(?:https?:\/\/|\/[^\s])/.test(value)) return value;
    const separator = /^(?:title|name|alt|edition)$/.test(key) ? ': ' : ', ';
    return value.replace(marker, separator).replace(/([.!?:;,]), /g, '$1 ') as T;
  }
  if (Array.isArray(value)) return value.map((item) => normalizeImportedCopy(item, key)) as T;
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([childKey, child]) => [childKey, normalizeImportedCopy(child, childKey)]),
    ) as T;
  }
  return value;
}
