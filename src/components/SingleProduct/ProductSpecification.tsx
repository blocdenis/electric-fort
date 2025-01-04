import React from 'react';
import SecondaryButton from '../Buttons/SecondaryButton';
import { HeartWithShadowFilledIcon, HeartWithShadowIcon } from '../icons';
import ImageSlider from '../ImageSlider/ImageSlider';
import { Product } from '@/lib/types/Product.type';
import Specification from './specification/Specification';
import Image from 'next/image';
import notFoundImage from '@/../public/notFound.jpg';
import { useFavorites } from '@/context/FavoritesContext';
import { useShoppingCart } from '@/context/ShoppingCartContext';

const specifications = [
  { characteristic: 'Бренд', description: 'Schneider' },
  { characteristic: 'Модель', description: 'Asfora' },
  { characteristic: 'Колір', description: 'білий' },
]; /////// need to be taken from backend!!!!

const ProductSpecification = ({ product }: { product: Product }) => {
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
                src={
                  product.images && product.images[0]
                    ? `data:${product.images[0][0]};base64,${product.images[0][1]}`
                    : notFoundImage
                }
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
            <div className=" flex gap-10 items-center ">
              <div>
                <SecondaryButton
                  className="px-[60px]"
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
        </div>
      </div>
    </div>
  );
};

export default ProductSpecification;
