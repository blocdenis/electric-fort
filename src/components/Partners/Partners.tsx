'use client';
import { partners } from '@/lib/db/partners';
import Section from '../Section/Section';
import SectionTitle from '../Section/SectionTitle/SectionTitle';
import { ArrowCategoriesIcon } from '@/components/icons';
import styles from './Partners.module.scss';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Grid } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/grid';
import Image from 'next/image';

function Partners() {
  return (
    <Section>
      <div className={styles.container}>
        <SectionTitle title="Наші партнери" />
        <div className={styles.swiper_container}>
          <Swiper
            wrapperTag="ul"
            wrapperClass=""
            className="max-w-full md:max-w-full lg:max-w-full bg-white"
            spaceBetween={16}
            slidesPerView={4}
            navigation={{
              nextEl: '#partners_btn_next',
              prevEl: '#partners_btn_prev',
            }}
            modules={[Navigation, Grid]}
            grid={{ rows: 2, fill: 'row' }}
            breakpoints={{
              900: {
                spaceBetween: 0,
              },
            }}
            loop
          >
            {partners.map(({ id, logo, url, name }, index) => (
              <SwiperSlide
                tag="li"
                className="  w-[74px] h-[74px] lg:w-[106px] lg:h-[106px] px-0 lg:px-[62.5px] flex items-center justify-center"
                key={id}
              >
                <a href={url} target="_blank" className=" w-full">
                  <div className=" w-[74px] h-[74px] lg:w-[106px] lg:h-[106px] flex items-center justify-center">
                    <Image
                      className=" w-full"
                      width={74}
                      height={74}
                      src={logo}
                      alt={`${name} logo`}
                    />
                  </div>
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className={styles.navigation_buttons_container}>
            <div
              id="partners_btn_prev"
              className=" flex justify-center items-center w-[46px] h-[46px] rounded-full border border-secondary_green"
            >
              <ArrowCategoriesIcon className=" [&_path]:stroke-yellow" />
            </div>
            <div
              id="partners_btn_next"
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

export default Partners;
