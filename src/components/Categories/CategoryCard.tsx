import Image from 'next/image';
import React from 'react';
import categotyImg from '../../../public/category-img.jpg';
import { Category } from '@/lib/types/types';
import Link from 'next/link';
import classNames from 'classnames';
import styles from './CategoryCard.module.scss';

function CategoryCard({ id, name, image }: Category) {
  return (
    <div className=" w-[220px] h-[228px] laptop:w-[100%] desktop:w-[220px] bg-white border border-[#DEDEDE] py-4 ">
      <Link
        href={`/categories/${id}`}
        className="w-full h-full flex flex-col items-center justify-start"
      >
        <div className=" w-[160px] h-[160px] flex items-center justify-center object-cover">
          <Image
            width={140}
            height={140}
            src={image ? image[1] : categotyImg}
            alt="product-category-image"
          ></Image>
        </div>
        <div className="px-[10px]">
          <h3
            className={classNames(
              ' text-black text-center',
              styles.category_title
            )}
          >
            {name}
          </h3>
        </div>
      </Link>
    </div>
  );
}

export default CategoryCard;
