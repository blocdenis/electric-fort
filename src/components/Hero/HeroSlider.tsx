'use client';
import React, { FC, useState, useEffect, useRef } from 'react';
import Image, { StaticImageData } from 'next/image';
import './HeroSlider.css';

interface CarouselProps {
  data: { src: string | StaticImageData; alt: string }[];
}

const HeroSlider: FC<CarouselProps> = ({ data }) => {
  const [slide, setSlide] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setSlide((prevSlide) =>
          prevSlide === data.length - 1 ? 0 : prevSlide + 1
        ),
      4000
    );

    return () => {
      resetTimeout();
    };
  }, [slide, data.length]);

  const handleIndicatorClick = (index: number) => {
    setSlide(index);
    resetTimeout();
  };

  const handleSlideClick = () => {
    setSlide((prevSlide) =>
      prevSlide === data.length - 1 ? 0 : prevSlide + 1
    );
    resetTimeout();
  };

  return (
    <div className="carousel">
      {data.map((item, idx) => (
        <div
          key={idx}
          onClick={handleSlideClick}
          className={slide === idx ? 'slide' : 'slide slide-hidden'}
        >
          <Image
            src={item.src}
            alt={item.alt}
            width={400}
            height={600}
            className="hero-image"
            priority
          />
        </div>
      ))}
      <span className="indicators">
        {data.map((_, idx) => (
          <button
            key={idx}
            className={
              slide === idx ? 'indicator' : 'indicator indicator-inactive'
            }
            onClick={() => handleIndicatorClick(idx)}
          ></button>
        ))}
      </span>
    </div>
  );
};

export default HeroSlider;
