import type { Metadata } from 'next';
import { FramePreviewLab } from '@/components/FramePreviewLab';

export const metadata: Metadata = {
  title: 'Frame mockup preview — Giuseppe Fioretti',
  description: 'Internal preview for the Visceral Poems frame mockup.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function FramePreviewPage() {
  return (
    <section className="px-6 py-12 md:px-10 md:py-16">
      <div className="mx-auto max-w-5xl">
        <p className="mb-2 font-helvetica text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-ink/45">
          Anteprima mockup
        </p>
        <h1 className="mb-3 font-helvetica text-2xl font-medium tracking-wide md:text-3xl">
          Cornice Visceral Poems
        </h1>
        <p className="mb-10 max-w-2xl text-sm leading-relaxed text-ink/65">
          Pagina di prova — qui valutiamo il mockup prima di applicarlo a tutto il catalogo.
          A3, cornice bianca, senza passepartout.
        </p>
        <FramePreviewLab />
      </div>
    </section>
  );
}
