import React from 'react';
import SecondaryButton from '../Buttons/SecondaryButton';
import { HeartWithShadowIcon } from '../icons';
import ImageSlider from '../ImageSlider/ImageSlider';
import { Product } from '@/lib/types/Product.type';
import Specification from './specification/Specification';
import Image from 'next/image';

const specifications = [
  { characteristic: 'Бренд', description: 'Schneider' },
  { characteristic: 'Модель', description: 'Asfora' },
  { characteristic: 'Колір', description: 'білий' },
];
const ProductSpecification = ({ product }: { product: Product }) => {
  return (
    <div className="specification-container">
      <div className="specification-block">
        <Specification items={specifications} />
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

export default ProductSpecification;
