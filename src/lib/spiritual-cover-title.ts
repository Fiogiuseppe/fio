export const SPIRITUAL_TITLE_STORAGE_KEY = 'fio-home-spiritual-title';

export const SPIRITUAL_TITLE_DEFAULTS = {
  line1: 'Spiritual',
  line2: 'design',
} as const;

export type SpiritualTitleLines = {
  line1: string;
  line2: string;
};

export type SpiritualTitleLineRegion = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type FrameRect = {
  left: number;
  top: number;
  width: number;
  height: number;
};

/** ViewBox regions for the two hand-drawn title lines on the cover SVG. */
export const SPIRITUAL_TITLE_REGIONS: [SpiritualTitleLineRegion, SpiritualTitleLineRegion] = [
  { x: 168, y: 133, width: 912, height: 194 },
  { x: 88, y: 313, width: 914, height: 218 },
];

const MAX_LINE_LENGTH = 28;
const FONT_FAMILY = "'Quartz Defio', Georgia, serif";

export function sanitizeTitleLine(value: string): string {
  return value.replace(/[\r\n]+/g, ' ').replace(/\s+/g, ' ').trim().slice(0, MAX_LINE_LENGTH);
}

export function loadSpiritualTitle(): SpiritualTitleLines {
  try {
    const stored = window.localStorage.getItem(SPIRITUAL_TITLE_STORAGE_KEY);
    if (!stored) return { ...SPIRITUAL_TITLE_DEFAULTS };

    const parsed = JSON.parse(stored) as Partial<SpiritualTitleLines>;
    const line1 = sanitizeTitleLine(parsed.line1 ?? '');
    const line2 = sanitizeTitleLine(parsed.line2 ?? '');

    if (!line1 && !line2) return { ...SPIRITUAL_TITLE_DEFAULTS };

    return {
      line1: line1 || SPIRITUAL_TITLE_DEFAULTS.line1,
      line2: line2 || SPIRITUAL_TITLE_DEFAULTS.line2,
    };
  } catch {
    return { ...SPIRITUAL_TITLE_DEFAULTS };
  }
}

export function saveSpiritualTitle(lines: SpiritualTitleLines) {
  const line1 = sanitizeTitleLine(lines.line1);
  const line2 = sanitizeTitleLine(lines.line2);
  const isDefault =
    line1 === SPIRITUAL_TITLE_DEFAULTS.line1 && line2 === SPIRITUAL_TITLE_DEFAULTS.line2;

  try {
    if (isDefault) {
      window.localStorage.removeItem(SPIRITUAL_TITLE_STORAGE_KEY);
      return;
    }
    window.localStorage.setItem(
      SPIRITUAL_TITLE_STORAGE_KEY,
      JSON.stringify({ line1, line2 } satisfies SpiritualTitleLines)
    );
  } catch {
    // Ignore storage failures (private mode, quota, etc.).
  }
}

/** Black letter paths for the default “Spiritual / design” title. */
export function identifySpiritualTitlePaths(svg: SVGSVGElement): SVGPathElement[] {
  return Array.from(svg.querySelectorAll('path')).filter((path) => {
    const box = path.getBBox();
    const fill = (path.getAttribute('fill') || '').toLowerCase();
    if (fill !== 'black') return false;
    if (box.x < 40 || box.x > 1050) return false;
    if (box.y < 40 || box.y > 520) return false;
    if (box.width > 500 || box.height > 200) return false;
    return box.width > 8 || box.height > 8;
  });
}

function hideTitlePaths(paths: SVGPathElement[]) {
  for (const path of paths) {
    path.setAttribute('data-spiritual-title-path', 'true');
    path.style.opacity = '0';
    path.style.pointerEvents = 'none';
  }
}

function fitTextElement(text: SVGTextElement, content: string, region: SpiritualTitleLineRegion) {
  if (!content) {
    text.textContent = '';
    return;
  }

  text.textContent = content;
  text.setAttribute('x', String(region.x));
  text.setAttribute('y', String(region.y + region.height * 0.86));
  text.setAttribute('fill', '#0a0a0a');
  text.setAttribute('font-family', FONT_FAMILY);
  text.setAttribute('font-weight', '400');
  text.setAttribute('letter-spacing', '-0.02em');

  let fontSize = region.height * 0.92;
  const minSize = 20;

  while (fontSize >= minSize) {
    text.setAttribute('font-size', String(fontSize));
    const bbox = text.getBBox();
    if (bbox.width <= region.width + 1 && bbox.height <= region.height + 2) break;
    fontSize -= 1;
  }
}

async function ensureTitleFont() {
  try {
    await document.fonts.load(`400 120px ${FONT_FAMILY}`);
    await document.fonts.ready;
  } catch {
    // Fall back to Georgia if Quartz fails to load.
  }
}

export function setupSpiritualTitle(svg: SVGSVGElement) {
  const paths = identifySpiritualTitlePaths(svg);
  hideTitlePaths(paths);

  const ns = 'http://www.w3.org/2000/svg';
  let group = svg.querySelector('[data-spiritual-title-overlay]') as SVGGElement | null;

  if (!group) {
    group = document.createElementNS(ns, 'g');
    group.setAttribute('data-spiritual-title-overlay', '');
    group.classList.add('spiritual-cover__title-overlay');

    const line1 = document.createElementNS(ns, 'text');
    line1.setAttribute('data-spiritual-title-line', '1');

    const line2 = document.createElementNS(ns, 'text');
    line2.setAttribute('data-spiritual-title-line', '2');

    group.append(line1, line2);
    svg.appendChild(group);
  }

  const text1 = group.querySelector('[data-spiritual-title-line="1"]') as SVGTextElement;
  const text2 = group.querySelector('[data-spiritual-title-line="2"]') as SVGTextElement;

  const applyLines = async (lines: SpiritualTitleLines) => {
    await ensureTitleFont();
    fitTextElement(text1, sanitizeTitleLine(lines.line1), SPIRITUAL_TITLE_REGIONS[0]);
    fitTextElement(text2, sanitizeTitleLine(lines.line2), SPIRITUAL_TITLE_REGIONS[1]);
  };

  return { applyLines };
}

function measureRegionInFrame(
  svg: SVGSVGElement,
  frame: HTMLElement,
  region: SpiritualTitleLineRegion
): FrameRect | null {
  const ctm = svg.getScreenCTM();
  if (!ctm) return null;

  const point = svg.createSVGPoint();
  const corners = [
    { x: region.x, y: region.y },
    { x: region.x + region.width, y: region.y },
    { x: region.x, y: region.y + region.height },
    { x: region.x + region.width, y: region.y + region.height },
  ];

  const frameRect = frame.getBoundingClientRect();
  let left = Infinity;
  let top = Infinity;
  let right = -Infinity;
  let bottom = -Infinity;

  for (const corner of corners) {
    point.x = corner.x;
    point.y = corner.y;
    const screen = point.matrixTransform(ctm);
    left = Math.min(left, screen.x);
    top = Math.min(top, screen.y);
    right = Math.max(right, screen.x);
    bottom = Math.max(bottom, screen.y);
  }

  if (!Number.isFinite(left)) return null;

  return {
    left: left - frameRect.left,
    top: top - frameRect.top,
    width: right - left,
    height: bottom - top,
  };
}

export function measureSpiritualTitleHotspot(
  svg: SVGSVGElement,
  frame: HTMLElement
): FrameRect | null {
  const [line1, line2] = SPIRITUAL_TITLE_REGIONS;
  const union: SpiritualTitleLineRegion = {
    x: Math.min(line1.x, line2.x),
    y: Math.min(line1.y, line2.y),
    width: Math.max(line1.x + line1.width, line2.x + line2.width) - Math.min(line1.x, line2.x),
    height: Math.max(line1.y + line1.height, line2.y + line2.height) - Math.min(line1.y, line2.y),
  };

  return measureRegionInFrame(svg, frame, union);
}

export function measureSpiritualTitleLineRects(
  svg: SVGSVGElement,
  frame: HTMLElement
): [FrameRect, FrameRect] | null {
  const rects = SPIRITUAL_TITLE_REGIONS.map((region) =>
    measureRegionInFrame(svg, frame, region)
  );

  if (!rects[0] || !rects[1]) return null;
  return [rects[0], rects[1]];
}

export function titleFontSizeForRect(rect: FrameRect) {
  return Math.max(16, Math.round(rect.height * 0.78));
}
