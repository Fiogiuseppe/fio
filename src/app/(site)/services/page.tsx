import type { Metadata } from 'next';
import { SectionIntro } from '@/components/SectionIntro';
import { ServiceCard } from '@/components/ServiceCard';
import { services } from '@/data/services';

export const metadata: Metadata = {
  title: 'Services — Giuseppe Fioretti',
  description: 'Brand identity, creative direction, art direction, campaigns and visual systems.',
};

export default function ServicesPage() {
  return (
    <div className="px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-4xl">
        <SectionIntro
          kicker="Hire Giuseppe"
          title="Services"
          description="Strategic creative partnership for brands, campaigns and visual worlds. Every engagement begins with a conversation — not a checkout."
        />
        <div className="mt-16">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </div>
    </div>
  );
}
