const HEADER_BAND_RATIO = 0.22;
const SAFE_MARGIN_PX = 24;

const BLUE_PATH_SELECTOR = 'path.cls-4, path[fill="#001FFF"], path[fill="#001fff"]';

function blueTopBand(svg: SVGSVGElement): { left: number; right: number } | null {
  const paths = svg.querySelectorAll<SVGGraphicsElement>(BLUE_PATH_SELECTOR);
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
  useCompactNav: boolean;
};

export function computeHomeNavPlacement(
  nav: HTMLElement,
  svg: SVGSVGElement | null
): HomeNavPlacement {
  const margin = SAFE_MARGIN_PX;
  const headerInner = nav.closest('.site-header__inner');
  const innerRect = headerInner?.getBoundingClientRect();
  const logo = headerInner?.querySelector('.site-header__logo-link');
  const logoRect = logo?.getBoundingClientRect();

  const availableRight = (innerRect?.right ?? window.innerWidth) - margin;
  const minLeft = logoRect ? logoRect.right + margin : margin;
  const availableWidth = availableRight - minLeft;

  if (availableWidth < 280 || nav.scrollWidth > availableWidth - 8) {
    return { useCompactNav: true };
  }

  const navRect = nav.getBoundingClientRect();
  const blue = svg ? blueTopBand(svg) : null;
  if (blue && navRect.left < blue.right + margin) {
    return { useCompactNav: true };
  }

  return { useCompactNav: false };
}

export const SPIRITUAL_COVER_READY_EVENT = 'spiritual-cover-ready';
