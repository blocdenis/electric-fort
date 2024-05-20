import Image from 'next/image';
import deliveryImg from '../../../public/delivery_img-min.png';
import CarIcon from '../icons/CarIcon';
import WalletIcon from '../icons/WalletIcon';
import styles from './Delivery.module.scss';

function DeliveryTopSection() {
  return (
    <div className={styles.delivery_top}>
      <div className={styles.delivery_top_item}>
        <div className={styles.delivery_top_item_head}>
          <div className=" mr-8">
            <WalletIcon width={59} height={59} />
          </div>
          <p className=" text-[24px] font-bold">Оплата</p>
        </div>
        <ul>
          <li className="mb-4">Готівкою при отриманні</li>
          <li className="mb-4">Безготівковий</li>
          <li className="mb-4">Оплата на сайті</li>
          <li>Накладений платіж</li>
        </ul>
      </div>
      <div className={styles.delivery_top_item}>
        <div className={styles.delivery_top_item_head}>
          <div className=" mr-8">
            <CarIcon width={82} height={59} />
          </div>
          <p className=" text-[24px] font-bold">Доставка</p>
        </div>
        <ul>
          <li className="mb-4">Нова Пошта</li>
          <li>Самовивіз</li>
        </ul>
      </div>
      <div className={styles.delivery_top_image_wrapper}>
        <Image
          src={deliveryImg}
          alt="delivery_image"
          width={412}
          height={412}
        />
      </div>
    </div>
  );
}

export default DeliveryTopSection;
