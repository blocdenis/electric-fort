import Image from 'next/image';
import React from 'react';
import categotyImg from '../../../public/category-img.jpg';
import Link from 'next/link';
import classNames from 'classnames';
import styles from './CategoryCard.module.scss';

function CategoryCardPlaceholder() {
  return (
    <div className="flex flex-col animate-pulse items-center w-[220px] h-[228px] tablet:w-[220px] tablet:h-[228px] desktop:w-[220px] desktop:h-[228px] bg-white border border-[#DEDEDE] py-4 px-[12.5px] ">
      <div className=" w-[160px] h-[160px] flex items-center justify-center object-cover">
        <Image
          width={140}
          height={140}
          src={categotyImg}
          alt="product-category-image"
        ></Image>
      </div>
      <div className="bg-gray-100 w-[195px] h-10"></div>
    </div>
  );
}

export default CategoryCardPlaceholder;
