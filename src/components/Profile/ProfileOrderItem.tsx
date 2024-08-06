import classNames from 'classnames';
import styles from './ProfileOrderItem.module.scss';
import { ArrowCatalogIcon } from '../icons';
import { useState } from 'react';
import ProfileOrderDetails from './ProfileOrderDetails';

function ProfileOrderItem({}) {
  const [isDetailsShown, setIsDetailsShown] = useState(false);
  const rotation = isDetailsShown ? -90 : 90;
  return (
    <div className={styles.order}>
      <div className={styles.order_info}>
        <div className={styles.order_item}>
          <h3 className={styles.order_item_heading}>замовлення</h3>
          <p>
            № 000001 <br /> від 01.01.2024
          </p>
          <p
            className={classNames(styles.order_status, {
              [`${styles.order_status__new}`]: true,
              [`${styles.order_status__processing}`]: true,
              [`${styles.order_status__sent}`]: true,
              [`${styles.order_status__done}`]: true,
            })}
          >
            Новий
          </p>
        </div>
        <div className={styles.order_item}>
          <h3 className={styles.order_item_heading}>вартість покупки</h3>
          <p>2383 грн</p>
        </div>
        <div className={styles.order_item}>
          <h3 className={styles.order_item_heading}>спосіб оплати</h3>
          <p>Готівкою при отриманні</p>
        </div>
        <div className={styles.order_item}>
          <h3 className={styles.order_item_heading}>спосіб доставки</h3>
          <p>Нова Пошта</p>
          <p>відділення №205</p>
          <p>вул.Аааааааааааааааааааааа, 34</p>
          <div
            onClick={() => setIsDetailsShown((prevVal) => !prevVal)}
            className="flex items-center gap-[10px] text-grey justify-end mt-[13px]"
          >
            <div>деталі замовлення</div>
            <div className="w-[16px] h-[11px]">
              <ArrowCatalogIcon
                rotation={rotation}
                className=" fill-grey w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
      {isDetailsShown && (
        <ul>
          <li>
            <ProfileOrderDetails />
          </li>
        </ul>
      )}
    </div>
  );
}

export default ProfileOrderItem;
