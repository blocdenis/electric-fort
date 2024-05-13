'use client';
import Image from 'next/image';
import Link from 'next/link';
import {
  HeartWithShadowFilledIcon,
  HeartWithShadowIcon,
} from '@/components/icons';
import notFoundImage from '@/../public/notFound.jpg';
import styles from './ProductCard.module.scss';
import { Product } from '@/lib/db/types';
import classNames from 'classnames';
import SecondaryButton from '@/components/Buttons/SecondaryButton';
import { useState } from 'react';
import { useShoppingCart } from '@/context/ShoppingCartContext';

function ProductCard({
  id,
  vendorCode,
  name,
  measurementUnit,
  brand,
  price,
  description,
  image,
  series,
  series_id,
  brand_id,
}: Product) {
  const productPageLink = `/${name}`;
  const {
    cartItems,
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
    cartQuantity,
  } = useShoppingCart();
  const [isFavorite, setIsFavorite] = useState(false);

  const quantity = getItemQuantity(id);
  const handleFavoriteIconClick = () => {
    setIsFavorite((prevValue) => !prevValue);
  };

  return (
    <div className=" inline-block bg-white w-[286px] h-[400px] px-4 pt-4 pb-6 shadow-[0_1px_1px_0_rgba(0,0,0,0.25)]">
      <div className=" w-[254px] h-[176px] overflow-hidden mb-4 ">
        <Link href={productPageLink}>
          <Image
            className=""
            src={image ? image : notFoundImage}
            alt={`${name} image`}
            width={254}
            height={176}
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
          >{`${measurementUnit}`}</p>
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
          {isFavorite ? (
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
