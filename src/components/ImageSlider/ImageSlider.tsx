import React, { useState } from 'react';
import styles from './ImageSlider.module.scss';
import Image from 'next/image';
import notFound from './../../../public/notFound.jpg';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

interface ImageSliderProps {
  images: string[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [open, setOpen] = useState(false);

  // console.log(images);

  return (
    <div className={styles['image-slider']}>
      <div className={styles['main-image']} onClick={() => setOpen(true)}>
        <Image
          src={images[0] !== '' ? images[currentIndex] : notFound}
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
              src={image !== '' ? image : notFound}
              width={44}
              height={54}
              alt={`Thumbnail ${index + 1}`}
            />
          </div>
        ))}
      </div>
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={images.map((item, index) => ({
          src: item,
          alt: `Image${index}`,
        }))}
      />
    </div>
  );
};

export default ImageSlider;
