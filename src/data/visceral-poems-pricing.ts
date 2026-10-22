export const VISCERAL_POEM_SIZE = 'A3';
export const VISCERAL_POEM_DIMENSIONS = '29.7 × 42 cm';

export const VISCERAL_POEMS_PRICING = {
  handmade: {
    label: 'Handpainted',
    withoutFrame: 30,
    withFrame: 60,
    frameAddon: 30,
  },
  digital: {
    label: 'Printed',
    withoutFrame: 10,
    withFrame: 40,
    frameAddon: 30,
  },
} as const;

export type VisceralPoemFormat = keyof typeof VISCERAL_POEMS_PRICING;

const VISCERAL_POEM_STORY_INTRO =
  'Visceral Poems combines writing and drawing on paper. The series began on bus journeys and flights between cities.';

export function visceralPoemLongStory(format: VisceralPoemFormat) {
  if (format === 'digital') {
    return `${VISCERAL_POEM_STORY_INTRO} A3 signed print (${VISCERAL_POEM_DIMENSIONS}). An optional white frame holds the poster edge to edge, without a mount.`;
  }

  return `${VISCERAL_POEM_STORY_INTRO} Handpainted A3 original (${VISCERAL_POEM_DIMENSIONS}). An optional white frame holds the work edge to edge, without a mount.`;
}

export function visceralPoemPrice(format: VisceralPoemFormat, withFrame: boolean) {
  const tier = VISCERAL_POEMS_PRICING[format];
  return withFrame ? tier.withFrame : tier.withoutFrame;
}

export function visceralPoemFromPrice() {
  return VISCERAL_POEMS_PRICING.digital.withoutFrame;
}

export function visceralPoemListPrice(group: 'handmade' | 'digital') {
  return group === 'handmade'
    ? VISCERAL_POEMS_PRICING.handmade.withoutFrame
    : visceralPoemFromPrice();
}

export function isVisceralPoemProduct(category: string) {
  return category === 'visceral-poems';
}
