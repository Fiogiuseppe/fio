import {
  TypographyH2,
  TypographyHero,
  TypographyLabel,
  TypographyLead,
} from '@/components/typography';
import { editorial } from '@/lib/typography';

type SectionIntroProps = {
  kicker?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  /** Use Quartz hero voice — only for short emotional statements (max ~6 words). */
  asHero?: boolean;
};

export function SectionIntro({
  kicker,
  title,
  description,
  align = 'left',
  asHero = false,
}: SectionIntroProps) {
  const wrap = align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl';

  return (
    <div className={wrap}>
      {kicker ? <TypographyLabel>{kicker}</TypographyLabel> : null}
      {asHero ? (
        <TypographyHero
          as="h1"
          className={kicker ? editorial.stack.labelToTitle : undefined}
        >
          {title}
        </TypographyHero>
      ) : (
        <TypographyH2 as="h1" className={kicker ? editorial.stack.labelToTitle : undefined}>
          {title}
        </TypographyH2>
      )}
      {description ? (
        <TypographyLead className={editorial.stack.titleToLead}>{description}</TypographyLead>
      ) : null}
    </div>
  );
}
