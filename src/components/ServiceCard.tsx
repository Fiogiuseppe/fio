import type { Service } from '@/lib/types';
import {
  TypographyBody,
  TypographyH3,
  TypographyLabel,
} from '@/components/typography';
import { editorial } from '@/lib/typography';
import { CTA } from './CTA';

type ServiceCardProps = {
  service: Service;
};

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article className="flex flex-col border-t border-ink/10 py-12 md:py-16">
      <TypographyH3>{service.title}</TypographyH3>
      <TypographyBody className={editorial.stack.sectionToContent}>{service.description}</TypographyBody>
      <div className={`grid gap-8 md:grid-cols-2 ${editorial.stack.block}`}>
        <div>
          <TypographyLabel>What it includes</TypographyLabel>
          <ul className={`${editorial.stack.labelToTitle} space-y-2`}>
            {service.includes.map((item) => (
              <li key={item}>
                <TypographyBody measure={false}>— {item}</TypographyBody>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <TypographyLabel>Who it is for</TypographyLabel>
          <TypographyBody measure={false} className={editorial.stack.labelToTitle}>
            {service.forWho}
          </TypographyBody>
        </div>
      </div>
      <div className={editorial.stack.block}>
        <CTA href="/contact" label={service.ctaLabel} variant="secondary" />
      </div>
    </article>
  );
}
