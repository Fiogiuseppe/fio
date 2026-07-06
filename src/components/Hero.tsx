import Link from 'next/link';
import {
  TypographyCard,
  TypographyHero,
  TypographyLabel,
  TypographyLead,
  TypographyMeta,
} from '@/components/typography';
import { editorial } from '@/lib/typography';

type PathCard = {
  href: string;
  title: string;
  description: string;
};

type HeroProps = {
  title: string;
  subtitle: string;
  paths?: PathCard[];
};

export function Hero({ title, subtitle, paths }: HeroProps) {
  return (
    <section className="relative flex min-h-[85vh] flex-col justify-end px-6 pb-16 pt-32 md:px-10 md:pb-24">
      <div className="mx-auto w-full max-w-7xl">
        <TypographyLabel>Giuseppe Fioretti</TypographyLabel>
        <TypographyHero className={`max-w-4xl ${editorial.stack.labelToTitle}`}>
          {title}
        </TypographyHero>
        <TypographyLead className={`max-w-xl ${editorial.stack.titleToLead}`}>
          {subtitle}
        </TypographyLead>

        {paths && (
          <div className={`grid gap-8 md:grid-cols-3 ${editorial.stack.page}`}>
            {paths.map((path) => (
              <Link
                key={path.href}
                href={path.href}
                className="group border-t border-ink/20 pt-8 no-underline transition hover:border-blue"
              >
                <TypographyCard className="text-ink group-hover:text-blue">{path.title}</TypographyCard>
                <TypographyMeta as="p" className={editorial.stack.sectionToContent}>
                  {path.description}
                </TypographyMeta>
                <TypographyLabel className={`${editorial.stack.block} text-ink/40 group-hover:text-blue`}>
                  Explore →
                </TypographyLabel>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
