'use client';
import Image from 'next/image';
import Link from 'next/link';
import {
  HeartWithShadowFilledIcon,
  HeartWithShadowIcon,
} from '@/components/icons';
import notFoundImage from '@/../public/notFound.jpg';
import styles from './ProductCard.module.scss';
import { Product } from '@/lib/types/types';
import classNames from 'classnames';
import SecondaryButton from '@/components/Buttons/SecondaryButton';
import { useState } from 'react';
import { useShoppingCart } from '@/context/ShoppingCartContext';
import { useFavorites } from '@/context/FavoritesContext';

function ProductCard({
  id,
  name,
  unit_of_measurement,
  price,
  description,
  in_stock,
  popular,
  images,
  series_id,
  subseries_id,
  brand_id,
  updated_info_date,
  add_date,
  article,
}: Product) {
  const productPageLink = `/products/${id}`;
  const {
    cartItems,
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
    cartQuantity,
  } = useShoppingCart();

  const { toggleFavorites, isFavorite } = useFavorites();

  // const [isFavorite, setIsFavorite] = useState(false);

  const quantity = getItemQuantity(id);

  const handleFavoriteIconClick = () => {
    // setIsFavorite((prevValue) => !prevValue);
    toggleFavorites({
      id,
      name,
      unit_of_measurement,
      price,
      description,
      in_stock,
      popular,
      images,
      series_id,
      subseries_id,
      brand_id,
      updated_info_date,
      add_date,
      article,
    });
  };

  // const handleFavoriteIconClickDelete = () => {
  //   // setIsFavorite((prevValue) => !prevValue);
  //   removeFromFavorites(id);
  // };

  return (
    <div className=" inline-block bg-white w-[286px] h-[400px] px-4 pt-4 pb-6 shadow-[0_1px_1px_0_rgba(0,0,0,0.25)]">
      <div className=" w-auto h-[176px] overflow-hidden mb-4 ">
        <Link href={productPageLink}>
          <Image
            className=""
            src={
              images
                ? `data:${images[0][0]}; base64, ${images[0][1]}`
                : notFoundImage
            }
            alt={`${name} image`}
            width={254}
            height={254}
          />
        </Link>
      </div>
      <div className=" flex flex-col gap-3 mb-4">
        <Link href={productPageLink}>
          <p
            title={name}
            className={classNames(styles.product_name, styles.truncated_text)}
          >
            {name}
          </p>
        </Link>
        <div className="flex items-center justify-start ">
          <p className={styles.product_price}>{price}</p>
          <span className={styles.product_price_measurement_unit}>грн/</span>
          <p
            className={styles.product_price_measurement_unit}
          >{`${unit_of_measurement}`}</p>
        </div>
      </div>
      <div className=" flex justify-between items-center">
        {/* <button onClick={() => increaseCartQuantity(id)}>
          Купити {quantity}
        </button> */}
        <SecondaryButton type="button" onClick={() => increaseCartQuantity(id)}>
          Купити
        </SecondaryButton>
        <div className=" flex justify-center items-center w-[41px] h-[41px]">
          {isFavorite(id) ? (
            <HeartWithShadowFilledIcon
              onClick={handleFavoriteIconClick}
              width={32}
              height={30}
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
  );
}

export default ProductCard;
