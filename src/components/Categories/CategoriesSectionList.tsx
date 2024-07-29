'use client';

import CategoryCard from './CategoryCard';
import styles from './CategoriesSection.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { formatedString } from '@/lib/utils/formatString';
import { Category } from '@/lib/types/types';
import ArrowPrevButton from '../Buttons/ArrowButton/ArrowPrevButton';
import ArrowNextButton from '../Buttons/ArrowButton/ArrowNextButton';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

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
          1100: { slidesPerView: 3, spaceBetween: 23 },
          1300: {
            slidesPerView: 4,
            spaceBetween: 23,
          },
        }}
        modules={[Navigation, Autoplay]}
      >
        {categories?.map(({ id, name, image }, index) => (
          <SwiperSlide
            tag="li"
            key={id}
            style={{ width: '220px', height: '228px' }}
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
        <ArrowPrevButton id="categories_btn_prev" />
        <ArrowNextButton id="categories_btn_next" />
      </div>
    </div>
  );
}

export default CategoriesSectionList;
