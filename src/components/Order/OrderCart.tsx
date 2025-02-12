'use client';
import { useShoppingCart } from '@/context/ShoppingCartContext';
import React, { useState } from 'react';
import './OrderForm.scss';
import { useProducts } from '@/hooks/useProducts';
import { CartItem } from '../ShoppingCart/CartItem';
import { applyDiscount } from '@/services/applyDiscount';
import { formatPriceUAH } from '@/services/formatCurrency';
import { OrderItem } from './OrderItem';
import { useAuth } from '@/context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { getUserInfo } from '@/services/api/api';
import Loading from '../Loading/Loading';
import { ArrowCatalogIcon } from '../icons';
import styles from '@/components/Filters/Filters.module.scss';

const OrderCart = () => {
  const { data: user, isLoading: isLoadingUser } = useQuery({
    queryKey: ['user'],
    queryFn: () => getUserInfo(),
    staleTime: 10 * 1000,
  });
  const { cartItems, isPending, closeCart } = useShoppingCart();
  const { products } = useProducts();
  const { isAuthenticated } = useAuth();

  const [isOrderOpen, setIsOrderOpen] = useState(true);

  const calculateTotal = () => {
    const total = cartItems?.reduce((total, cartItem) => {
      const item = products.find((i) => i.id === cartItem.id);
      const itemPrice = item?.price || 0;
      const itemQuantity = cartItem.number || 0;

      return total + itemPrice * itemQuantity;
    }, 0);

    return total !== undefined ? total.toFixed(2) : '0.00';
  };
  const totalAmount = parseFloat(calculateTotal());
  const discount = isAuthenticated && user ? user?.discount : 0;
  return (
    <div className="cart-modal-content-order">
      {isLoadingUser || isPending ? (
        <Loading />
      ) : (
        <>
          <div className="flex flex-row justify-between w-full laptop:hidden ">
            <h2 className="cart-hero">Ваше замовлення</h2>
            <span
              className={styles.arrowIcon}
              onClick={() => setIsOrderOpen(!isOrderOpen)}
            >
              {isOrderOpen ? (
                <ArrowCatalogIcon rotation={270} />
              ) : (
                <ArrowCatalogIcon rotation={90} />
              )}
            </span>
          </div>
          {isOrderOpen && (
            <>
              {cartItems?.map((item) => (
                <OrderItem key={item.id} {...item} close={closeCart} />
              ))}
              <div className="checkout-container">
                <div className="checkout-info">
                  <p>Сума</p> <span>{calculateTotal()}</span>
                </div>
                <div className="checkout-info">
                  <p>Знижка</p> <span>{discount} %</span>
                </div>
                <div className="checkout-info">
                  <p>До сплати</p>{' '}
                  <span>
                    {formatPriceUAH(applyDiscount(totalAmount, discount))}
                  </span>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default OrderCart;
