# Editorial Typography System — fiogiuseppe.com

Single source of truth for all typography on the website.

## Implementation

| Layer | Path |
|-------|------|
| Tokens | `src/lib/typography.ts` |
| Components | `src/components/typography/` |
| Article HTML | `src/styles/typography.css` |

**Rule:** Never define font sizes in pages or components. Always use `Typography*` components.

## Four voices

| Voice | Font | Use |
|-------|------|-----|
| **01 — The Author** | Quartz | Hero statements only. Max 6 words. One sentence. |
| **02 — The Structure** | Helvetica Bold | Section titles, card titles, navigation, buttons. Always uppercase. |
| **03 — The Story** | Helvetica Regular | Lead paragraphs, body text. Sentence case. |
| **04 — The Details** | Helvetica Light | Dates, credits, categories, captions. |

Quartz ≈ 5% of the site. Helvetica ≈ 95%.

## Components

| Component | Role | Font |
|-----------|------|------|
| `TypographyLabel` | Eyebrow / label | Helvetica Regular, 11–12px, uppercase |
| `TypographyHero` | H1 hero | Quartz, 40–88px |
| `TypographyH2` | Section title | Helvetica Bold, 36–48px, uppercase |
| `TypographyH3` | Subsection / card title | Helvetica Bold, 20–24px, uppercase |
| `TypographyLead` | Context under titles | Helvetica Regular, 20–24px |
| `TypographyBody` | Paragraphs | Helvetica Regular, 16–18px, max 70ch |
| `TypographyMeta` | Dates, credits, tags | Helvetica Light, 12–14px |
| `TypographyButton` | CTA labels | Helvetica Bold, 14–16px, uppercase |
| `TypographyQuote` | Artistic statements | Quartz, centered |

## Page rhythm

```
LABEL → HERO or H2 → LEAD → CTA → H2 → CONTENT → …
```

- One `TypographyHero` or `TypographyH2 as="h1"` per page.
- `SectionIntro` handles label + title + lead for index pages.
- Use `asHero` on `SectionIntro` only for short emotional titles (About).

## Spacing (8px grid)

Use `editorial.stack.*` from `src/lib/typography.ts`:

- `labelToTitle` — 16px
- `titleToLead` — 32px
- `leadToContent` — 64px
- `sectionToContent` — 32px
- `block` — 48px
- `page` — 96px

## Quartz allowed

- Hero statements
- Cover headlines
- Short quotes (`TypographyQuote`)

## Quartz forbidden

- Navigation, buttons, cards, journal previews, services, metadata, paragraphs

## Capitalization

- All Helvetica titles: **uppercase** (via CSS `text-transform`)
- Body text: sentence case
- Quartz: natural capitalization
