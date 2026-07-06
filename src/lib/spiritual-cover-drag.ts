export const CONIDE_OFFSET_STORAGE_KEY = 'fio-home-cover-conide-offset';
export const BLUE_SQUARE_OFFSET_STORAGE_KEY = 'fio-home-cover-blue-square-offset';

export type CoverOffset = {
  x: number;
  y: number;
};

export type CoverDragId = 'conide' | 'blue-square';

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
  return id === 'conide' ? CONIDE_OFFSET_STORAGE_KEY : BLUE_SQUARE_OFFSET_STORAGE_KEY;
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
  const paths = Array.from(svg.querySelectorAll('path'));

  return paths.filter((path) => {
    if (!isBlueFill(path.getAttribute('fill') || '')) return false;
    const box = path.getBBox();
    const cx = box.x + box.width / 2;
    const cy = box.y + box.height / 2;
    return cx > 1100 && cy > 700 && box.width > 200 && box.height > 200;
  });
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

export function applyCoverGroupOffset(group: SVGGElement, offset: CoverOffset) {
  if (!offset.x && !offset.y) {
    group.removeAttribute('transform');
    return;
  }
  group.setAttribute('transform', `translate(${offset.x} ${offset.y})`);
}

export function setupCoverDragLayers(svg: SVGSVGElement) {
  const layers: Partial<Record<CoverDragId, SVGGElement>> = {};

  const conideElements = identifyConideElements(svg);
  const conideGroup = wrapElementsInDragGroup(svg, conideElements, 'conide');
  if (conideGroup) {
    applyCoverGroupOffset(conideGroup, loadCoverOffset(CONIDE_OFFSET_STORAGE_KEY));
    layers.conide = conideGroup;
  }

  const squareElements = identifyBlueSquareElements(svg);
  const squareGroup = wrapElementsInDragGroup(svg, squareElements, 'blue-square');
  if (squareGroup) {
    applyCoverGroupOffset(squareGroup, loadCoverOffset(BLUE_SQUARE_OFFSET_STORAGE_KEY));
    layers['blue-square'] = squareGroup;
  }

  return layers;
}

export const COVER_DRAG_THRESHOLD_PX = 8;
