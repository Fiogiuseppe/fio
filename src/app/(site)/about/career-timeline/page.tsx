import type { Metadata } from 'next';
import { CareerTimelineContent } from '@/components/CareerTimelineContent';
import { PageSection } from '@/components/PageSection';

export const metadata: Metadata = {
  title: 'Career Timeline — Giuseppe Fioretti',
  description:
    'Career timeline and work highlights — LEGO, Desigual, Nike, UREES, awards and academic background.',
};

export default function CareerTimelinePage() {
  return (
    <PageSection>
      <CareerTimelineContent />
    </PageSection>
  );
}
