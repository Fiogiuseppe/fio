export const CONIDE_OFFSET_STORAGE_KEY = 'fio-home-cover-conide-offset';
export const BLUE_SQUARE_OFFSET_STORAGE_KEY = 'fio-home-cover-blue-square-offset';
export const UREES_OFFSET_STORAGE_KEY = 'fio-home-cover-urees-offset-v2';

export type CoverOffset = {
  x: number;
  y: number;
};

export type CoverDragId = 'conide' | 'blue-square' | 'urees';

const ZERO_OFFSET: CoverOffset = { x: 0, y: 0 };

function isBlackFill(fill: string) {
  const value = fill.toLowerCase();
  return value === 'black' || value === '#000' || value === '#000000';
}

function isBlueFill(fill: string) {
  const value = fill.toLowerCase();
  return value === '#001fff' || value === 'rgb(0, 31, 255)';
}

export function loadCoverOffset(key: string): CoverOffset {
  try {
    const stored = window.localStorage.getItem(key);
    if (!stored) return ZERO_OFFSET;
    const parsed = JSON.parse(stored) as CoverOffset;
    if (!Number.isFinite(parsed.x) || !Number.isFinite(parsed.y)) return ZERO_OFFSET;
    return { x: parsed.x, y: parsed.y };
  } catch {
    return ZERO_OFFSET;
  }
}

export function saveCoverOffset(key: string, offset: CoverOffset) {
  try {
    window.localStorage.setItem(key, JSON.stringify(offset));
  } catch {
    // Ignore storage failures (private mode, quota, etc.).
  }
}

export function storageKeyForDragId(id: CoverDragId) {
  if (id === 'conide') return CONIDE_OFFSET_STORAGE_KEY;
  if (id === 'blue-square') return BLUE_SQUARE_OFFSET_STORAGE_KEY;
  return UREES_OFFSET_STORAGE_KEY;
}

/** Black circle with dot grid — the Conide easter-egg icon. */
export function identifyConideElements(svg: SVGSVGElement): SVGGraphicsElement[] {
  const paths = Array.from(svg.querySelectorAll('path'));
  let best: { path: SVGPathElement; dots: number } | null = null;

  for (const path of paths) {
    const bbox = path.getBBox();
    if (bbox.width < 48 || bbox.width > 180 || bbox.height < 48 || bbox.height > 180) continue;
    if (Math.abs(bbox.width - bbox.height) > 36) continue;
    if (!isBlackFill(path.getAttribute('fill') || '')) continue;

    const cx = bbox.x + bbox.width / 2;
    const cy = bbox.y + bbox.height / 2;
    let dots = 0;

    for (const dot of paths) {
      const box = dot.getBBox();
      if (box.width > 14 || box.height > 14) continue;
      if (!isBlackFill(dot.getAttribute('fill') || '')) continue;
      const px = box.x + box.width / 2;
      const py = box.y + box.height / 2;
      if (Math.hypot(px - cx, py - cy) < 72) dots += 1;
    }

    if (dots < 4) continue;
    if (!best || dots > best.dots) best = { path, dots };
  }

  if (!best) return [];

  const bbox = best.path.getBBox();
  const cx = bbox.x + bbox.width / 2;
  const cy = bbox.y + bbox.height / 2;

  return paths.filter((path) => {
    const box = path.getBBox();
    const px = box.x + box.width / 2;
    const py = box.y + box.height / 2;
    return Math.hypot(px - cx, py - cy) < 84;
  });
}

/** Hand-drawn blue square with eye motif — bottom-right of the cover. */
export function identifyBlueSquareElements(svg: SVGSVGElement): SVGGraphicsElement[] {
  const graphics = Array.from(
    svg.querySelectorAll('path, rect, circle, ellipse, line, polyline, polygon')
  ) as SVGGraphicsElement[];

  const blueBase = graphics.filter((element) => {
    if (element.tagName !== 'path') return false;
    const path = element as SVGPathElement;
    if (!isBlueFill(path.getAttribute('fill') || '')) return false;
    const box = path.getBBox();
    const cx = box.x + box.width / 2;
    const cy = box.y + box.height / 2;
    return cx > 1100 && cy > 700 && box.width > 200 && box.height > 200;
  });

  if (blueBase.length === 0) return [];

  let left = Infinity;
  let top = Infinity;
  let right = -Infinity;
  let bottom = -Infinity;

  for (const element of blueBase) {
    const box = element.getBBox();
    left = Math.min(left, box.x);
    top = Math.min(top, box.y);
    right = Math.max(right, box.x + box.width);
    bottom = Math.max(bottom, box.y + box.height);
  }

  const innerPad = 10;
  const innerLeft = left + innerPad;
  const innerTop = top + innerPad;
  const innerRight = right - innerPad;
  const innerBottom = bottom - innerPad;

  const isMeasurable = (box: DOMRect) =>
    box.width >= 1 && box.height >= 1 && Number.isFinite(box.width) && Number.isFinite(box.height);

  const centerInsideSquare = (box: DOMRect) => {
    const cx = box.x + box.width / 2;
    const cy = box.y + box.height / 2;
    return cx >= left && cx <= right && cy >= top && cy <= bottom;
  };

  const selected = new Set<SVGGraphicsElement>();

  for (const element of graphics) {
    const box = element.getBBox();
    if (!isMeasurable(box)) continue;

    const fill = element.getAttribute('fill') || '';
    if (isBlueFill(fill)) {
      if (centerInsideSquare(box)) selected.add(element);
      continue;
    }

    // Logo strokes inside the square only — never the caption below it.
    const cx = box.x + box.width / 2;
    const cy = box.y + box.height / 2;
    const elementBottom = box.y + box.height;
    if (
      cx >= innerLeft &&
      cx <= innerRight &&
      cy >= innerTop &&
      cy <= innerBottom &&
      elementBottom <= bottom + 1
    ) {
      selected.add(element);
    }
  }

  return Array.from(selected);
}

/** UREES stamp — compact square with eye motif, bottom-left of the cover. */
export function identifyUreesElements(svg: SVGSVGElement): SVGGraphicsElement[] {
  const graphics = Array.from(
    svg.querySelectorAll('path, rect, circle, ellipse, line, polyline, polygon')
  ) as SVGGraphicsElement[];

  const blueSeeds = graphics.filter((element) => {
    if (element.tagName !== 'path') return false;
    const path = element as SVGPathElement;
    if (!isBlueFill(path.getAttribute('fill') || '')) return false;
    const box = path.getBBox();
    const cx = box.x + box.width / 2;
    const cy = box.y + box.height / 2;
    return (
      cx >= 370 &&
      cx <= 620 &&
      cy >= 805 &&
      cy <= 975 &&
      box.width <= 80 &&
      box.height <= 80
    );
  });

  if (blueSeeds.length < 4) return [];

  let left = Infinity;
  let top = Infinity;
  let right = -Infinity;
  let bottom = -Infinity;

  for (const element of blueSeeds) {
    const box = element.getBBox();
    left = Math.min(left, box.x);
    top = Math.min(top, box.y);
    right = Math.max(right, box.x + box.width);
    bottom = Math.max(bottom, box.y + box.height);
  }

  const pad = 8;
  const innerLeft = left - pad;
  const innerTop = top - pad;
  const innerRight = right + pad;
  const innerBottom = bottom + pad;

  const isMeasurable = (box: DOMRect) =>
    box.width >= 0.5 && box.height >= 0.5 && Number.isFinite(box.width) && Number.isFinite(box.height);

  const centerInsideStamp = (box: DOMRect) => {
    const cx = box.x + box.width / 2;
    const cy = box.y + box.height / 2;
    return cx >= innerLeft && cx <= innerRight && cy >= innerTop && cy <= innerBottom;
  };

  const selected = new Set<SVGGraphicsElement>();

  for (const element of graphics) {
    const box = element.getBBox();
    if (!isMeasurable(box)) continue;

    const fill = element.getAttribute('fill') || '';
    if (!isBlueFill(fill) && !isBlackFill(fill)) continue;
    if (centerInsideStamp(box)) selected.add(element);
  }

  return Array.from(selected);
}

export function wrapElementsInDragGroup(
  svg: SVGSVGElement,
  elements: SVGGraphicsElement[],
  id: CoverDragId
): SVGGElement | null {
  if (elements.length === 0) return null;
  if (svg.querySelector(`[data-cover-drag="${id}"]`)) {
    return svg.querySelector(`[data-cover-drag="${id}"]`);
  }

  const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  group.setAttribute('data-cover-drag', id);
  group.classList.add('spiritual-cover__drag-layer');

  const parent = elements[0].parentNode;
  if (!parent) return null;

  parent.insertBefore(group, elements[0]);
  elements.forEach((element) => group.appendChild(element));
  return group;
}

/** Convert a screen-pixel drag delta into SVG user units for `transform`. */
export function screenOffsetToSvgTranslate(svg: SVGSVGElement, offset: CoverOffset): CoverOffset {
  const ctm = svg.getScreenCTM();
  if (!ctm || ctm.a === 0 || ctm.d === 0) return offset;
  return {
    x: offset.x / ctm.a,
    y: offset.y / ctm.d,
  };
}

export function applyCoverGroupOffset(
  svg: SVGSVGElement,
  group: SVGGElement,
  offset: CoverOffset
) {
  if (!offset.x && !offset.y) {
    group.removeAttribute('transform');
    return;
  }
  const svgOffset = screenOffsetToSvgTranslate(svg, offset);
  group.setAttribute('transform', `translate(${svgOffset.x} ${svgOffset.y})`);
}

export function setupCoverDragLayers(svg: SVGSVGElement) {
  const layers: Partial<Record<CoverDragId, SVGGElement>> = {};

  const conideElements = identifyConideElements(svg);
  const conideGroup = wrapElementsInDragGroup(svg, conideElements, 'conide');
  if (conideGroup) {
    applyCoverGroupOffset(svg, conideGroup, loadCoverOffset(CONIDE_OFFSET_STORAGE_KEY));
    layers.conide = conideGroup;
  }

  const squareElements = identifyBlueSquareElements(svg);
  const squareGroup = wrapElementsInDragGroup(svg, squareElements, 'blue-square');
  if (squareGroup) {
    applyCoverGroupOffset(svg, squareGroup, loadCoverOffset(BLUE_SQUARE_OFFSET_STORAGE_KEY));
    layers['blue-square'] = squareGroup;
  }

  const ureesElements = identifyUreesElements(svg);
  const ureesGroup = wrapElementsInDragGroup(svg, ureesElements, 'urees');
  if (ureesGroup) {
    applyCoverGroupOffset(svg, ureesGroup, loadCoverOffset(UREES_OFFSET_STORAGE_KEY));
    layers.urees = ureesGroup;
  }

  return layers;
}

export const COVER_DRAG_THRESHOLD_PX = 8;
