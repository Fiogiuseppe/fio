import type { Metadata } from 'next';
import { SectionIntro } from '@/components/SectionIntro';
import { JournalCard } from '@/components/JournalCard';
import { articles } from '@/data/articles';

export const metadata: Metadata = {
  title: 'Journal — Giuseppe Fioretti',
  description: 'Essays, reflections and ideas on design, art, creativity and culture.',
};

export default function JournalPage() {
  return (
    <div className="px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionIntro
          kicker="Writing"
          title="Journal"
          description="Thoughts on Spiritual Design, branding, art, AI and the creative life."
        />
        <div className="mt-16 grid gap-16 md:grid-cols-2">
          {articles.map((article) => (
            <JournalCard key={article.slug} article={article} />
          ))}
        </div>
      </div>
    </div>
  );
}
