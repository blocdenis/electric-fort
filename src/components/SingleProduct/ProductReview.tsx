'use state';
import React from 'react';
import SecondaryButton from '../Buttons/SecondaryButton';
import { HeartWithShadowIcon } from '../icons';
import { Product } from '@/lib/types/Product.type';
import Image from 'next/image';
import Reviews from './reviews/Reviews';
import notFoundImage from '@/../public/notFound.jpg';
import { ProductRespond } from '@/services/api/api';

const ProductReview = ({
  product,
  reviews,
}: {
  product: Product;
  reviews: ProductRespond[] | undefined;
}) => {
  // const reviews: Review[] = [
  //   {
  //     id: 1,
  //     name: 'Елена Тимошенко',
  //     date: '12.01.2024',
  //     reviewText:
  //       'Був смажень, і швимкі яски Спіралили в кружві, І марамулькали псашки, Як трулі долові. Був смажень, і швимкі яски Спіралили в кружві, І марамулькали псашки, ',
  //   },
  //   {
  //     id: 2,
  //     name: 'Елена Тимошенко',
  //     date: '12.01.2024',
  //     reviewText:
  //       'Був смажень, і швимкі яски Спіралили в кружві, І марамулькали псашки, Як трулі долові. Був смажень, і швимкі яски Спіралили в кружві, І марамулькали псашки, ',
  //   },
  //   {
  //     id: 3,
  //     name: 'Елена Тимошенко',
  //     date: '12.01.2024',
  //     reviewText:
  //       'Був смажень, і швимкі яски Спіралили в кружві, І марамулькали псашки, Як трулі долові. Був смажень, і швимкі яски Спіралили в кружві, І марамулькали псашки, ',
  //   },
  // ];

  // const { data: reviewsData, isPending } = useQuery({
  //   queryKey: ['reviews', product.id],
  //   queryFn: () => getProductReviewsByProductId(product.id),
  //   staleTime: 10 * 1000,
  // });

  // const reviews = reviewsData?.data;

  return (
    <div className="specification-container">
      <div className="specification-block">
        {reviews ? (
          reviews.length !== 0 ? (
            <Reviews reviews={reviews} />
          ) : (
            <p>
              Відгуків поки немає. Ви можете залишити свій відгук в особистому
              кабінеті після придбання цього товара.
            </p>
          )
        ) : (
          <p>
            Відгуків поки немає. Ви можете залишити свій відгук в особистому
            кабінеті після придбання цього товара.
          </p>
        )}
      </div>
      <div className="specification-block">
        <div className="specification-description">
          <div className="specification-image">
            {product.images && (
              <Image
                className="object-cover"
                src={
                  product.images && product.images[0]
                    ? `data:${product.images[0][0]};base64,${product.images[0][1]}`
                    : notFoundImage
                }
                width={152}
                height={194}
                alt={`Product Image ${product.id + 1}`}
              />
            )}
          </div>
          <div className="spesification-description">
            <div className="specification-name">{product.name}</div>
            <div className="specification-name-container">
              <div className="specification-article">код:{product.article}</div>
              <div className="specification-mesurement">
                <span className="specification-price">{product.price}</span>
                грн/
                <span>1{product.unit_of_measurement}</span>
              </div>
            </div>

            <div className=" flex gap-10 items-center ">
              <div>
                <SecondaryButton className="w-[188px]">Купити</SecondaryButton>
              </div>
              <div className=" flex justify-center items-center w-[41px] h-[41px]  ">
                <HeartWithShadowIcon
                  width={41}
                  height={41}
                  className=" fill-yellow hover:scale-[128%] transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductReview;
