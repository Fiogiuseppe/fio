import Image from 'next/image';

type GalleryProps = {
  images: string[];
  alt: string;
};

export function Gallery({ images, alt }: GalleryProps) {
  if (images.length === 0) return null;

  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-6">
      {images.map((src, i) => {
        const isGif = src.endsWith('.gif');
        const isSvg = src.endsWith('.svg');
        return (
          <div key={src} className="relative aspect-[4/3] overflow-hidden bg-ink/5">
            <Image
              src={src}
              alt={`${alt} — ${i + 1}`}
              fill
              className="object-cover"
              sizes="(max-width:768px) 100vw, 50vw"
              unoptimized={isGif || isSvg}
            />
          </div>
        );
      })}
    </div>
  );
}
