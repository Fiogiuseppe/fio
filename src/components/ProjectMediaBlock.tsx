import Image from 'next/image';
import type { ProjectMedia } from '@/lib/types';
import { CleanVideoEmbed } from './CleanVideoEmbed';

type ProjectMediaBlockProps = {
  items: ProjectMedia[];
  title: string;
};

export function ProjectMediaBlock({ items, title }: ProjectMediaBlockProps) {
  if (!items.length) return null;

  return (
    <div className="space-y-6 md:space-y-10">
      {items.map((item) => {
        const frameClass = item.fullWidth
          ? 'relative aspect-[16/9] w-full overflow-hidden bg-ink/5'
          : 'relative aspect-[4/3] overflow-hidden bg-ink/5';

        if (item.type === 'video') {
          return (
            <div key={item.youtubeId} className={frameClass}>
              <CleanVideoEmbed
                youtubeId={item.youtubeId}
                title={item.alt ?? title}
                poster={item.poster}
                mode="cinema"
                className="absolute inset-0 h-full w-full"
              />
            </div>
          );
        }

        const isGif = item.type === 'gif' || item.src.endsWith('.gif');
        const isSvg = item.src.endsWith('.svg');

        return (
          <div key={item.src} className={frameClass}>
            <Image
              src={item.src}
              alt={item.alt ?? title}
              fill
              className="object-cover"
              sizes="100vw"
              unoptimized={isGif || isSvg}
            />
          </div>
        );
      })}
    </div>
  );
}
