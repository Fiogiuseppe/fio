import type { Metadata } from 'next';
import { PageSection } from '@/components/PageSection';
import { CacophobiaPageContent } from '@/components/CacophobiaPageContent';

export const metadata: Metadata = {
  title: 'Cacophobia — Giuseppe Fioretti',
  description: 'A hidden painting project — found through the home cover.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function CacophobiaPage() {
  return (
    <PageSection>
      <CacophobiaPageContent />
    </PageSection>
  );
}
