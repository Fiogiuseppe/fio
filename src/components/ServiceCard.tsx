import type { Service } from '@/lib/types';
import { CTA } from './CTA';

type ServiceCardProps = {
  service: Service;
};

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article className="flex flex-col border-t border-ink/10 py-10 md:py-12">
      <h3 className="font-display text-3xl md:text-4xl">{service.title}</h3>
      <p className="mt-4 max-w-2xl text-lg text-ink/70">{service.description}</p>
      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <div>
          <p className="text-xs uppercase tracking-widest text-ink/50">What it includes</p>
          <ul className="mt-3 space-y-2 text-sm text-ink/80">
            {service.includes.map((item) => (
              <li key={item}>— {item}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-ink/50">Who it is for</p>
          <p className="mt-3 text-sm text-ink/80">{service.forWho}</p>
        </div>
      </div>
      <div className="mt-8">
        <CTA href="/contact" label={service.ctaLabel} variant="secondary" />
      </div>
    </article>
  );
}
