import { permanentRedirect, notFound } from 'next/navigation';
import { getProjectPage } from '@/data/pages';
import { getAllLegacySlugs, getLegacyRedirect } from '@/data/legacy-redirects';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllLegacySlugs().map((slug) => ({ slug }));
}

export default async function LegacySlugRedirect({ params }: Props) {
  const { slug } = await params;
  const target = getLegacyRedirect(slug);

  if (target) {
    permanentRedirect(target);
  }

  if (getProjectPage(slug)) {
    permanentRedirect(`/archive/${slug}`);
  }

  notFound();
}
