import Image from 'next/image';
import notFoundImage from '../../../public/notFound.jpg';
import { useQuery } from '@tanstack/react-query';
import {
  ProductRespond,
  getProductById,
  getUserInfo,
} from '@/services/api/api';
import { formatDate } from '@/lib/utils/formatDate';
import Link from 'next/link';

interface ProfileReviewItemProps {
  review: ProductRespond;
}

function ProfileReviewItem({ review }: ProfileReviewItemProps) {
  const { data: user, isFetching } = useQuery({
    queryKey: ['user'],
    queryFn: () => getUserInfo(),
    staleTime: 10 * 1000,
  });

  const productId = review.product_id;

  const { data } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => getProductById(productId),
    staleTime: 10 * 1000,
  });

  if (!data) {
    return <p>Такого товару не знайдено</p>;
  }

  const [product] = data;

  return (
    <div className=" mb-[10px] pb-8 border-b laptop:mb-6">
      <div className="flex justify-between items-start mb-4">
        {user?.first_name || user?.last_name ? (
          <p className=" text-md font-semibold">
            {user?.first_name + ' ' + user?.last_name}
          </p>
        ) : (
          <p>{user?.email}</p>
        )}
        <span className=" text-xs ">{formatDate(review.add_date)}</span>
      </div>
      <div className="flex gap-2 laptop:gap-3 items-center mb-4">
        <Link href={`/${review.product_id}`} className="">
          <div className=" relative w-[66px] h-[80px] laptop:w-[56px] laptop:h-[69px]">
            <Image
              src={
                product.images
                  ? `data:${product.images[0][0]}; base64, ${product.images[0][1]}`
                  : notFoundImage
              }
              alt="product image"
              fill
              sizes="100%"
              className=" object-cover"
            />
          </div>
        </Link>
        <Link href={`/${review.product_id}`}>
          <p className="text-sm">{product.name}</p>
        </Link>
      </div>
      <p className="text-sm">{review.respond}</p>
    </div>
  );
}

export default ProfileReviewItem;
