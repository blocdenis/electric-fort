import Breadcrumbs from '@/components/Breadcrumb/Breadcrumbs';

import React from 'react';
import OrderForm from '../../../components/Order/OrderForm';
import styles from './styles.module.scss';
import OrderCart from '@/components/Order/OrderCart';
import Container from '@/components/Container/Container';

const OrderPage = () => {
  const breadcrumbsItens = [{ name: 'Оформлення замовлення', href: '/order' }];
  return (
    <div>
      <Container>
        <Breadcrumbs items={breadcrumbsItens} />
        <div className={styles.container}>
          <div className="item">
            <OrderForm />
          </div>
          <div className="item">
            <OrderCart />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default OrderPage;
