import Image from 'next/image';
import styles from './ProfileOrderItem.module.scss';
import Button from '../Buttons/Button/Button';

function ProfileOrderDetails() {
  return (
    <div className={styles.order_details}>
      <div className={styles.order_details_img}>
        <Image
          src={'/notFound.jpg'}
          alt="product image"
          className="w-full h-full"
          width={80}
          height={98}
        />
      </div>
      <div className="w-full">
        <p className="mb-[26px]">Назва товару</p>
        <div className="w-full flex items-center justify-between">
          <p>235 грн</p>
          <Button onClick={() => console.log('Відгук')}>Залишити відгук</Button>
        </div>
      </div>
    </div>
  );
}

export default ProfileOrderDetails;
