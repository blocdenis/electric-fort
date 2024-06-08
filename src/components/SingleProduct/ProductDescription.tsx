import { products } from '@/lib/db/products';
import React from 'react';
import SecondaryButton from '../Buttons/SecondaryButton';
import { HeartWithShadowFilledIcon, HeartWithShadowIcon } from '../icons';
import { useFavorites } from '@/context/FavoritesContext';
import WalletIcon from '../icons/WalletIcon';
import CarIcon from '../icons/CarIcon';
import ImageSlider from '../ImageSlider/ImageSlider';

const ProductDescription = () => {
  const productImages = [
    'https://picsum.photos/seed/img5/600/400',
    'https://picsum.photos/seed/img6/600/400',
    'https://picsum.photos/seed/img4/600/400',
    'https://picsum.photos/seed/img3/600/400',
    'https://picsum.photos/seed/img2/600/400',
  ];
  return (
    <div className="product-description-container">
      <div className="image-section">
        <ImageSlider images={productImages} />
      </div>
      <div className="description-section">
        <div className="name">{products[0].name}</div>
        <div className="article">код:{products[0].article}</div>
        <div className="price-section">
          <div>
            <span className="price">{products[0].price}</span>грн/
            {products[0].unit_of_measurement}
          </div>
          <div className=" flex justify-between items-center ">
            <div className="btn">
              <SecondaryButton>Купити</SecondaryButton>
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
        <div className="delivery-section">
          <div>
            <div className="delivery-header">
              <WalletIcon width={21} height={21} />
              <p className="delivery-hero">Оплата</p>
            </div>

            <ul className="options_list">
              <li>Онлайн-оплата карткою, Google Pay або Apple Pay</li>
              <li>Безготівковий</li>
              <li>Готівкою при отриманні</li>
              <li>Накладений платіж</li>
            </ul>
          </div>
          <div>
            <div className="delivery-header">
              <CarIcon width={25} height={25} />
              <p className="delivery-hero">Доставка</p>
            </div>

            <ul className="options_list payment">
              <li>Нова Пошта</li>
              <li>Укрпошта</li>
              <li>Поштомат НП</li>
              <li>Курьєр НП</li>
              <li>Самовивіз</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
