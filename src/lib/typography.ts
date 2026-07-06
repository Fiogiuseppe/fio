/**
 * Editorial typography tokens — fiogiuseppe.com
 * Do not define font sizes outside this file or Typography components.
 */

export const editorial = {
  /** VOICE 04 — labels, eyebrows */
  label:
    'font-helvetica text-[11px] font-normal uppercase tracking-[0.15em] text-ink/50 md:text-xs',

  /** VOICE 01 — Quartz hero only. Max 6 words. Never paragraphs. */
  hero:
    'font-quartz text-[clamp(2.5rem,4vw+1.25rem,5.5rem)] font-normal leading-[1.05] tracking-[-0.02em]',

  /** VOICE 02 — section titles. Always uppercase via CSS. */
  h2: 'font-helvetica text-[clamp(2.25rem,2.5vw+1rem,3rem)] font-bold uppercase leading-[1.1] tracking-[0.03em]',

  /** VOICE 02 — cards, services, project titles. Always uppercase. */
  h3: 'font-helvetica text-[clamp(1.25rem,0.5vw+1.1rem,1.5rem)] font-bold uppercase leading-[1.2] tracking-[0.04em]',

  /** VOICE 03 — contextual intro under titles */
  lead: 'font-helvetica text-[clamp(1.25rem,0.5vw+1.1rem,1.5rem)] font-normal leading-[1.5] text-ink/72',

  /** VOICE 03 — paragraphs */
  body: 'font-helvetica text-base font-normal leading-[1.6] text-ink/82 md:text-[17px]',

  /** VOICE 04 — dates, credits, categories */
  meta: 'font-helvetica text-xs font-light leading-[1.4] text-ink/48 md:text-sm',

  /** CTA labels — verb first, uppercase */
  button:
    'font-helvetica text-sm font-bold uppercase tracking-[0.08em] md:text-base',

  /** Quartz — centered artistic statements only */
  quote:
    'font-quartz text-[clamp(1.375rem,1.5vw+1rem,2rem)] font-normal leading-[1.35] tracking-[-0.02em]',

  /** Readable line length */
  measure: 'max-w-[70ch]',

  /** Vertical rhythm — 8px grid */
  stack: {
    labelToTitle: 'mt-4',
    titleToLead: 'mt-8',
    leadToContent: 'mt-16',
    sectionToContent: 'mt-8',
    paragraph: 'mt-6',
    block: 'mt-12',
    section: 'mt-16',
    page: 'mt-24',
  },
} as const;
