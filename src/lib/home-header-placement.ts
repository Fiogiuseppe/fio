const HEADER_BAND_RATIO = 0.22;
const SAFE_MARGIN_PX = 24;

function blueTopBand(svg: SVGSVGElement): { left: number; right: number } | null {
  const paths = svg.querySelectorAll<SVGGraphicsElement>('path.cls-4');
  const bandBottom = window.innerHeight * HEADER_BAND_RATIO;
  let left = Infinity;
  let right = 0;
  let found = false;

  paths.forEach((path) => {
    const rect = path.getBoundingClientRect();
    if (rect.width < 1 || rect.height < 1) return;
    if (rect.bottom < 0 || rect.top > bandBottom) return;
    found = true;
    left = Math.min(left, rect.left);
    right = Math.max(right, rect.right);
  });

  return found ? { left, right } : null;
}

export type HomeNavPlacement = {
  offsetPx: number;
  useCompactNav: boolean;
};

export function computeHomeNavPlacement(
  nav: HTMLElement,
  svg: SVGSVGElement | null
): HomeNavPlacement {
  const margin = SAFE_MARGIN_PX;
  const viewportRight = window.innerWidth - margin;
  const blue = svg ? blueTopBand(svg) : null;
  const safeLeft = blue ? blue.right + margin : margin;
  const safeRight = viewportRight;
  const safeWidth = Math.max(0, safeRight - safeLeft);

  if (safeWidth < 300 || nav.scrollWidth > safeWidth - 12) {
    return { offsetPx: 0, useCompactNav: true };
  }

  const navRect = nav.getBoundingClientRect();
  const safeCenter = safeLeft + safeWidth / 2;
  const navCenter = navRect.left + navRect.width / 2;
  let offset = safeCenter - navCenter;

  const nextLeft = navRect.left + offset;
  const nextRight = nextLeft + navRect.width;
  if (nextLeft < safeLeft) offset += safeLeft - nextLeft;
  if (nextRight > safeRight) offset -= nextRight - safeRight;

  return { offsetPx: offset, useCompactNav: false };
}

export const SPIRITUAL_COVER_READY_EVENT = 'spiritual-cover-ready';
