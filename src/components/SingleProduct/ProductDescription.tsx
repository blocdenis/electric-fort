'use client';
// import { products } from '@/lib/db/products';
import React from 'react';
import SecondaryButton from '../Buttons/SecondaryButton';
import { HeartWithShadowFilledIcon, HeartWithShadowIcon } from '../icons';
import { useFavorites } from '@/context/FavoritesContext';
import WalletIcon from '../icons/WalletIcon';
import CarIcon from '../icons/CarIcon';
import ImageSlider from '../ImageSlider/ImageSlider';
import { Product } from '@/lib/types/Product.type';
import { useShoppingCart } from '@/context/ShoppingCartContext';
import { formatPriceUAH } from '@/services/formatCurrency';

const ProductDescription = ({ product }: { product: Product }) => {
  const { isFavorite, addToFavorites, deleteFromFavorites } = useFavorites();
  const { addToCart } = useShoppingCart();

  const handleFavoriteIconClick = () => {
    if (isFavorite(product.id)) {
      deleteFromFavorites.mutateAsync(product.id);
    } else {
      addToFavorites.mutateAsync(product.id);
    }
  };
  const increaseCartQuantity = () => {
    addToCart(product.id);
  };

  const productImages =
    product.images && product.images[0]
      ? product.images.map((image) => `data:${image[0]};base64,${image[1]}`)
      : [''];
  return (
    <div className="product-description-container">
      <div className="image-section">
        {product.images && <ImageSlider images={productImages} />}
      </div>
      <div className="description-section">
        <div className="name">{product.name}</div>
        <div className="article">код:{product.article}</div>
        <div className="price-section">
          <div>
            <span className="price">{product.price}</span>грн/
            {product.unit_of_measurement}
          </div>
          <div className=" flex gap-10 items-center pt-6 ">
            <div className="w-[75%]">
              <SecondaryButton
                className="px-[60px] w-full"
                onClick={() => increaseCartQuantity()}
              >
                Купити
              </SecondaryButton>
            </div>

            <div className=" flex justify-center items-center w-[41px] h-[41px]  ">
              {isFavorite(product.id) ? (
                <HeartWithShadowFilledIcon
                  onClick={handleFavoriteIconClick}
                  width={32}
                  height={30}
                  className=" fill-yellow hover:scale-[128%] transition-transform duration-300"
                />
              ) : (
                <HeartWithShadowIcon
                  onClick={handleFavoriteIconClick}
                  width={32}
                  height={30}
                  className=" fill-yellow hover:scale-[128%] transition-transform duration-300"
                />
              )}
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
