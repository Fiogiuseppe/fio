import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { UreesRichContent } from '@/components/urees/UreesRichContent';
import { getUreesPolicy, ureesSite } from '@/data/urees';

type Props = { params: Promise<{ handle: string }> };

export async function generateStaticParams() {
  return ureesSite.policies.map((policy) => ({ handle: policy.handle }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  const policy = getUreesPolicy(handle);
  if (!policy) return {};
  return { title: `${policy.title} — Urees Store` };
}

export default async function UreesPolicyPage({ params }: Props) {
  const { handle } = await params;
  const policy = getUreesPolicy(handle);
  if (!policy) notFound();

  return (
    <section className="urees-section">
      <div className="urees-page-width urees-content-page">
        <h1 className="urees-page-title">{policy.title}</h1>
        <UreesRichContent html={policy.bodyHtml} />
      </div>
    </section>
  );
}
