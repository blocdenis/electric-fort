'use client';
import React from 'react';
import Section from '../Section/Section';
import CategoryCard from './CategoryCard';
import { categories } from '@/lib/db/categories';
import SectionTitle from '../Section/SectionTitle/SectionTitle';
import ButtonLink from '../Buttons/ButtonLink/ButtonLink';
import styles from './CategoriesSection.module.scss';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { ArrowCategoriesIcon } from '../icons';

function CategoriesSection() {
  return (
    <Section>
      <div className={styles.container}>
        <SectionTitle title="Категорії товарів" className=" mb-4" />
        <div className={styles.swiper_container}>
          <Swiper
            wrapperTag="ul"
            spaceBetween={16}
            slidesPerView={1.3}
            navigation={{
              nextEl: '#categories_btn_next',
              prevEl: '#categories_btn_prev',
            }}
            autoplay={{
              delay: 2500,
            }}
            breakpoints={{
              375: {
                slidesPerView: 1.55,
              },
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
              1240: {
                spaceBetween: 23,
                slidesPerView: 4,
              },
            }}
            modules={[Navigation, Autoplay]}
          >
            {categories.map(({ id, name, image }, index) => (
              <SwiperSlide tag="li" key={id}>
                <CategoryCard id={id} name={name} image={image} add_date="" />
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
        <div className={styles.button_container}>
          <ButtonLink
            className=" mt-6"
            href="/categories"
            title="Переглянути всі"
          />
        </div>
      </div>
    </Section>
  );
}

export default CategoriesSection;
