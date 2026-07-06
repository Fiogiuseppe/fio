import Link from 'next/link';

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
        <p className="mb-6 text-xs uppercase tracking-[0.25em] text-ink/50">
          Giuseppe Fioretti
        </p>
        <h1 className="max-w-4xl font-display text-5xl leading-[0.95] md:text-7xl lg:text-8xl">
          {title}
        </h1>
        <p className="mt-8 max-w-xl text-lg text-ink/70 md:text-xl">{subtitle}</p>

        {paths && (
          <div className="mt-16 grid gap-6 md:grid-cols-3 md:gap-8">
            {paths.map((path) => (
              <Link
                key={path.href}
                href={path.href}
                className="group border-t border-ink/20 pt-6 no-underline transition hover:border-blue"
              >
                <h2 className="font-display text-2xl text-ink group-hover:text-blue md:text-3xl">
                  {path.title}
                </h2>
                <p className="mt-3 text-sm text-ink/60">{path.description}</p>
                <span className="mt-4 inline-block text-xs uppercase tracking-widest text-ink/40 group-hover:text-blue">
                  Explore →
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
