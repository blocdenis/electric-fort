'use client';
import { partners } from '@/lib/db/partners';
import Section from '../Section/Section';
import SectionTitle from '../Section/SectionTitle/SectionTitle';
import { ArrowCategoriesIcon } from '@/components/icons';
import styles from './Partners.module.scss';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Grid, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/grid';
import Image from 'next/image';

function Partners() {
  return (
    <Section>
      <div className={styles.container}>
        <SectionTitle title="Наші партнери" className=" mb-4 lg:mb-6" />
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
            modules={[Navigation, Grid, Autoplay]}
            grid={{ rows: 2, fill: 'row' }}
            breakpoints={{
              900: {
                spaceBetween: 0,
              },
            }}
            autoplay={{
              delay: 2500,
              pauseOnMouseEnter: true,
              disableOnInteraction: false,
            }}
            // loop
            loopAddBlankSlides
          >
            {partners.map(({ id, logo, url, name }, index) => (
              <SwiperSlide
                tag="li"
                className="  w-[74px] h-[74px] lg:w-[106px] lg:h-[106px] px-0 lg:px-[62.5px] flex items-center justify-center"
                key={id}
              >
                <a href={url} target="_blank" className=" w-full">
                  <div className=" w-[74px] h-[74px] [&>img]:w- lg:w-[106px] lg:h-[106px] flex items-center justify-center">
                    <Image
                      className=" w-full"
                      width={0}
                      height={0}
                      src={logo}
                      alt={`${name} logo`}
                      style={{ width: '100%', height: 'auto' }}
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
