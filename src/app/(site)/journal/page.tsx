import type { Metadata } from 'next';
import { SectionIntro } from '@/components/SectionIntro';
import { PageSection } from '@/components/PageSection';
import { JournalCard } from '@/components/JournalCard';
import { articles } from '@/data/articles';

export const metadata: Metadata = {
  title: 'Journal — Giuseppe Fioretti',
  description: 'Essays, reflections and ideas on design, art, creativity and culture.',
};

export default function JournalPage() {
  return (
    <PageSection>
      <SectionIntro
        kicker="Writing"
        title="Journal"
        description="Essays on design, art, culture and creativity — originally published on Medium, now here."
      />
      <div className="mt-16 flex flex-col gap-12">
        {articles.map((article) => (
          <JournalCard key={article.slug} article={article} />
        ))}
      </div>
    </PageSection>
  );
}
