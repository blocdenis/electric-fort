'use client';
import { useShoppingCart } from '@/context/ShoppingCartContext';
import { NpCitySelect, NpWarehouseSelect, utils } from 'np-select';
import React, { useEffect, useState, useCallback } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import './OrderForm.scss';
import { useAuth } from '@/context/AuthContext';
import axios from 'axios';
import RadioFalse from '../icons/RadioFalse';
import RadioTrue from '../icons/RadioTrue';
import { useRouter } from 'next/navigation';
import AuthModal from '../AuthModal/AuthModal';
import Link from 'next/link';
import CityWarehouseSelect from './CityWarehouseSelect';
import { useQuery } from '@tanstack/react-query';
import { getUserInfo } from '@/services/api/api';

enum DeliveryMethods {
  PICKUP = 'Самовивіз',
  NOVA_POSHTA = 'Нова Пошта',
  POSTOMAT_NP = 'Поштомат',
  UKRPOSHTA = 'Укрпошта',
  COURIER_NP = "Кур'єр",
}

enum PaymentMethods {
  ONLINE = 'Онлайн-оплата, Google Pay або Apple Pay',
  CASHLESS = 'Безготівковий',
  CASH = 'Готівкою при отриманні',
  COD = 'Накладений платіж',
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
  const { data: user, isFetching } = useQuery({
    queryKey: ['user'],
    queryFn: () => getUserInfo(),
    enabled: isAuthenticated,
  });

  const router = useRouter();
  const { cartItems, clearCart } = useShoppingCart();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<IForm>({
    defaultValues: {
      firstName: user?.first_name ?? '',
      lastName: user?.last_name ?? '',
      email: user?.email ?? '',
      phone: user?.phone ?? '',
      dilivery: DeliveryMethods.PICKUP,
      payment: PaymentMethods.ONLINE,
    },
  });

  const [showCityInput, setShowCityInput] = useState(false);
  const [showStreetInput, setShowStreetInput] = useState(false);
  const [showHouseInput, setShowHouseInput] = useState(false);
  const [showApartmentInput, setShowApartmentInput] = useState(false);
  const [showDepartmentInput, setShowDepartmentInput] = useState(false);
  const [showTownInput, setShowTownInput] = useState(false);

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const openModal = () => {
    setIsAuthOpen(true);
  };

  const closeModal = () => {
    setIsAuthOpen(false);
  };

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

    if (response.status === 244) {
      const redirectUrl = response.data;
      console.log(response.data);
      if (redirectUrl) {
        window.location.href = redirectUrl;
      }
    }

    return response.data;
  };

  const onSubmit: SubmitHandler<IForm> = async (data) => {
    try {
      const transformedCartItems = cartItems?.map((item) => ({
        product_id: item.id,
        number: item.number || 1,
      }));

      const deliveryMethod = data.dilivery;
      const cityDilivery =
        deliveryMethod === DeliveryMethods.PICKUP ||
        deliveryMethod === DeliveryMethods.COURIER_NP
          ? ''
          : data.city_dilivery;
      const department =
        deliveryMethod === DeliveryMethods.PICKUP ||
        deliveryMethod === DeliveryMethods.COURIER_NP
          ? ''
          : data.department;

      const response = await createOrder({
        ...data,
        products: transformedCartItems,
        activity: 'Не вказувати',
        city_dilivery: cityDilivery,
        department,
      });

      console.log('Order created successfully:', response);
      reset();
      await clearCart();
      router.push('/success');
    } catch (error: any) {
      console.error('Error creating order:', error);
    }
  };

  const deliveryMethod = watch('dilivery');
  const firstName = watch('firstName');
  const lastName = watch('lastName');
  const house = watch('house');
  const apartment = watch('apartment');
  const paymentMethod = watch('payment');

  useEffect(() => {
    setShowCityInput(deliveryMethod !== DeliveryMethods.PICKUP);
  }, [deliveryMethod]);

  useEffect(() => {
    setValue('firstName', isAuthenticated ? user?.first_name ?? '' : '', {});
    setValue('lastName', isAuthenticated ? user?.last_name ?? '' : '', {});
    setValue('email', isAuthenticated ? user?.email ?? '' : '', {});
    setValue('phone', isAuthenticated ? user?.phone ?? '' : '', {});
  }, [
    setValue,
    isAuthenticated,
    user?.first_name,
    user?.last_name,
    user?.email,
    user?.phone,
  ]);

  useEffect(() => {
    setValue('pib', `${firstName || ''} ${lastName || ''}`.trim());
  }, [firstName, lastName, setValue]);

  useEffect(() => {
    switch (deliveryMethod) {
      case DeliveryMethods.COURIER_NP:
        setShowStreetInput(true);
        setShowHouseInput(true);
        setShowApartmentInput(true);
        setShowDepartmentInput(false);
        setShowTownInput(true);
        setShowCityInput(false);
        break;
      case DeliveryMethods.NOVA_POSHTA:
      case DeliveryMethods.POSTOMAT_NP:
        setShowStreetInput(false);
        setShowHouseInput(false);
        setShowApartmentInput(false);
        setShowTownInput(false);
        break;
      case DeliveryMethods.UKRPOSHTA:
        setShowTownInput(true);
        setShowStreetInput(false);
        setShowHouseInput(false);
        setShowApartmentInput(false);
        setShowDepartmentInput(true);
        setShowCityInput(false);
        break;
      default:
        setShowCityInput(false);
        setShowStreetInput(false);
        setShowHouseInput(false);
        setShowApartmentInput(false);
        setShowDepartmentInput(false);
        setShowTownInput(false);
    }
  }, [deliveryMethod]);

  const paymentMethods = {
    [DeliveryMethods.PICKUP]: [
      PaymentMethods.ONLINE,
      PaymentMethods.CASHLESS,
      PaymentMethods.CASH,
    ],
    [DeliveryMethods.NOVA_POSHTA]: [
      PaymentMethods.ONLINE,
      PaymentMethods.CASHLESS,
      PaymentMethods.COD,
    ],
    [DeliveryMethods.POSTOMAT_NP]: [
      PaymentMethods.ONLINE,
      PaymentMethods.CASHLESS,
      PaymentMethods.COD,
    ],
    [DeliveryMethods.UKRPOSHTA]: [
      PaymentMethods.ONLINE,
      PaymentMethods.CASHLESS,
      PaymentMethods.COD,
    ],
    [DeliveryMethods.COURIER_NP]: [
      PaymentMethods.ONLINE,
      PaymentMethods.CASHLESS,
      PaymentMethods.COD,
    ],
  };

  // useCallback to memoize the handlers
  const handleSelectCity = useCallback(
    (city: string | undefined) => {
      setValue('city_dilivery', city);
    },
    [setValue]
  );

  const handleSelectWarehouse = useCallback(
    (warehouse: string | undefined) => {
      setValue('department', warehouse);
    },
    [setValue]
  );

  return (
    <>
      <form className="order-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-section">
          <h2 className=" invisible h-0 laptop:visible laptop:h-full">
            Оформлення замовлення
          </h2>

          <div className="header">
            <h3>1. Особисті дані</h3>
            {!isAuthenticated && (
              <div className="btn-block">
                <span>Вже маєш акаунт ? </span>
                <button onClick={openModal} className="btn">
                  Увійти
                </button>
              </div>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="firstName">Ім&apos;я*</label>
            <input
              id="firstName"
              placeholder="Ім'я"
              {...register('firstName', {
                required: true,
              })}
            />
            {errors.firstName && <span>Обов&apos;язкове поле</span>}
          </div>

          <div className="form-field">
            <label htmlFor="lastName">Прізвище*</label>
            <input
              id="lastName"
              placeholder="Прізвище"
              {...register('lastName', { required: true })}
            />
            {errors.lastName && <span>Обов&apos;язкове поле</span>}
          </div>

          <div className="form-field">
            <label htmlFor="email">Електронна пошта*</label>
            <input
              placeholder="Введіть електронну пошту"
              id="email"
              type="email"
              {...register('email', { required: true })}
            />
            {errors.email && <span>Обов&apos;язкове поле</span>}
          </div>

          <div className="form-field">
            <label htmlFor="phone">Номер телефону*</label>
            <input
              id="phone"
              type="tel"
              placeholder="+380 (__)___-__-__"
              {...register('phone', { required: true })}
            />
            {errors.phone && <span>Обов&apos;язкове поле</span>}
          </div>
        </div>
        <div className="form-section">
          <h3>2. Доставка</h3>
          <div className="form-grid">
            {Object.values(DeliveryMethods).map((method, index) => (
              <div key={index} className="form-grid-item">
                <label className="flex flex-row gap-4 text-md">
                  <input
                    type="radio"
                    value={method}
                    {...register('dilivery', { required: true })}
                  />
                  {watch('dilivery') === method ? (
                    <RadioTrue />
                  ) : (
                    <RadioFalse />
                  )}
                  {method}
                </label>
              </div>
            ))}
            {errors.dilivery && <span>Обов&apos;язкове поле</span>}
          </div>
        </div>

        {showCityInput && (
          <CityWarehouseSelect
            onSelectCity={handleSelectCity}
            onSelectWarehouse={handleSelectWarehouse}
          />
        )}
        {showTownInput && (
          <div className="form-field">
            <label htmlFor="street">misto</label>
            <input
              id="city_dilivery"
              placeholder="misto"
              {...register('city_dilivery', { required: true })}
            />
            {errors.city_dilivery && <span>Обов&apos;язкове поле</span>}
          </div>
        )}
        {showDepartmentInput && (
          <div className="form-field">
            <label htmlFor="deartment">viddilenia</label>
            <input
              id="apartment"
              placeholder="Квартира"
              {...register('department', { required: true })}
            />
            {errors.department && <span>Обов&apos;язкове поле</span>}
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
            {errors.street && <span>Обов&apos;язкове поле</span>}
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
            {errors.house && <span>Обов&apos;язкове поле</span>}
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
            {errors.apartment && <span>Обов&apos;язкове поле</span>}
          </div>
        )}

        <div className="form-section">
          <h3>3. Оплата</h3>
          <div className="fortm-grid">
            {paymentMethods[deliveryMethod].map((method, index) => (
              <div key={index} className="form-grid-item">
                <label className="flex flex-row gap-4 text-md">
                  <input
                    type="radio"
                    value={method}
                    {...register('payment', { required: true })}
                  />
                  <div className="radio-icon">
                    {watch('payment') === method ? (
                      <RadioTrue />
                    ) : (
                      <RadioFalse />
                    )}
                  </div>

                  <span className="payment-method-text">{method}</span>
                </label>
              </div>
            ))}
            {errors.payment && <span>Обов&apos;язкове поле</span>}
          </div>
          {paymentMethod === PaymentMethods.COD && (
            <p className="cod-info">
              Важливо! Якщо оплачувати готівкою при отриманні - до суми
              замовлення буде додано 2% + 20 грн від суми замовлення
              (післяплата) згідно тарифів Нової Пошти
            </p>
          )}
        </div>

        <div className="form-section">
          <h4>Додати коментар до замовлення</h4>
          <div className="form-field">
            <textarea
              {...register('comment')}
              placeholder="Введіть ваш текст"
            />
          </div>
        </div>

        <div className="button-container">
          <button type="submit" className="submit-button">
            Підтвердити замовлення
          </button>
          <Link href="/oferta">
            <p>
              Підтверджуючи замовлення, ви приймаєте умови угоди користувача
            </p>
          </Link>
        </div>
      </form>
      {isAuthOpen && (
        <AuthModal isRegistrationForm={false} onClose={closeModal} />
      )}
    </>
  );
};

export default OrderForm;
