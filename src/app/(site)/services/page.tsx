import type { Metadata } from 'next';
import { SectionIntro } from '@/components/SectionIntro';
import { PageSection } from '@/components/PageSection';
import { ServiceCard } from '@/components/ServiceCard';
import { services } from '@/data/services';

export const metadata: Metadata = {
  title: 'Services | Giuseppe Fioretti',
  description: 'Brand identity, creative direction, art direction, campaigns and visual systems.',
};

export default function ServicesPage() {
  return (
    <PageSection>
      <div className="max-w-4xl">
        <SectionIntro
          kicker="Hire Giuseppe"
          title="Services"
          description="I work with brands and creative teams on identity, campaigns and art direction. Tell me what you have in mind."
        />
        <div className="mt-16">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </div>
    </PageSection>
  );
}
