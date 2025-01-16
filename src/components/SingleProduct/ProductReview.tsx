'use state';
import React from 'react';
import SecondaryButton from '../Buttons/SecondaryButton';
import { HeartWithShadowFilledIcon, HeartWithShadowIcon } from '../icons';
import { Product } from '@/lib/types/Product.type';
import Image from 'next/image';
import Reviews from './reviews/Reviews';
import notFoundImage from '@/../public/notFound.jpg';
import { ProductRespond } from '@/services/api/api';
import { useShoppingCart } from '@/context/ShoppingCartContext';
import { useFavorites } from '@/context/FavoritesContext';

const ProductReview = ({
  product,
  reviews,
}: {
  product: Product;
  reviews: ProductRespond[] | undefined;
}) => {
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
      <div className="specification-block-1">
        {reviews ? (
          reviews.length !== 0 ? (
            <Reviews reviews={reviews} />
          ) : (
            <p>
              Відгуків поки немає. Ви можете залишити свій відгук в особистому
              кабінеті після придбання цього товара.
            </p>
          )
        ) : (
          <p>
            Відгуків поки немає. Ви можете залишити свій відгук в особистому
            кабінеті після придбання цього товара.
          </p>
        )}
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
            <div className="specification-name-container">
              <div className="specification-article">код:{product.article}</div>
              <div className="specification-mesurement">
                <span className="specification-price">{product.price}</span>
                грн/
                <span>1{product.unit_of_measurement}</span>
              </div>
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

export default ProductReview;
