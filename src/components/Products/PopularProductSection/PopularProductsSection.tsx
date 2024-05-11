'use client';

import Section from '@/components/Section/Section';
import SectionTitle from '@/components/Section/SectionTitle/SectionTitle';
import { products } from '@/lib/db/products';
import styles from './PopularProductsSection.module.scss';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import ProductCard from '../ProductCard/ProductCard';
import { ArrowCategoriesIcon } from '@/components/icons';

function PopularProductsSection() {
  return (
    <Section>
      <div className={styles.container}>
        <SectionTitle title="Популярні товари" className=" mb-4" />
        <div className={styles.swiper_container}>
          <Swiper
            wrapperTag="ul"
            wrapperClass=" items-center"
            className={styles.swiper_}
            spaceBetween={45}
            slidesPerView={1}
            navigation={{
              nextEl: '#products_btn_next',
              prevEl: '#products_btn_prev',
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1330: {
                slidesPerView: 3,
              },
            }}
            modules={[Navigation]}
            loop
          >
            {products.map(
              (
                {
                  id,
                  vendorCode,
                  name,
                  image,
                  measurementUnit,
                  brand,
                  brand_id,
                  price,
                  description,
                  series,
                  series_id,
                },
                index
              ) => (
                <SwiperSlide tag="li" className="" key={id}>
                  <ProductCard
                    key={id}
                    id={id}
                    vendorCode={vendorCode}
                    name={name}
                    image={image}
                    measurementUnit={measurementUnit}
                    brand={brand}
                    brand_id={brand_id}
                    price={price}
                    description={description}
                    series={series}
                    series_id={series_id}
                  />
                </SwiperSlide>
              )
            )}
          </Swiper>
          <div className={styles.navigation_buttons_container}>
            <div
              id="products_btn_prev"
              className=" flex justify-center items-center w-[46px] h-[46px] rounded-full border border-secondary_green"
            >
              <ArrowCategoriesIcon className=" [&_path]:stroke-yellow" />
            </div>
            <div
              id="products_btn_next"
              className=" flex justify-center items-center w-[46px] h-[46px] rounded-full border border-secondary_green"
            >
              <ArrowCategoriesIcon className=" [&_path]:stroke-yellow rotate-180" />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

export default PopularProductsSection;
