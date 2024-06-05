import { products } from '@/lib/db/products';
import React from 'react';
import SecondaryButton from '../Buttons/SecondaryButton';
import { HeartWithShadowIcon } from '../icons';
import ImageSlider from '../ImageSlider/ImageSlider';

const ProductSpecification = () => {
  return (
    <div className="specification-container">
      <div className="specification-block">specification</div>
      <div className="specification-block">
        <div className="specification-description">
          <div className="specification-image">
            <ImageSlider images={[]} />
          </div>
          <div className="spesification-description">
            <div className="specification-name">{products[0].name}</div>
            <div className="specification-article">
              код:{products[0].article}
            </div>
            <div>
              <span className="specification-price">{products[0].price}</span>
              грн/
              {products[0].unit_of_measurement}
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
