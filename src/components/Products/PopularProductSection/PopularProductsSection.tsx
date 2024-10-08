'use client';

import Section from '@/components/Section/Section';
import SectionTitle from '@/components/Section/SectionTitle/SectionTitle';
import styles from './PopularProductsSection.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import ProductCard from '../ProductCard/ProductCard';
import { useQuery } from '@tanstack/react-query';
import { getPopularProducts } from '@/services/api/api';
import ProductCardPlaceholder from '../ProductCard/ProductCardPlaceholder';
import classNames from 'classnames';
import ArrowPrevButton from '@/components/Buttons/ArrowButton/ArrowPrevButton';
import ArrowNextButton from '@/components/Buttons/ArrowButton/ArrowNextButton';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface PopularProductsSectionProps {
  title: string;
  // products?: Product[];
}

const PopularProductsSection: React.FC<PopularProductsSectionProps> = ({
  title,
  // products,
}) => {
  const {
    data: products,
    isRefetching,
    isError,
  } = useQuery({
    queryKey: ['popularProducts'],
    queryFn: () => getPopularProducts(),
    staleTime: 10,
  });

  return (
    <Section>
      <div
        className={classNames(
          styles.container,
          '[&_.swiper-pagination-bullets.swiper-pagination-horizontal]:bottom-[-40px] xl:[&_.swiper-pagination-bullets.swiper-pagination-horizontal]:bottom-8 '
        )}
      >
        <SectionTitle title={title} className=" mb-4" />
        <div className={classNames(styles.swiper_container)}>
          <Swiper
            wrapperTag="ul"
            wrapperClass=" items-center"
            className={styles.swiper_}
            spaceBetween={45}
            slidesPerView={1}
            pagination={{
              type: 'bullets',
              clickable: true,
              el: '#containerForBullets',
              dynamicBullets: true,
              // dynamicMainBullets: 1,
            }}
            navigation={{
              nextEl: '#products_btn_next',
              prevEl: '#products_btn_prev',
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 2,
              },
              1330: {
                slidesPerView: 3,
              },
            }}
            modules={[Navigation, Pagination]}
            loop
          >
            {isRefetching ? (
              <ul className="flex w-full overflow-hidden  ">
                <li className="w-full mr-[45px] min-[640px]:min-w-[calc(50%-(45px/2))] min-[970px]:min-w-[calc(33.33%-(45px*2/3))] laptop:min-w-[calc(50%-(45px/2))] min-[1330px]:min-w-[calc(33.33%-(45px*2/3))]">
                  <ProductCardPlaceholder />
                </li>
                <li className="w-full mr-[45px] min-[640px]:min-w-[calc(50%-(45px/2))] min-[970px]:min-w-[calc(33.33%-(45px*2/3))] laptop:min-w-[calc(50%-(45px/2))] min-[1330px]:min-w-[calc(33.33%-(45px*2/3))]">
                  <ProductCardPlaceholder />
                </li>
                <li className="w-full mr-[45px] min-[640px]:min-w-[calc(50%-(45px/2))] min-[970px]:min-w-[calc(33.33%-(45px*2/3))] laptop:min-w-[calc(50%-(45px/2))] min-[1330px]:min-w-[calc(33.33%-(45px*2/3))]">
                  <ProductCardPlaceholder />
                </li>
              </ul>
            ) : (
              products?.map((product) => (
                <SwiperSlide tag="li" key={product.id}>
                  <ProductCard {...product} />
                </SwiperSlide>
              ))
            )}
          </Swiper>
          <div className={styles.navigation_buttons_container}>
            <ArrowPrevButton id="products_btn_prev" />
            <ArrowNextButton id="products_btn_next" />
          </div>
          <div
            id="containerForBullets"
            className="absolute text-center transition-opacity z-10 w-[108px] left-1/2 translate-x-[-50%] whitespace-nowrap overflow-hidden laptop:hidden [&>.swiper-pagination-bullet]:w-3 [&>.swiper-pagination-bullet]:h-3 [&>.swiper-pagination-bullet]:border [&>.swiper-pagination-bullet]:border-yellow [&>.swiper-pagination-bullet]:opacity-100 [&>.swiper-pagination-bullet.swiper-pagination-bullet-active-main]:bg-yellow "
            style={{ width: '108px' }}
          ></div>
        </div>
      </div>
    </Section>
  );
};

export default PopularProductsSection;
