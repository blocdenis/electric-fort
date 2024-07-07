'use client';
import { useShoppingCart } from '@/context/ShoppingCartContext';
import { createOrder, isAuth } from '@/services/api/api';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import './OrderForm.scss';
import { useAuth } from '@/context/AuthContext';
import axios from 'axios';

enum DeliveryMethods {
  PICKUP = 'Самовивіз',
  NOVA_POSHTA = 'Нова Пошта',
  POSTOMAT_NP = 'Поштомат НП',
  UKRPOSHTA = 'Укрпошта',
  COURIER_NP = 'Кур`єр НП',
}

enum PaymentMethods {
  ONLINE = 'Онлайн-оплата карткою, Google Pay або Apple Pay',
  CASHLESS = 'Безготівковий',
  CASH = 'Готівкою при отриманні',
  COD = 'Накладенний платіж',
}

interface IForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dilivery: DeliveryMethods;
  payment: PaymentMethods;
  comment: string;
  city_dilivery?: string;
  pib: string;
  department?: string;
  apartment?: string;
  house?: string;
  street?: string;
}

const OrderForm = () => {
  const { isAuthenticated } = useAuth();
  console.log(isAuthenticated);
  const { cartItems } = useShoppingCart();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<IForm>({
    defaultValues: {
      dilivery: DeliveryMethods.PICKUP,
      payment: PaymentMethods.ONLINE,
    },
  });

  const [showCityInput, setShowCityInput] = useState(false);
  const [showStreetInput, setShowStreetInput] = useState(false);
  const [showHouseInput, setShowHouseInput] = useState(false);
  const [showApartmentInput, setShowApartmentInput] = useState(false);
  const [showDepartmentInput, setShowDepartmentInput] = useState(false);

  const createOrder = async (data: {
    products: { product_id: number; number: number }[] | undefined;
    activity: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dilivery: DeliveryMethods;
    payment: PaymentMethods;
    comment: string;
    city_dilivery?: string | undefined;
    pib: string;
    department?: string | undefined;
    apartment?: string | undefined;
    house?: string | undefined;
    street?: string | undefined;
  }) => {
    const response = await axios.post(
      `https://electrychnafortecia.com/api/order/register`,
      data,
      {
        withCredentials: true,
      }
    );
    return response.data;
  };
  const onSubmit: SubmitHandler<IForm> = async (data) => {
    try {
      const transformedCartItems = cartItems?.map((item) => ({
        product_id: item.id,
        number: item.number || 1,
      }));

      const response = await createOrder({
        ...data,
        products: transformedCartItems,
        activity: 'Не вказувати',
      });

      console.log('Order created successfully:', response);
    } catch (error: any) {
      console.error('Error creating order:', error);
    }
  };

  const deliveryMethod = watch('dilivery');
  const firstName = watch('firstName');
  const lastName = watch('lastName');
  const house = watch('house');
  const apartment = watch('apartment');

  useEffect(() => {
    setShowCityInput(deliveryMethod !== DeliveryMethods.PICKUP);
  }, [deliveryMethod]);

  useEffect(() => {
    setValue('pib', `${firstName || ''} ${lastName || ''}`.trim());
  }, [firstName, lastName, setValue]);
  useEffect(() => {
    switch (deliveryMethod) {
      case DeliveryMethods.COURIER_NP:
        setShowStreetInput(true);
        setShowHouseInput(true);
        setShowApartmentInput(true);
        break;
      case DeliveryMethods.NOVA_POSHTA:
      case DeliveryMethods.UKRPOSHTA:
      case DeliveryMethods.POSTOMAT_NP:
        setShowDepartmentInput(true);
        break;
      default:
        setShowCityInput(false);
        setShowStreetInput(false);
        setShowHouseInput(false);
        setShowApartmentInput(false);
        setShowDepartmentInput(false);
    }
  }, [deliveryMethod]);
  return (
    <form className="order-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-section">
        <h2>Оформлення замовлення</h2>

        <div className="header">
          <h3>1. Особисті дані</h3>
          {isAuthenticated && (
            <div>
              <span>Вже маєш акаунт ? </span>
              <button>Увійти</button>
            </div>
          )}
        </div>
        <div className="form-field">
          <label htmlFor="firstName">Ім'я*</label>
          <input
            id="firstName"
            placeholder="Ім'я"
            {...register('firstName', { required: true })}
          />
          {errors.firstName && <span>Обов'язкове поле</span>}
        </div>
        <div className="form-field">
          <label htmlFor="lastName">Прізвище*</label>
          <input
            id="lastName"
            placeholder="Прізвище"
            {...register('lastName', { required: true })}
          />
          {errors.lastName && <span>Обов'язкове поле</span>}
        </div>
        <div className="form-field">
          <label htmlFor="email">Електронна пошта*</label>
          <input
            placeholder="Введіть електронну пошту"
            id="email"
            type="email"
            {...register('email', { required: true })}
          />
          {errors.email && <span>Обов'язкове поле</span>}
        </div>
        <div className="form-field">
          <label htmlFor="phone">Номер телефону*</label>
          <input
            id="phone"
            type="tel"
            placeholder="+380 (__)___-__-__"
            {...register('phone', { required: true })}
          />
          {errors.phone && <span>Обов'язкове поле</span>}
        </div>
      </div>

      <div className="form-section">
        <h3>2. Доставка</h3>
        <div className="form-radio-group">
          {Object.values(DeliveryMethods).map((method, index) => (
            <label key={index}>
              <input
                type="radio"
                value={method}
                {...register('dilivery', { required: true })}
              />
              {method}
            </label>
          ))}
          {errors.dilivery && <span>Обов'язкове поле</span>}
        </div>
      </div>
      {showCityInput && (
        <div className="form-field">
          <label htmlFor="city">Місто*</label>
          <input
            id="city"
            placeholder="Місто"
            {...register('city_dilivery', { required: true })}
          />
          {errors.city_dilivery && <span>Обов'язкове поле</span>}
        </div>
      )}
      {showHouseInput && (
        <div className="form-field">
          <label htmlFor="house">Будинок*</label>
          <input
            id="house"
            placeholder="Будинок"
            {...register('house', { required: true })}
          />
          {errors.house && <span>Обов'язкове поле</span>}
        </div>
      )}
      {showStreetInput && (
        <div className="form-field">
          <label htmlFor="street">Вулиця*</label>
          <input
            id="street"
            placeholder="Вулиця"
            {...register('street', { required: true })}
          />
          {errors.street && <span>Обов'язкове поле</span>}
        </div>
      )}
      {showApartmentInput && (
        <div className="form-field">
          <label htmlFor="apartment">Квартира*</label>
          <input
            id="apartment"
            placeholder="Квартира"
            {...register('apartment', { required: true })}
          />
          {errors.apartment && <span>Обов'язкове поле</span>}
        </div>
      )}

      {showDepartmentInput && (
        <div className="form-field">
          <label htmlFor="department">Відділення*</label>
          <input
            id="department"
            placeholder="Відділення"
            {...register('department', { required: true })}
          />
          {errors.department && <span>Обов'язкове поле</span>}
        </div>
      )}

      <div className="form-section">
        <h3>3. Оплата</h3>
        <div className="form-radio-group">
          {Object.values(PaymentMethods).map((method, index) => (
            <label key={index}>
              <input
                type="radio"
                value={method}
                {...register('payment', { required: true })}
              />
              {method}
            </label>
          ))}
          {errors.payment && <span>Обов'язкове поле</span>}
        </div>
      </div>

      <div className="form-section">
        <h4>Додати коментар до замовлення</h4>
        <div className="form-field">
          <textarea {...register('comment')} placeholder="Введіть ваш текст" />
        </div>
      </div>
      <div className="button-container">
        <button type="submit" className="submit-button">
          Підтвердити замовлення
        </button>
      </div>
    </form>
  );
};

export default OrderForm;
