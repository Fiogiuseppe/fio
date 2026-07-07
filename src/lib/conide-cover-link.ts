export const CONIDE_HREF = '/the-conide';

import { identifyBlueSquareElements, identifyUreesElements } from '@/lib/spiritual-cover-drag';

export type CoverHotspot = {
  left: number;
  top: number;
  width: number;
  height: number;
};

/** @deprecated Use CoverHotspot */
export type ConideHotspot = CoverHotspot;

const VIEWBOX = { width: 1920, height: 1080 };

function isBlueFill(fill: string) {
  const value = fill.toLowerCase();
  return value === '#001fff' || value === 'rgb(0, 31, 255)';
}

function unionClientRects(elements: SVGGraphicsElement[], pad: number) {
  let left = Infinity;
  let top = Infinity;
  let right = -Infinity;
  let bottom = -Infinity;

  for (const element of elements) {
    const rect = element.getBoundingClientRect();
    if (rect.width < 0.5 || rect.height < 0.5) continue;
    left = Math.min(left, rect.left);
    top = Math.min(top, rect.top);
    right = Math.max(right, rect.right);
    bottom = Math.max(bottom, rect.bottom);
  }

  if (!Number.isFinite(left)) return null;

  return {
    left: left - pad,
    top: top - pad,
    right: right + pad,
    bottom: bottom + pad,
  };
}

function isBlackFill(fill: string) {
  const value = fill.toLowerCase();
  return value === 'black' || value === '#000' || value === '#000000';
}

function measureFromBlackDotCluster(svg: SVGSVGElement): ConideHotspot | null {
  const paths = Array.from(svg.querySelectorAll('path'));
  let best: { path: SVGPathElement; dots: number; size: number } | null = null;

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

    const size = bbox.width * bbox.height;
    if (!best || dots > best.dots || (dots === best.dots && size < best.size)) {
      best = { path, dots, size };
    }
  }

  if (!best) return null;

  const frame = svg.closest('.spiritual-cover__frame')?.getBoundingClientRect();
  if (!frame) return null;

  const bbox = best.path.getBBox();
  const cx = bbox.x + bbox.width / 2;
  const cy = bbox.y + bbox.height / 2;
  const cluster = paths.filter((path) => {
    const box = path.getBBox();
    const px = box.x + box.width / 2;
    const py = box.y + box.height / 2;
    return Math.hypot(px - cx, py - cy) < 84;
  });

  const union = unionClientRects(cluster, 16);
  if (!union) return null;

  return {
    left: union.left - frame.left,
    top: union.top - frame.top,
    width: union.right - union.left,
    height: union.bottom - union.top,
  };
}

function measureFromBlueDotCluster(svg: SVGSVGElement): ConideHotspot | null {
  const paths = Array.from(svg.querySelectorAll('path'));
  const blueDots = paths.filter((path) => {
    if (!isBlueFill(path.getAttribute('fill') || '')) return false;
    const box = path.getBBox();
    return (
      box.x >= 470 &&
      box.x <= 610 &&
      box.y >= 820 &&
      box.y <= 930 &&
      box.width <= 14 &&
      box.height <= 14
    );
  });

  if (blueDots.length < 4) return null;

  const union = unionClientRects(blueDots, 28);
  if (!union) return null;

  const frame = svg.closest('.spiritual-cover__frame')?.getBoundingClientRect();
  if (!frame) return null;

  return {
    left: union.left - frame.left,
    top: union.top - frame.top,
    width: union.right - union.left,
    height: union.bottom - union.top,
  };
}

function measureFromBlackCircle(svg: SVGSVGElement): ConideHotspot | null {
  const paths = Array.from(svg.querySelectorAll('path'));
  let best: { path: SVGPathElement; dots: number; size: number } | null = null;

  for (const path of paths) {
    const bbox = path.getBBox();
    if (bbox.width < 48 || bbox.width > 180 || bbox.height < 48 || bbox.height > 180) continue;
    if (Math.abs(bbox.width - bbox.height) > 36) continue;

    const fill = (path.getAttribute('fill') || path.style.fill || '').toLowerCase();
    if (fill !== 'black' && fill !== '#000' && fill !== '#000000') continue;

    const cx = bbox.x + bbox.width / 2;
    const cy = bbox.y + bbox.height / 2;
    let dots = 0;

    for (const dot of paths) {
      const b = dot.getBBox();
      if (b.width > 14 || b.height > 14) continue;
      const dotFill = (dot.getAttribute('fill') || '').toLowerCase();
      if (!isBlueFill(dotFill) && !isBlackFill(dotFill)) continue;
      const px = b.x + b.width / 2;
      const py = b.y + b.height / 2;
      if (Math.hypot(px - cx, py - cy) < 72) dots += 1;
    }

    if (dots < 4) continue;

    const size = bbox.width * bbox.height;
    if (!best || dots > best.dots || (dots === best.dots && size < best.size)) {
      best = { path, dots, size };
    }
  }

  if (!best) return null;

  const frame = svg.closest('.spiritual-cover__frame')?.getBoundingClientRect();
  if (!frame) return null;

  const rect = best.path.getBoundingClientRect();
  const pad = 16;

  return {
    left: rect.left - frame.left - pad,
    top: rect.top - frame.top - pad,
    width: rect.width + pad * 2,
    height: rect.height + pad * 2,
  };
}

function fallbackHotspot(container: HTMLElement): ConideHotspot {
  const width = container.clientWidth;
  const height = container.clientHeight;
  const size = Math.min(width, height) * 0.11;

  return {
    left: width * 0.78,
    top: height * 0.08,
    width: size,
    height: size,
  };
}

function measureFromDragGroup(
  svg: SVGSVGElement,
  id: 'conide' | 'blue-square' | 'urees',
  pad: number
): CoverHotspot | null {
  const frame = svg.closest('.spiritual-cover__frame')?.getBoundingClientRect();
  if (!frame) return null;

  const dragGroup = svg.querySelector(`[data-cover-drag="${id}"]`) as SVGGElement | null;
  if (!dragGroup) return null;

  const elements = Array.from(
    dragGroup.querySelectorAll('path, rect, circle, ellipse, line, polyline, polygon')
  ) as SVGGraphicsElement[];
  const union = unionClientRects(elements.length ? elements : [dragGroup], pad);
  if (!union) return null;

  return {
    left: union.left - frame.left,
    top: union.top - frame.top,
    width: union.right - union.left,
    height: union.bottom - union.top,
  };
}

/** Locate the Conide icon on the home spiritual-design cover for a click hotspot. */
export function measureConideHotspot(
  svg: SVGSVGElement,
  container: HTMLElement
): ConideHotspot {
  return (
    measureFromDragGroup(svg, 'conide', 16) ??
    measureFromBlackDotCluster(svg) ??
    measureFromBlueDotCluster(svg) ??
    measureFromBlackCircle(svg) ??
    fallbackHotspot(container)
  );
}

export function measureBlueSquareHotspot(
  svg: SVGSVGElement,
  container: HTMLElement
): CoverHotspot | null {
  const fromGroup = measureFromDragGroup(svg, 'blue-square', 12);
  if (fromGroup) return fromGroup;

  const frame = svg.closest('.spiritual-cover__frame')?.getBoundingClientRect();
  if (!frame) return null;

  const elements = identifyBlueSquareElements(svg);
  const union = unionClientRects(elements, 12);
  if (union) {
    return {
      left: union.left - frame.left,
      top: union.top - frame.top,
      width: union.right - union.left,
      height: union.bottom - union.top,
    };
  }

  const width = container.clientWidth;
  const height = container.clientHeight;
  const size = Math.min(width, height) * 0.22;

  return {
    left: width * 0.7,
    top: height * 0.58,
    width: size,
    height: size,
  };
}

export function measureUreesHotspot(
  svg: SVGSVGElement,
  container: HTMLElement
): CoverHotspot | null {
  const fromGroup = measureFromDragGroup(svg, 'urees', 12);
  if (fromGroup) return fromGroup;

  const frame = svg.closest('.spiritual-cover__frame')?.getBoundingClientRect();
  if (!frame) return null;

  const elements = identifyUreesElements(svg);
  const union = unionClientRects(elements, 12);
  if (union) {
    return {
      left: union.left - frame.left,
      top: union.top - frame.top,
      width: union.right - union.left,
      height: union.bottom - union.top,
    };
  }

  const width = container.clientWidth;
  const height = container.clientHeight;
  const size = Math.min(width, height) * 0.14;

  return {
    left: width * 0.22,
    top: height * 0.72,
    width: size,
    height: size * 0.72,
  };
}

export function conideHotspotIsRound(hotspot: ConideHotspot) {
  return Math.abs(hotspot.width - hotspot.height) < 24;
}

export { VIEWBOX as CONIDE_COVER_VIEWBOX };
