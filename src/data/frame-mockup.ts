export const WOOD_FRAME_SCENE = '/shop/frame-mockup/light-oak-frame-wall.png';

/** Measured from the frame asset — inner opening for A3 poster, no passepartout */
export const WOOD_FRAME_POSTER_INSET = {
  left: 25,
  top: 24.41,
  width: 54.49,
  height: 51.5,
} as const;

/** First printed piece using the wood-frame mockup — expand after approval */
export const WOOD_FRAME_PRINTED_SLUG = 'visceral-poem-12';

export function usesWoodFrameMockup(slug: string, format: 'handmade' | 'digital') {
  return format === 'digital' && slug === WOOD_FRAME_PRINTED_SLUG;
}
