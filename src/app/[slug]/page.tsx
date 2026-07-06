import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { ContactSection } from '@/components/ContactSection';
import { getAllProjectSlugs, getProjectPage } from '@/data/pages';
import styles from '../project.module.css';

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const page = getProjectPage(slug);
  if (!page) return {};
  return {
    title: `${page.title} — Giuseppe Fioretti`,
    description: page.description,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const page = getProjectPage(slug);
  if (!page) notFound();

  const isGif = page.image?.endsWith('.gif');
  const isSvg = page.image?.endsWith('.svg');

  return (
    <>
      <SiteHeader staticHeader />
      <main className={styles.page}>
        <Link className={styles.back} href="/">
          ← Home
        </Link>
        <section className={styles.hero}>
          <h1 className={styles.title}>{page.title}</h1>
          <p className={styles.description}>{page.description}</p>
        </section>
        {page.image && (
          <div className={styles.media}>
            <Image
              className={styles.image}
              src={page.image}
              alt={page.title}
              width={1600}
              height={1000}
              unoptimized={isGif || isSvg}
              priority
            />
          </div>
        )}
        {page.body && (
          <div className={styles.body}>
            {page.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        )}
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
