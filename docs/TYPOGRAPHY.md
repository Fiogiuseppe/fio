# Typography (implementation)

The full visual DNA lives in **[EDITORIAL_DESIGN_SYSTEM.md](./EDITORIAL_DESIGN_SYSTEM.md)**.

## Quick reference

| Component | Voice | Use |
|-----------|-------|-----|
| `TypographyLabel` | 04 | Eyebrows, form labels |
| `TypographyHero` | 01 | Quartz — max 6 words |
| `TypographySection` | 02 | Page/section titles |
| `TypographyCard` | 02 | Cards, projects, journal tiles |
| `TypographyLead` | 03 | Context under titles |
| `TypographyBody` | 03 | Paragraphs |
| `TypographyMeta` | 04 | Dates, credits, tags |
| `TypographyButton` | 02 | CTA labels |
| `TypographyQuote` | 01 | Artistic statements |

`TypographyH2` / `TypographyH3` are deprecated aliases — use `TypographySection` / `TypographyCard`.

## Files

- Tokens: `src/lib/typography.ts`
- Composition & spacing: `src/lib/editorial.ts`
- Components: `src/components/typography/`
- Layout: `src/components/editorial/EditorialSection.tsx`
