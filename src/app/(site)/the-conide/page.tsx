import type { Metadata } from 'next';
import { PageSection } from '@/components/PageSection';
import { ConidePageContent } from '@/components/ConidePageContent';

export const metadata: Metadata = {
  title: 'The Conide — Giuseppe Fioretti',
  description:
    '“I have seen a Conide” — a project on the connector of ideas, the spectator, and art that is not yet recognized as such.',
};

export default function TheConidePage() {
  return (
    <PageSection>
      <ConidePageContent />
    </PageSection>
  );
}
