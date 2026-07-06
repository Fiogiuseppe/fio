import { editorialSpace, grid } from '@/lib/editorial';

type PageSectionProps = {
  children: React.ReactNode;
  className?: string;
  tone?: 'default' | 'soft';
};

export function PageSection({ children, className = '', tone = 'default' }: PageSectionProps) {
  return (
    <section
      className={`${editorialSpace.sectionX} ${editorialSpace.sectionY} ${
        tone === 'soft' ? 'surface-soft bg-cream-soft' : ''
      } ${className}`}
    >
      <div className={grid.page}>{children}</div>
    </section>
  );
}
