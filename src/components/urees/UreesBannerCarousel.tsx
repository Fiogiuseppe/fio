'use client';

import Image from 'next/image';
import { useState } from 'react';

type UreesBannerCarouselProps = {
  slides: Array<{ title: string; image: string }>;
};

export function UreesBannerCarousel({ slides }: UreesBannerCarouselProps) {
  const [index, setIndex] = useState(0);
  const slide = slides[index];

  if (!slide) return null;

  return (
    <section className="urees-carousel">
      <div className="urees-carousel__media">
        <Image
          src={slide.image}
          alt={slide.title}
          fill
          className="object-cover"
          sizes="100vw"
          priority={index === 0}
        />
      </div>
      <div className="urees-carousel__overlay">
        <h2 className="urees-carousel__title">{slide.title}</h2>
        <div className="urees-carousel__controls">
          <button
            type="button"
            onClick={() => setIndex((value) => (value - 1 + slides.length) % slides.length)}
            aria-label="Previous slide"
          >
            ←
          </button>
          <span>
            {index + 1} / {slides.length}
          </span>
          <button
            type="button"
            onClick={() => setIndex((value) => (value + 1) % slides.length)}
            aria-label="Next slide"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
