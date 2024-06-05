import React, { useState } from 'react';
import styles from './ImageSlider.module.scss';
import Image from 'next/image';

interface ImageSliderProps {
  images: string[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className={styles['image-slider']}>
      <div className={styles['main-image']}>
        <Image
          src={images[currentIndex]}
          width={252}
          height={316}
          alt={`Product ${currentIndex + 1} `}
        />
      </div>
      <div className={styles['thumbnail-container']}>
        {images.slice(0, 5).map((image, index) => (
          <div
            key={index}
            className={`${styles.thumbnail} ${
              index === currentIndex ? styles.active : ''
            }`}
            onClick={() => setCurrentIndex(index)}
          >
            <Image
              src={image}
              width={44}
              height={54}
              alt={`Thumbnail ${index + 1}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
