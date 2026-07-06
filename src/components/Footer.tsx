import Link from 'next/link';
import { SITE, NAV } from '@/data/site';
import {
  TypographyBody,
  TypographyCard,
  TypographyLabel,
  TypographyMeta,
} from '@/components/typography';
import { editorial } from '@/lib/typography';

export function Footer() {
  const explore = NAV.filter((item) => item.href !== '/');

  return (
    <footer className="surface-dark border-t border-white/10">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-3 md:px-10 md:py-20">
        <div>
          <TypographyCard>{SITE.name}</TypographyCard>
          <TypographyBody measure={false} className={`${editorial.stack.sectionToContent} text-on-dark-muted`}>
            Designer, art director, artist — {SITE.location}. A creative universe of brands,
            campaigns and original work.
          </TypographyBody>
        </div>

        <div>
          <TypographyLabel className="text-on-dark-subtle">Explore</TypographyLabel>
          <ul className={`${editorial.stack.block} space-y-2`}>
            {explore.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="no-underline hover:text-blue">
                  <TypographyMeta className="text-on-dark/80">{item.label}</TypographyMeta>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <TypographyLabel className="text-on-dark-subtle">Connect</TypographyLabel>
          <ul className={`${editorial.stack.block} space-y-2`}>
            <li>
              <a href={`mailto:${SITE.email}`} className="no-underline hover:text-blue">
                <TypographyMeta className="text-on-dark/80">{SITE.email}</TypographyMeta>
              </a>
            </li>
            <li>
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline hover:text-blue"
              >
                <TypographyMeta className="text-on-dark/80">Instagram</TypographyMeta>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-6 text-center md:px-10">
        <TypographyMeta className="text-on-dark-faint">
          © {new Date().getFullYear()} Giuseppe Fioretti
        </TypographyMeta>
      </div>
    </footer>
  );
}
