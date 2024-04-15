'use client';
import React, { FC, useState } from 'react';
import Image from 'next/image';
import './HeroSlider.css';
interface CarouselProps {
  data: { src: string; alt: string }[];
}
const HeroSlider: FC<CarouselProps> = ({ data }) => {
  const [slide, setSlide] = useState(0);

  return (
    <div className="carousel">
      {data.map((item, idx) => {
        return (
          <Image
            src={item.src}
            alt={item.alt}
            key={idx}
            width={400}
            height={600}
            className={slide === idx ? 'slide' : 'slide slide-hidden'}
          />
        );
      })}
      <span className="indicators">
        {data.map((_, idx) => {
          return (
            <button
              key={idx}
              className={
                slide === idx ? 'indicator' : 'indicator indicator-inactive'
              }
              onClick={() => setSlide(idx)}
            ></button>
          );
        })}
      </span>
    </div>
  );
};
export default HeroSlider;
