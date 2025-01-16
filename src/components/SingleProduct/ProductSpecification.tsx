import React from 'react';
import SecondaryButton from '../Buttons/SecondaryButton';
import { HeartWithShadowFilledIcon, HeartWithShadowIcon } from '../icons';
import { Product } from '@/lib/types/Product.type';
import Specification from './specification/Specification';
import Image from 'next/image';
import notFoundImage from '@/../public/notFound.jpg';
import { useFavorites } from '@/context/FavoritesContext';
import { useShoppingCart } from '@/context/ShoppingCartContext';
import { Brand, ProductSeries } from '@/lib/types/types';

const ProductSpecification = ({
  product,
  brand,
  brandSeries,
}: {
  product: Product;
  brand: Brand[] | undefined;
  brandSeries: ProductSeries[] | undefined;
}) => {
  const { isFavorite, addToFavorites, deleteFromFavorites } = useFavorites();
  const { addToCart } = useShoppingCart();

  let specificationProductBrandName = '';
  let specificationProductSeriesName = '';

  if (brand) {
    specificationProductBrandName = brand[0]?.name;
  }
  if (brandSeries) {
    specificationProductSeriesName = brandSeries[0]?.name;
  }

  const specifications = [
    { characteristic: 'Бренд', description: specificationProductBrandName },
    { characteristic: 'Серія', description: specificationProductSeriesName },
    // { characteristic: 'Колір', description: 'білий' },
  ];

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
      <div className="specification-block specification-block-1">
        <Specification items={specifications} />
      </div>
      <div className="specification-block specification-block-2 specification-description">
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
          <p className="specification-name">{product.name}</p>
          <span className="specification-article">код:{product.article}</span>
          <div>
            <span className="specification-price">{product.price}</span>
            грн/
            {product.unit_of_measurement}
          </div>
          <div className=" flex gap-10 items-center ">
            <div>
              <SecondaryButton
                className="px-[60px] laptop:px-[30px] desktop:px-[60px]"
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
  );
};

export default ProductSpecification;
