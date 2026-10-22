const emDash = String.fromCodePoint(0x2014);
const emDashPattern = new RegExp(
  `[ \\t\\u00a0]*(?:${emDash}|&mdash;|&#0*8212;|&#x0*2014;)[ \\t\\u00a0]*`,
  'gi',
);

/** Normalize imported copy before it is saved, keeping resource identities intact. */
export function normalizeWebsiteText(text, separator = ', ') {
  return text.replace(emDashPattern, separator).replace(/([.!?:;,]), /g, '$1 ');
}

const identityKeys = new Set([
  'id', 'slug', 'handle', 'href', 'src', 'url', 'uri', 'shortcode', 'permalink',
  'image', 'images', 'coverImage', 'heroImage', 'framedImage', 'mediumUrl',
]);

export function normalizeWebsiteCopy(value, key = '') {
  if (identityKeys.has(key) || /urls?$/i.test(key)) return value;
  if (typeof value === 'string') {
    if (/^(?:https?:\/\/|\/[^\s])/.test(value)) return value;
    return normalizeWebsiteText(value, /^(?:title|name|alt|edition)$/.test(key) ? ': ' : ', ');
  }
  if (Array.isArray(value)) return value.map((item) => normalizeWebsiteCopy(item, key));
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([childKey, child]) => [childKey, normalizeWebsiteCopy(child, childKey)]),
    );
  }
  return value;
}
