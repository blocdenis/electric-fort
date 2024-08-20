import { useTranslations } from 'next-intl';
import Image from 'next/image';
import deliveryImg from '../../../public/delivery_img-min.png';
import CarIcon from '../icons/CarIcon';
import WalletIcon from '../icons/WalletIcon';
import styles from './Delivery.module.scss';

function DeliveryTopSection() {
  const t = useTranslations('Delivery');

  const paymentOptions = t('payment_options').split(';');
  const deliveryOptions = t('delivery_options').split(';');

  return (
    <section className={styles.delivery_top}>
      <div className={styles.delivery_top_item}>
        <div className={styles.delivery_top_item_head}>
          <div className="mr-8">
            <WalletIcon width={59} height={59} />
          </div>
          <p className="text-[24px] font-bold">{t('payment')}</p>
        </div>
        <ul className={styles.payment_options_list}>
          {paymentOptions.map((option, index) => (
            <li key={index}>{option}</li>
          ))}
        </ul>
      </div>
      <div className={styles.delivery_top_item}>
        <div className={styles.delivery_top_item_head}>
          <div className="mr-8">
            <CarIcon width={82} height={59} />
          </div>
          <p className="text-[24px] font-bold">{t('delivery')}</p>
        </div>
        <ul className={styles.delivery_options_list}>
          {deliveryOptions.map((option, index) => (
            <li key={index}>{option}</li>
          ))}
        </ul>
      </div>
      <div className={styles.delivery_top_image_wrapper}>
        <Image src={deliveryImg} alt="delivery_image" width={332} />
      </div>
    </section>
  );
}

export default DeliveryTopSection;
