type PageSectionProps = {
  children: React.ReactNode;
  className?: string;
  tone?: 'default' | 'soft';
};

export function PageSection({ children, className = '', tone = 'default' }: PageSectionProps) {
  return (
    <section
      className={`px-6 py-20 md:px-10 md:py-28 ${
        tone === 'soft' ? 'bg-cream-soft' : ''
      } ${className}`}
    >
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}
