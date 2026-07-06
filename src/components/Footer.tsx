import Link from 'next/link';
import { SITE, NAV } from '@/data/site';

export function Footer() {
  const explore = NAV.filter((item) => item.href !== '/');

  return (
    <footer className="border-t border-ink/10 bg-ink text-cream">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-3 md:px-10 md:py-20">
        <div>
          <p className="font-display text-2xl md:text-3xl">{SITE.name}</p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/60">
            Designer, art director, artist — {SITE.location}. A creative universe of brands,
            campaigns and original work.
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-cream/40">Explore</p>
          <ul className="mt-5 space-y-2.5">
            {explore.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-cream/80 no-underline hover:text-blue">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-cream/40">Connect</p>
          <ul className="mt-5 space-y-2.5 text-sm">
            <li>
              <a href={`mailto:${SITE.email}`} className="text-cream/80 hover:text-blue">
                {SITE.email}
              </a>
            </li>
            <li>
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream/80 hover:text-blue"
              >
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10 px-6 py-6 text-center text-xs text-cream/35 md:px-10">
        © {new Date().getFullYear()} Giuseppe Fioretti
      </div>
    </footer>
  );
}
