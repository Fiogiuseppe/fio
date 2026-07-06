type SectionIntroProps = {
  kicker?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
};

export function SectionIntro({ kicker, title, description, align = 'left' }: SectionIntroProps) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      {kicker && (
        <p className="mb-3 text-xs uppercase tracking-[0.2em] text-ink/50">{kicker}</p>
      )}
      <h2 className="font-display text-4xl leading-tight md:text-5xl lg:text-6xl">{title}</h2>
      {description && (
        <p className="mt-5 text-lg text-ink/70 md:text-xl">{description}</p>
      )}
    </div>
  );
}
