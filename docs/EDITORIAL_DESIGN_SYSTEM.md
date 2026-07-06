# FIOGIUSEPPE.COM — Editorial Design System & Visual Language

This is the visual DNA of fiogiuseppe.com. Every page, component, and interaction must follow it.

**Implementation:** `src/lib/typography.ts` · `src/lib/editorial.ts` · `src/components/typography/` · `src/components/editorial/`

**Visual references:** Swiss typography posters, editorial grids, museum catalogues, art books — Helvetica as architecture, typography as composition, whitespace as content.

---

## Design philosophy

**The book test (mandatory):** Every design decision must answer one question — *Would this still feel beautiful if it were printed as a book?* If the answer is no, redesign it.

Typography is not decoration. Typography creates hierarchy, rhythm, and silence. Whitespace is content. Images are narrative. Composition is communication. Nothing exists without purpose.

If an element does not improve hierarchy, emotion, or clarity — remove it.

The site should feel: calm · minimal · confident · timeless · architectural · intentional · elegant · human.

**Goal:** A timeless editorial experience — closer to a design magazine, exhibition catalogue, or art publication than a commercial portfolio.

Consistency comes from systems. Variety comes from composition.

**Never design sections as reusable website blocks. Design compositions.**

---

## Visual references

Swiss Typography · Editorial Design · Graphic Design Systems · Museum Exhibition Design · Art Books · Architecture · Minimalism · Printed Posters · Modern Publishing

Every page should feel like it belongs to the same publication.

---

## Voice hierarchy

| Voice | Role | Font |
|-------|------|------|
| **01 — The Author** | Giuseppe speaking. Personal, emotional, reflective. | **Quartz** (~5%) |
| **02 — The Structure** | Organizes, guides, creates hierarchy. | **Helvetica Neue Bold** |
| **03 — The Story** | Explanation. Never competes with titles. | **Helvetica Neue Regular** |
| **04 — The Details** | Dates, credits, categories. Quiet. | **Helvetica Neue Light** |

---

## Font system

**Primary — Helvetica Neue** (Ultra Light · Light · Regular · Italic · Medium · Bold) — ~95%

**Secondary — Quartz** — ~5%. Only intentional moments. When in doubt, use Helvetica.

### When to use Quartz

Hero statements · landing headlines · cover titles · artistic phrases · short reflections.

**Rules:** Max 6 words · one sentence · never explanatory · never paragraphs · never buttons · nav · cards · services · metadata · journal previews · project descriptions.

### Helvetica everywhere else

Navigation · buttons · section titles · paragraphs · cards · projects · services · journal · footer · forms · captions · metadata · case studies · descriptions.

### Capitalization

**Mandatory:** Every Helvetica title is **UPPERCASE** (via components).

Body text: sentence case. Quartz: natural capitalization when appropriate.

---

## Typography scale

| Level | Component | Spec |
|-------|-----------|------|
| Label | `TypographyLabel` | Helvetica Regular 11–12px, uppercase, +150 tracking, muted |
| Hero | `TypographyHero` | Quartz 40–88px, max 6 words |
| Section | `TypographySection` | Helvetica Bold 36–48px, uppercase |
| Card | `TypographyCard` | Helvetica Bold 20–24px, uppercase |
| Lead | `TypographyLead` | Helvetica Regular 20–24px, max 2 sentences |
| Body | `TypographyBody` | Helvetica Regular 16–18px, lh 1.6, max ~70ch |
| Meta | `TypographyMeta` | Helvetica Light 12–14px, muted |
| Button | `TypographyButton` | Helvetica Bold 14–16px, uppercase, verb first |
| Quote | `TypographyQuote` | Quartz, centered, short artistic statements |

---

## Surface & color

| Token | Value | Use |
|-------|-------|-----|
| Paper | `#E6E0D5` + noise | **Home only** — cover and home scroll |
| Page | `#FFFFFF` | All inner pages — pure white, no texture |
| Ink | `#0A0A0A` | Body text on light surfaces |
| On-light | `#0A0A0A` | Text on white/cream — mandatory on light backgrounds |
| On-dark | `#FFFFFF` | Text on black — mandatory on dark backgrounds |
| Blue | `#001FFF` | Accent, links, artwork |

The paper surface must feel printed — **home only**. Inner pages use flat white (`--color-page`).

**Contrast rule:** never black-on-black or white-on-white. Light surfaces → `on-light`. Dark surfaces (`surface-dark`, footer, primary CTAs) → `on-dark`.

**Buttons:** always use `btn-on-dark` (black fill), `btn-on-light` (white fill on dark pages), `btn-outline-on-light`, or `btn-outline-on-dark` — they lock text color on the control and all descendants.

---

## Composition language

Every section should feel art directed — not assembled from blocks.

- Typography and imagery work together
- Typography can become composition (overlap, crop, scale, depth)
- Images are narrative — size communicates importance
- Never repeat the same section structure twice in a row
- Alternate: large type · full-bleed imagery · editorial grids · statements · quotes · negative space

Use `EditorialSection` with variants: `default` · `statement` · `fullBleed` · `split` · `grid` · `quote`

---

## Grid & spacing

**8px system only:** 8 · 16 · 24 · 32 · 48 · 64 · 96 · 128

Use `editorial.space.*` from `src/lib/editorial.ts`.

**Alignment:** Left by default. Center only for hero, quotes, short artistic messages.

**Text width:** 70–80 characters (`max-w-[70ch]`).

---

## Animation

Almost invisible. Elegant. Slow. Purposeful.

Prefer: fade · opacity · soft parallax · natural movement.

Use `editorial.motion.*` classes. Content should feel alive, not animated.

---

## Implementation rules

1. **Never** define typography or spacing manually in pages
2. **Always** use `Typography*` components
3. **Always** use `editorial.space` for margins/padding
4. **Always** uppercase Helvetica titles via components
5. **Audit** Quartz usage — must be rare and earned
6. **Compose** each section — no template repetition

---

## Page rhythm

```
LABEL → HERO or SECTION → LEAD → CTA → SECTION → CONTENT → … → FINAL CTA
```

One hero or section title as `h1` per page.

---

## Audit checklist

- [ ] Every page uses Typography components only
- [ ] No custom font sizes in components/pages
- [ ] Spacing on 8px grid
- [ ] Helvetica titles uppercase
- [ ] Quartz only in hero/quote moments
- [ ] No two consecutive sections feel identical
- [ ] Images purposeful, varied scale
- [ ] Motion subtle
