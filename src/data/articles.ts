import type { Article } from '@/lib/types';
import { WP } from '@/lib/utils';

export const articles: Article[] = [
  {
    slug: 'what-is-spiritual-design',
    title: 'What Is Spiritual Design?',
    date: '2024-06-15',
    excerpt:
      'When design serves something greater than aesthetics, it becomes a practice of alignment — between inner truth and outer form.',
    coverImage: '/images/spiritual-design-def.svg',
    tags: ['Spiritual Design', 'creativity', 'branding'],
    content: `I do not design to impress. I design to align.

Spiritual Design is not a trend. It is a way of working — where every choice carries intention, and every form asks a question.

When we create with awareness, design stops being decoration. It becomes a bridge: between what we feel and what the world needs.

This is the foundation of everything I do — from brand identity to UREES, from campaigns to paintings.`,
  },
  {
    slug: 'on-creativity-and-silence',
    title: 'On Creativity and Silence',
    date: '2024-09-02',
    excerpt:
      'The most important creative decisions often happen in the spaces between noise.',
    coverImage: `${WP}/2025/07/Giuseppe_Fioretti.png`,
    tags: ['creativity', 'personal reflections'],
    content: `We live in a culture that rewards output. But creativity needs silence.

Not emptiness — silence. The kind where ideas settle, connect, and reveal themselves.

I have learned that my best work comes not from forcing ideas, but from creating the conditions for them to arrive.

Copenhagen helps. The light, the pause, the distance from the noise.`,
  },
  {
    slug: 'branding-as-storytelling',
    title: 'Branding as Storytelling',
    date: '2025-01-20',
    excerpt:
      'A brand is not a logo. It is a story people choose to believe in.',
    coverImage: `${WP}/2021/10/Desigual-HQ-Timelapse-1.gif`,
    tags: ['branding', 'art'],
    content: `Working with Desigual taught me that rebranding is not about changing surfaces — it is about returning to truth.

Every brand has an origin story. The work is to find it, honour it, and translate it into a living system.

Storytelling is not marketing. It is the architecture of meaning.`,
  },
  {
    slug: 'ai-and-the-creative-process',
    title: 'AI and the Creative Process',
    date: '2025-03-10',
    excerpt:
      'Artificial intelligence is a tool — not a replacement for taste, intuition or soul.',
    coverImage: `${WP}/2025/07/Giuseppe_Fioretti_2.png`,
    tags: ['AI', 'creativity', 'personal reflections'],
    content: `AI will change how we work. It will not change why we create.

The danger is not the tool — it is the abdication of judgment. Taste, intuition, and the courage to say "not this" remain human.

I use AI as I use any tool: with intention, with limits, and always in service of something larger than efficiency.`,
  },
];

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}
