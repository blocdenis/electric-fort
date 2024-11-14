import Image from 'next/image';
import React from 'react';
import categotyImg from '../../../public/category-img.jpg';
import Link from 'next/link';
import classNames from 'classnames';
import styles from './CategoryCard.module.scss';

interface CategoryCardProps {
  category_id?: number;
  name: string;
  image: string[] | null;
  brand_id?: number;
  series_id?: number;
  subseries_id?: number;
  subsubseries_id?: number;
}

function CategoryCard({
  category_id,
  name,
  image,
  brand_id,
  series_id,
  subseries_id,
  subsubseries_id,
}: CategoryCardProps) {
  return (
    <div className=" w-full h-full tablet:w-[220px] tablet:h-[228px] desktop:w-[220px] desktop:h-[228px] bg-white border border-[#DEDEDE] py-4 ">
      <Link
        href={
          subsubseries_id
            ? `/categories/${category_id}/${brand_id}/${series_id}/${subseries_id}/${subsubseries_id}`
            : subseries_id
            ? `/categories/${category_id}/${brand_id}/${series_id}/${subseries_id}`
            : series_id
            ? `/categories/${category_id}/${brand_id}/${series_id}`
            : brand_id
            ? `/categories/${category_id}/${brand_id}/`
            : `/categories/${category_id}/`
        }
        className="w-full h-full flex flex-col items-center justify-start"
      >
        <div className=" w-[160px] h-[160px] flex items-center justify-center object-cover">
          <Image
            width={140}
            height={140}
            src={image ? `data:${image[0]}; base64, ${image[1]}` : categotyImg}
            alt="product-category-image"
          ></Image>
        </div>
        <div className="px-[10px]">
          <h3
            title={name}
            className={classNames(
              ' text-black text-center',
              styles.category_title,
              styles.truncated_text
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
