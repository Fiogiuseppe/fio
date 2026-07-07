const BLUE = '#001fff';

const STROKE_DURATION_MS = 900;
const STAGGER_MS = 55;

const BLUE_PATH_SELECTOR = 'path.st2, path.cls-4, path[fill="#001FFF"], path[fill="#001fff"]';
const LINE_SELECTOR = 'line.st1, line.cls-2, path.cls-2';

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function sortByPosition(elements: SVGPathElement[]) {
  return [...elements].sort((a, b) => {
    const boxA = a.getBBox();
    const boxB = b.getBBox();
    return boxA.y - boxB.y || boxA.x - boxB.x;
  });
}

function prepareStrokePath(path: SVGPathElement, stroke: string, width: string) {
  const length = path.getTotalLength();
  if (!length || !Number.isFinite(length)) return null;

  path.style.fill = 'none';
  path.style.stroke = stroke;
  path.style.strokeWidth = width;
  path.style.strokeLinecap = 'round';
  path.style.strokeLinejoin = 'round';
  path.style.strokeDasharray = `${length}`;
  path.style.strokeDashoffset = `${length}`;
  path.style.vectorEffect = 'non-scaling-stroke';

  return length;
}

function animateLine(line: SVGLineElement, delay: number) {
  const x1 = Number(line.getAttribute('x1') ?? 0);
  const y1 = Number(line.getAttribute('y1') ?? 0);
  const x2 = Number(line.getAttribute('x2') ?? 0);
  const y2 = Number(line.getAttribute('y2') ?? 0);
  const length = Math.hypot(x2 - x1, y2 - y1);

  line.style.stroke = '#000';
  line.style.strokeWidth = '2px';
  line.style.strokeDasharray = `${length}`;
  line.style.strokeDashoffset = `${length}`;
  line.style.transition = `stroke-dashoffset 700ms ease-in-out ${delay}ms`;

  window.setTimeout(() => {
    line.style.strokeDashoffset = '0';
  }, 40);
}

export function animateSpiritualDesignSvg(svg: SVGSVGElement) {
  const bluePaths = sortByPosition(
    Array.from(svg.querySelectorAll(BLUE_PATH_SELECTOR)) as SVGPathElement[]
  );

  if (prefersReducedMotion()) {
    bluePaths.forEach((path) => {
      path.style.fill = BLUE;
    });
    return;
  }

  const lines = Array.from(svg.querySelectorAll(LINE_SELECTOR)) as SVGLineElement[];
  lines.forEach((line, index) => animateLine(line, index * 120));

  let delay = 500;

  bluePaths.forEach((path) => {
    if (path.closest('[data-cover-drag]')) return;

    const length = prepareStrokePath(path, BLUE, '2.4');
    if (!length) return;

    path.style.transition = `stroke-dashoffset ${STROKE_DURATION_MS}ms cubic-bezier(0.45, 0, 0.2, 1) ${delay}ms, fill 500ms ease ${delay + STROKE_DURATION_MS - 100}ms`;

    window.setTimeout(() => {
      path.style.strokeDashoffset = '0';
      window.setTimeout(() => {
        path.style.fill = BLUE;
        path.style.stroke = BLUE;
        path.style.strokeWidth = '0.35';
      }, STROKE_DURATION_MS - 80);
    }, 40);

    delay += STAGGER_MS;
  });
}
