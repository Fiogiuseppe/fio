import type { Metadata } from 'next';
import { SectionIntro } from '@/components/SectionIntro';
import { PageSection } from '@/components/PageSection';
import { JournalAuthorMark } from '@/components/JournalAuthorMark';
import { JournalCard } from '@/components/JournalCard';
import { JournalSpecialFlyer } from '@/components/JournalSpecialFlyer';
import { getJournalArticles } from '@/data/articles';
import gridStyles from '@/components/JournalGrid.module.css';

export const metadata: Metadata = {
  title: 'Journal — Giuseppe Fioretti',
  description: 'Essays, reflections and ideas on design, art, creativity and culture.',
};

export default function JournalPage() {
  const journalArticles = getJournalArticles();
  const specialArticles = journalArticles.filter((article) => article.special);
  const regularArticles = journalArticles.filter((article) => !article.special);

  return (
    <PageSection className="journal-index">
      <SectionIntro
        align="center"
        kicker="Writing"
        title="Journal"
        description="Essays on design, art, culture and creativity."
      />
      <JournalAuthorMark />
      {specialArticles.map((article) => (
        <JournalSpecialFlyer key={article.slug} article={article} />
      ))}
      <div className={gridStyles.grid} data-journal-list>
        {regularArticles.map((article) => (
          <JournalCard key={article.slug} article={article} compact />
        ))}
      </div>
    </PageSection>
  );
}
