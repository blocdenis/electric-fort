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
import { useShoppingCart } from '@/context/ShoppingCartContext';
import { useFavorites } from '@/context/FavoritesContext';

function ProductCardPlaceholder() {
  return (
    <div className="bg-white w-[286px] h-[400px] px-4 pt-4 pb-6 shadow-[0_1px_1px_0_rgba(0,0,0,0.25)] animate-pulse">
      <div className=" flex justify-center w-[254px] h-[176px] overflow-hidden mb-4 ">
        <div className="w-[254px] h-[176px] bg-gray-100"></div>
      </div>
      <div className=" flex flex-col gap-3 mb-4">
        <span className="w-[254px] h-[66px] bg-gray-100"></span>

        <div className="flex items-center justify-start ">
          {/* <p className="w-[254px] h-[66px] bg-gray-500"></p> */}
          <span className="w-[100px] h-[25px] bg-gray-100"></span>
          <p></p>
        </div>
      </div>
      <div className=" flex justify-between items-center">
        <SecondaryButton type="button">Купити</SecondaryButton>
        <div className=" flex justify-center items-center w-[41px] h-[41px] cursor-pointer">
          <HeartWithShadowIcon
            width={32}
            height={30}
            className=" fill-yellow hover:scale-[128%] transition-transform duration-300"
          />
        </div>
      </div>
    </div>
  );
}

export default ProductCardPlaceholder;
