import Image from 'next/image';
import styles from './ProfileOrderItem.module.scss';
import Button from '../Buttons/Button/Button';
import { OrderProductItem } from '@/services/api/api';
import ReviewIcon from '../icons/ReviewIcon';
import notFoundImage from '../../../public/notFound.jpg';
import Popup from '../Popup/Popup';
import ReviewForm from './ReviewForm/ReviewForm';
import { useState } from 'react';
import AfterReviewSendInfo from './AfterReviewSendInfo';
import Link from 'next/link';

interface ProfileOrderDetailsProps {
  product: OrderProductItem;
}

function ProfileOrderDetails({ product }: ProfileOrderDetailsProps) {
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
  return (
    <div className={styles.order_details}>
      <Link href={`/${product.id}`} className={styles.order_details_img}>
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
      </Link>
      <div className="w-full">
        <Link href={`/${product.id}`}>
          <p className="mb-[26px]">{product.name}</p>
        </Link>
        <div className="w-full flex items-center justify-between">
          <p>{product.price} грн</p>
          <Button
            className="flex justify-center items-center gap-1 h-8"
            onClick={onCloseOpenReview}
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
