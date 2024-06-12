import React from 'react';
import SecondaryButton from '../Buttons/SecondaryButton';
import { HeartWithShadowIcon } from '../icons';
import { Product } from '@/lib/types/Product.type';
import Image from 'next/image';
import { Review } from '@/lib/types/types';
import Reviews from './reviews/Reviews';

const ProductReview = ({ product }: { product: Product }) => {
  const reviews: Review[] = [
    {
      id: 1,
      name: 'Елена Тимошенко',
      date: '12.01.2024',
      reviewText:
        'Був смажень, і швимкі яски Спіралили в кружві, І марамулькали псашки, Як трулі долові. Був смажень, і швимкі яски Спіралили в кружві, І марамулькали псашки, ',
    },
    {
      id: 2,
      name: 'Елена Тимошенко',
      date: '12.01.2024',
      reviewText:
        'Був смажень, і швимкі яски Спіралили в кружві, І марамулькали псашки, Як трулі долові. Був смажень, і швимкі яски Спіралили в кружві, І марамулькали псашки, ',
    },
    {
      id: 3,
      name: 'Елена Тимошенко',
      date: '12.01.2024',
      reviewText:
        'Був смажень, і швимкі яски Спіралили в кружві, І марамулькали псашки, Як трулі долові. Був смажень, і швимкі яски Спіралили в кружві, І марамулькали псашки, ',
    },
  ];
  return (
    <div className="specification-container">
      <div className="specification-block">
        <Reviews reviews={reviews} />
      </div>
      <div className="specification-block">
        <div className="specification-description">
          <div className="specification-image">
            {product.images && (
              <Image
                className="object-cover"
                src={`data:${product.images[0][0]};base64,${product.images[0][1]}`}
                width={152}
                height={194}
                alt={`Product Image ${product.id + 1}`}
              />
            )}
          </div>
          <div className="spesification-description">
            <div className="specification-name">{product.name}</div>
            <div className="specification-article">код:{product.article}</div>
            <div>
              <span className="specification-price">{product.price}</span>
              грн/
              {product.unit_of_measurement}
            </div>
            <div className=" flex justify-between items-center ">
              <div className="btn">
                <SecondaryButton className="btn">Купити</SecondaryButton>
              </div>

              <div className=" flex justify-center items-center w-[41px] h-[41px]  ">
                <HeartWithShadowIcon
                  width={41}
                  height={41}
                  className=" fill-yellow hover:scale-[128%] transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductReview;
