'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

type UreesBannerSlide = {
  title: string;
  image: string;
};

type UreesBannerCarouselProps = {
  sectionHeading?: string;
  slides: UreesBannerSlide[];
  autoplayMs?: number;
};

export function UreesBannerCarousel({
  sectionHeading,
  slides,
  autoplayMs = 5000,
}: UreesBannerCarouselProps) {
  const [index, setIndex] = useState(0);
  const slide = slides[index];
  const hasMultipleSlides = slides.length > 1;

  useEffect(() => {
    if (!hasMultipleSlides || autoplayMs <= 0) return undefined;

    const timer = window.setInterval(() => {
      setIndex((value) => (value + 1) % slides.length);
    }, autoplayMs);

    return () => window.clearInterval(timer);
  }, [autoplayMs, hasMultipleSlides, slides.length]);

  if (!slide) return null;

  return (
    <section className="urees-carousel-section">
      {sectionHeading ? (
        <div className="urees-page-width urees-carousel-section__heading">
          <h2 className="urees-section__title">{sectionHeading}</h2>
        </div>
      ) : null}

      <div className="urees-carousel">
        <div className="urees-carousel__media">
          <Image
            key={slide.image}
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
          {hasMultipleSlides ? (
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
          ) : null}
        </div>
      </div>
    </section>
  );
}
