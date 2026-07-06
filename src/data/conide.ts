import { WP } from '@/lib/utils';

export const CONIDE_SLUG = 'the-conide';

export const CONIDE_HERO = `${WP}/2021/05/Giuseppe_Fioretti_theconide.jpeg`;

export const CONIDE_IMAGES = {
  duchamp: `${WP}/2021/05/The_Conide_Marcel_Duchamp.jpeg`,
  ostrowski: `${WP}/2021/05/The_Conide_David_Ostrowski.jpeg`,
  kac: `${WP}/2021/05/The_Conide_Eduardo_Kac.jpeg`,
  illustration: `${WP}/2021/05/unnamed.jpeg`,
} as const;

export const CONIDE_INTRO =
  '“I have seen a Conide” is a project with a specific objective: to give meaning to individuals who create works of art that are not considered as such.';

export const CONIDE_BODY = [
  'This individual is named “Conide” through a creative process devised for the occasion that is based on the etymological model of the Latin language: Connector (connector) + Ideas (Ideas) = Connector of ideas.',
  'The connector of ideas is a fusion that indicates to the individual that they must be capable of creating a connection of ideas. It may seem trivial, but it is quite complex, given that even today there are many people who do not understand the emotions that any work of art transmits.',
  'The mission is to identify all those people who create objects that are not understood, in order to sustain and support that incomprehensibility.',
  'An example of a Conide is Marcel Duchamp, who managed to create a work that literally changed the meaning of the word “art” that until then had been considered — and now we regard him as a great artist. He is just an example; some of Van Gogh’s paintings were used to close chicken coops and were later sold for exorbitant amounts, presumably by the same people.',
  'This research was born from personal curiosity, as well as some personal experiences. I imagine people who have never entered a museum — how can they never understand it? This fact intrigued me a lot because it made me wonder many things, for example: What leads a person to be unable to connect with a work of art? Is it due to a lack of education in art?',
  'I don’t know, but these questions have led me to knowledge, through searches and various experimental didactic methodologies in the field of art; and it is at this point that I have come to the conclusion that probably this reflection, these doubts, do not affect only me, but live within more people.',
  'Probably art is not understood because it is poorly disseminated and insufficiently. Art deserves the right importance and should not be undervalued. Politicians, waiters, dancers, salespeople, secretaries, children… all of them are influenced by art in some way in their lives.',
  'Recognizing the Conide is a way of considering our ignorance and taking art for what it is, a great dinner with friends, where there is no one who knows how to eat better than another.',
  'The Conides hide behind the misunderstandings of the public or art experts. What generates Conides are the recognitions that we constantly make towards art. Judging something necessarily creates Conides. Every time we say “this is art” or “this is not art,” we are inevitably generating Conides.',
] as const;

export const CONIDE_EXAMPLES = [
  {
    image: CONIDE_IMAGES.duchamp,
    alt: 'Marcel Duchamp — Duchamp at Chess Board, 1958 by Arnold T. Rosenberg',
    caption:
      'One of the most important Conide in history. Marcel Duchamp. “Duchamp at Chess Board,” 1958 by Arnold T. Rosenberg — Bowdoin College Museum of Art',
  },
  {
    image: CONIDE_IMAGES.ostrowski,
    alt: 'David Ostrowski work',
    caption:
      'David Ostrowski via @abstract.mag — There are people who think that this is not art. Let’s tell them that’s not true! For us it is art, for them it will be conide.',
  },
  {
    image: CONIDE_IMAGES.kac,
    alt: 'Eduardo Kac — Alba the glowing rabbit',
    caption:
      'Alba was the name of a genetically modified “glowing” rabbit created as an artistic work by contemporary artist Eduardo Kac, produced in collaboration with French geneticist Louis-Marie Houdebine. There are people who think that this is not art. Do you think this is art?',
  },
] as const;
