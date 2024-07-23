'use client';

import CategoryCard from './CategoryCard';
import styles from './CategoriesSection.module.scss';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { ArrowCategoriesIcon } from '../icons';
import { formatedString } from '@/lib/utils/formatString';
import { Category } from '@/lib/types/types';

function CategoriesSectionList({
  categories,
}: {
  categories: Category[] | undefined;
}) {
  return (
    <div className={styles.swiper_container}>
      <Swiper
        wrapperTag="ul"
        spaceBetween={8}
        slidesPerView={1.6}
        navigation={{
          nextEl: '#categories_btn_next',
          prevEl: '#categories_btn_prev',
        }}
        // autoplay={{
        //   delay: 2500,
        // }}
        breakpoints={{
          425: {
            slidesPerView: 1.8,
          },
          472: {
            slidesPerView: 2,
          },
          598: {
            slidesPerView: 2.5,
          },
          708: {
            slidesPerView: 3,
          },
          940: { slidesPerView: 3.5 },
          1024: { slidesPerView: 2, spaceBetween: 23 },
          1100: { slidesPerView: 3 },
          1300: {
            slidesPerView: 4,
          },
        }}
        modules={[Navigation, Autoplay]}
      >
        {categories?.map(({ id, name, image }, index) => (
          <SwiperSlide
            tag="li"
            key={id}
            // style={{ width: '220px', height: '228px' }}
          >
            <CategoryCard
              category_id={id}
              name={formatedString(name)}
              image={image}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={styles.navigation_buttons_container}>
        <div
          id="categories_btn_prev"
          className=" flex justify-center items-center w-[46px] h-[46px] rounded-full border border-secondary_green"
        >
          <ArrowCategoriesIcon className=" [&_path]:stroke-yellow" />
        </div>
        <div
          id="categories_btn_next"
          className=" flex justify-center items-center w-[46px] h-[46px] rounded-full border border-secondary_green"
        >
          <ArrowCategoriesIcon className=" [&_path]:stroke-yellow rotate-180" />
        </div>
      </div>
    </div>
  );
}

export default CategoriesSectionList;
