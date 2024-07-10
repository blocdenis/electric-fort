import Breadcrumbs from '@/components/Breadcrumb/Breadcrumbs';
import Container from '@/components/Container/Container';
import React from 'react';
import OrderForm from '../../../components/Order/OrderForm';
import ShoppingCart from '@/components/ShoppingCart/ShoppingCart';
import OrderCart from '@/components/Order/OrderCart';

const OrderPage = () => {
  const breadcrumbsItens = [{ name: 'Оформлення замовлення', href: '/order' }];
  return (
    <div>
      <Container>
        <Breadcrumbs items={breadcrumbsItens} />
        <div className="flex w-full gap-16">
          <div className="w-1/2">
            <OrderForm />
          </div>
          <div className="w-1/2">
            <OrderCart />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default OrderPage;
