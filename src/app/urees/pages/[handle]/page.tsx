import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { UreesRichContent } from '@/components/urees/UreesRichContent';
import { getUreesPage, ureesSite } from '@/data/urees';

type Props = { params: Promise<{ handle: string }> };

export async function generateStaticParams() {
  return ureesSite.pages.map((page) => ({ handle: page.handle }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  const page = getUreesPage(handle);
  if (!page) return {};
  return { title: `${page.title} — Urees Store` };
}

export default async function UreesContentPage({ params }: Props) {
  const { handle } = await params;
  const page = getUreesPage(handle);
  if (!page) notFound();

  return (
    <section className="urees-section">
      <div className="urees-page-width urees-content-page">
        <h1 className="urees-page-title">{page.title}</h1>
        <UreesRichContent html={page.bodyHtml} />
      </div>
    </section>
  );
}
