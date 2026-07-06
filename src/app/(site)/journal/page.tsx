import type { Metadata } from 'next';
import { SectionIntro } from '@/components/SectionIntro';
import { PageSection } from '@/components/PageSection';
import { JournalCard } from '@/components/JournalCard';
import { articles } from '@/data/articles';
import gridStyles from '@/components/JournalGrid.module.css';

export const metadata: Metadata = {
  title: 'Journal — Giuseppe Fioretti',
  description: 'Essays, reflections and ideas on design, art, creativity and culture.',
};

export default function JournalPage() {
  return (
    <PageSection className="journal-index">
      <SectionIntro
        align="center"
        kicker="Writing"
        title="Journal"
        description="Essays on design, art, culture and creativity."
      />
      <div className={gridStyles.grid}>
        {articles.map((article) => (
          <JournalCard key={article.slug} article={article} compact />
        ))}
      </div>
    </PageSection>
  );
}
