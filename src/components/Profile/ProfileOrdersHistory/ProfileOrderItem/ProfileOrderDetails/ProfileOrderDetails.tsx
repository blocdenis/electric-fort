import Image from 'next/image';
import styles from './../ProfileOrderItem.module.scss';
import Button from '../../../../Buttons/Button/Button';
import { OrderProductItem, UserOrderStatus } from '@/services/api/api';
import ReviewIcon from '../../../../icons/ReviewIcon';
import notFoundImage from '../../../../../../public/notFound.jpg';
import Popup from '../../../../Popup/Popup';
import ReviewForm from './ReviewForm/ReviewForm';
import { useState } from 'react';
import AfterReviewSendInfo from './AfterReviewSendInfo';
import Link from 'next/link';

interface ProfileOrderDetailsProps {
  product: OrderProductItem;
  orderStatus: UserOrderStatus;
}

function ProfileOrderDetails({
  product,
  orderStatus,
}: ProfileOrderDetailsProps) {
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [isOpenMessageAfterReview, setIsOpenMessageAfterReview] =
    useState(false);
  const onCloseOpenReview = () => {
    setIsReviewOpen((prevVal) => !prevVal);
  };
  const onCloseOpenMessageAfterReview = () => {
    setIsOpenMessageAfterReview((prevVal) => !prevVal);
  };

  const onReviewSend = () => {
    onCloseOpenReview();
    onCloseOpenMessageAfterReview();
  };
  console.log(orderStatus);

  return (
    <div className={styles.order_details}>
      <Link href={`/${product.id}`}>
        <div className={styles.order_details_img}>
          <Image
            src={
              product.images
                ? `data:${product.images[0][0]}; base64, ${product.images[0][1]}`
                : notFoundImage
            }
            alt="product image"
            className="w-full h-full object-cover"
            fill={true}
            sizes="100%"
          />
        </div>
      </Link>

      <div className="w-full flex flex-col justify-between laptop:basis-auto">
        <Link href={`/${product.id}`}>
          <p className="mb-[26px]">{product.name}</p>
        </Link>
        <div className="w-full flex flex-col items-end gap-6 laptop:flex-row laptop:items-center justify-between">
          <p>{product.price} грн</p>
          <Button
            className="flex justify-center items-center gap-1 w-[231px] py-[5px]"
            onClick={onCloseOpenReview}
            disabled={orderStatus !== 'Виконано'}
          >
            <ReviewIcon width={24} height={24} />
            Залишити відгук
          </Button>
        </div>
      </div>
      <Popup isOpen={isReviewOpen} onClick={onCloseOpenReview}>
        <ReviewForm
          id={product.id}
          productName={product.name}
          onClose={onReviewSend}
        />
      </Popup>
      <Popup
        isOpen={isOpenMessageAfterReview}
        onClick={onCloseOpenMessageAfterReview}
      >
        <AfterReviewSendInfo />
      </Popup>
    </div>
  );
}

export default ProfileOrderDetails;
