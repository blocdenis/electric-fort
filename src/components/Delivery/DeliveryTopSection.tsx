import Image from 'next/image';
import deliveryImg from '../../../public/delivery_img-min.png';
import CarIcon from '../icons/CarIcon';
import WalletIcon from '../icons/WalletIcon';
import styles from './Delivery.module.scss';

function DeliveryTopSection() {
  return (
    <section className={styles.delivery_top}>
      <div className={styles.delivery_top_item}>
        <div className={styles.delivery_top_item_head}>
          <div className=" mr-8">
            <WalletIcon width={59} height={59} />
          </div>
          <p className=" text-[24px] font-bold">Оплата</p>
        </div>
        <ul className={styles.payment_options_list}>
          <li>Онлайн-оплата карткою, Google Pay або Apple Pay</li>
          <li>Безготівковий</li>
          <li>Готівкою при отриманні</li>
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
        <ul className={styles.delivery_options_list}>
          <li>Нова Пошта</li>
          <li>Укрпошта</li>
          <li>Поштомат</li>
          <li>Курьєр</li>
          <li>Самовивіз</li>
        </ul>
      </div>
      <div className={styles.delivery_top_image_wrapper}>
        <Image src={deliveryImg} alt="delivery_image" width={332} />
      </div>
    </section>
  );
}

export default DeliveryTopSection;
