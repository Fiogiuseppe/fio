import { getProject } from './projects';
import type { Project } from '@/lib/types';

export type HomeProjectBlock =
  | { type: 'split'; mediaIndices: number[] }
  | { type: 'full'; mediaIndex: number };

export type HomeProjectConfig = {
  slug: string;
  kicker?: string;
  /** Overrides project subtitle on home when set */
  intro?: string;
  blocks: HomeProjectBlock[];
  showAward?: boolean;
};

/** Home order and layout — mirrors fiogiuseppe.com editorial stack */
export const homeProjectConfigs: HomeProjectConfig[] = [
  {
    slug: 'urees',
    kicker: 'Last project',
    blocks: [],
  },
  {
    slug: 'desigual-sneakers-campaign',
    blocks: [{ type: 'full', mediaIndex: 0 }],
  },
  {
    slug: 'desigual-rebranding',
    intro:
      'Go back to the origins of Desigual, when the word was invented, what it really meant. Being 100% Desigual means going backwards.',
    blocks: [
      { type: 'split', mediaIndices: [1, 2] },
      { type: 'full', mediaIndex: 3 },
    ],
    showAward: true,
  },
  {
    slug: 'spiritual-design',
    blocks: [],
  },
  {
    slug: 'lego-playmaker-jason-momoa',
    blocks: [{ type: 'full', mediaIndex: 0 }],
  },
];

export type HomeProjectEntry = {
  config: HomeProjectConfig;
  project: Project;
};

export function getHomeProjects(): HomeProjectEntry[] {
  return homeProjectConfigs
    .map((config) => {
      const project = getProject(config.slug);
      return project ? { config, project } : null;
    })
    .filter((entry): entry is HomeProjectEntry => entry !== null);
}
