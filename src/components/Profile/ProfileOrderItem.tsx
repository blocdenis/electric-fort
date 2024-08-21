import classNames from 'classnames';
import styles from './ProfileOrderItem.module.scss';
import { ArrowCatalogIcon } from '../icons';
import { useState } from 'react';
import ProfileOrderDetails from './ProfileOrderDetails';
import { UserOrder } from '@/services/api/api';
import { formatDate } from '@/lib/utils/formatDate';

interface ProfileOrderItemProps {
  order: UserOrder;
}

function ProfileOrderItem({ order }: ProfileOrderItemProps) {
  const [isDetailsShown, setIsDetailsShown] = useState(false);
  const rotation = isDetailsShown ? -90 : 90;
  return (
    <div className={styles.order}>
      <div className={styles.order_info}>
        <div className={styles.order_item}>
          <h3 className={styles.order_item_heading}>замовлення</h3>
          <p>
            № {order.id} <br /> від {formatDate(order.add_date)}
          </p>
          <p
            className={classNames(styles.order_status, {
              [`${styles.order_status__new}`]: order.status === 'Новий',
              [`${styles.order_status__processing}`]:
                order.status === 'В обробці',
              [`${styles.order_status__sent}`]: order.status === 'Відправлено',
              [`${styles.order_status__done}`]: order.status === 'Доставлено',
              [`${styles.order_status__done}`]: order.status === 'Відмінено',
              [`${styles.order_status__done}`]: order.status === 'Виконано',
            })}
          >
            {order.status}
          </p>
        </div>
        <div className={styles.order_item}>
          <h3 className={styles.order_item_heading}>вартість покупки</h3>
          <p>{order.sum} грн</p>
        </div>
        <div className={styles.order_item}>
          <h3 className={styles.order_item_heading}>спосіб оплати</h3>
          <p>{order.payment}</p>
        </div>
        <div className={styles.order_item}>
          <div>
            <h3 className={styles.order_item_heading}>спосіб доставки</h3>
            <p>{order.dilivery}</p>
            {order.dilivery === 'Нова Пошта' ||
            order.dilivery === 'Укрпошта' ? (
              <p>відділення {order.department.split(',')[0]}</p>
            ) : null}

            {order.dilivery === 'Нова Пошта' ? (
              <p>{order.department.split(',').slice(1).join(',')}</p>
            ) : null}

            <p>{order.city_dilivery}</p>
          </div>
          <div
            onClick={() => setIsDetailsShown((prevVal) => !prevVal)}
            className="flex items-center gap-[10px] text-grey justify-end mt-[13px] cursor-pointer"
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
          {order.products.map((product) => (
            <li key={product.article}>
              <ProfileOrderDetails
                product={product}
                orderStatus={order.status}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ProfileOrderItem;
