import Breadcrumbs from '@/components/Breadcrumb/Breadcrumbs';

import React from 'react';
import OrderForm from '../../../components/Order/OrderForm';
import './styles.scss';
import OrderCart from '@/components/Order/OrderCart';

const OrderPage = () => {
  const breadcrumbsItens = [{ name: 'Оформлення замовлення', href: '/order' }];
  return (
    <div>
      <Breadcrumbs items={breadcrumbsItens} />
      <div className="container">
        <div className="item">
          <OrderForm />
        </div>
        <div className="item">
          <OrderCart />
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
