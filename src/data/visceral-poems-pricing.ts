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

export const VISCERAL_POEMS_FRAME_MOCKUP =
  'https://fiogiuseppe.com/wp-content/uploads/2023/03/Poster-Mockup-Creatlon_2-scaled.jpg';

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
