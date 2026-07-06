const CONIDE_HREF = '/the-conide';

/** Attach a click target to the Conide icon inside the home spiritual-design SVG. */
export function attachConideHomeLink(svg: SVGSVGElement) {
  if (svg.querySelector('[data-conide-link]')) return;

  const paths = Array.from(svg.querySelectorAll('path'));
  let best: { path: SVGPathElement; dots: number; size: number } | null = null;

  for (const path of paths) {
    const bbox = path.getBBox();
    if (bbox.width < 70 || bbox.width > 130 || bbox.height < 70 || bbox.height > 130) continue;
    if (Math.abs(bbox.width - bbox.height) > 20) continue;

    const fill = (path.getAttribute('fill') || path.style.fill || '').toLowerCase();
    if (fill !== 'black' && fill !== '#000' && fill !== '#000000') continue;

    const cx = bbox.x + bbox.width / 2;
    const cy = bbox.y + bbox.height / 2;
    let dots = 0;

    for (const dot of paths) {
      const b = dot.getBBox();
      if (b.width > 10 || b.height > 10) continue;
      const px = b.x + b.width / 2;
      const py = b.y + b.height / 2;
      if (Math.hypot(px - cx, py - cy) < 60) dots += 1;
    }

    if (dots < 5) continue;

    const size = bbox.width * bbox.height;
    if (!best || dots > best.dots || (dots === best.dots && size < best.size)) {
      best = { path, dots, size };
    }
  }

  if (!best) return;

  const anchor = pathClusterAnchor(svg, best.path, paths);
  anchor.setAttribute('data-conide-link', 'true');
  anchor.setAttribute('href', CONIDE_HREF);
  anchor.setAttribute('aria-label', 'The Conide — I have seen a Conide');
  anchor.classList.add('spiritual-cover__conide-link');

  const bbox = best.path.getBBox();
  const pad = 12;
  const hit = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  hit.setAttribute('x', String(bbox.x - pad));
  hit.setAttribute('y', String(bbox.y - pad));
  hit.setAttribute('width', String(bbox.width + pad * 2));
  hit.setAttribute('height', String(bbox.height + pad * 2));
  hit.setAttribute('fill', 'transparent');
  hit.setAttribute('pointer-events', 'all');
  anchor.appendChild(hit);
}

function pathClusterAnchor(
  svg: SVGSVGElement,
  circlePath: SVGPathElement,
  paths: SVGPathElement[]
): SVGAElement {
  const NS = 'http://www.w3.org/2000/svg';
  const link = document.createElementNS(NS, 'a') as SVGAElement;
  const bbox = circlePath.getBBox();
  const cx = bbox.x + bbox.width / 2;
  const cy = bbox.y + bbox.height / 2;

  const cluster = paths.filter((path) => {
    const b = path.getBBox();
    const px = b.x + b.width / 2;
    const py = b.y + b.height / 2;
    return Math.hypot(px - cx, py - cy) < 65;
  });

  const parent = circlePath.parentNode;
  if (!parent) {
    svg.appendChild(link);
    link.appendChild(circlePath);
    cluster.forEach((p) => {
      if (p !== circlePath) link.appendChild(p);
    });
    return link;
  }

  parent.insertBefore(link, circlePath);
  cluster.forEach((path) => link.appendChild(path));
  return link;
}
