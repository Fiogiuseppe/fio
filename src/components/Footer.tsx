import Link from 'next/link';
import { SITE } from '@/data/site';

export function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-ink text-cream">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-3 md:px-10">
        <div>
          <p className="font-display text-2xl">{SITE.name}</p>
          <p className="mt-3 text-sm text-cream/70">
            Designer, art director, artist — {SITE.location}
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-cream/50">Connect</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href={`mailto:${SITE.email}`} className="text-cream hover:text-blue">
                {SITE.email}
              </a>
            </li>
            <li>
              <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="text-cream hover:text-blue">
                Instagram
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-cream/50">Explore</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="/work" className="text-cream hover:text-blue no-underline">Work</Link></li>
            <li><Link href="/shop" className="text-cream hover:text-blue no-underline">Shop</Link></li>
            <li><Link href="/journal" className="text-cream hover:text-blue no-underline">Journal</Link></li>
            <li><Link href="/contact" className="text-cream hover:text-blue no-underline">Contact</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-cream/10 px-6 py-6 text-center text-xs text-cream/40 md:px-10">
        © {new Date().getFullYear()} Giuseppe Fioretti
      </div>
    </footer>
  );
}
