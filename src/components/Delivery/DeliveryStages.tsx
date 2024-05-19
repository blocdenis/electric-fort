import React from 'react';
import PassIcon from '../icons/PassIcon';
import CartIconDelivery from '../icons/CartIconDelivery';
import TruckIcon from '../icons/TruckIcon';
import CashIcon from '../icons/CashIcon';
import GeoIcon from '../icons/GeoIcon';

function DeliveryStages() {
  return (
    <div className=" px-9 flex gap-[135px] ">
      <div className="flex flex-col items-center justify-center gap-3">
        <div>
          <CartIconDelivery width={46} height={46} />
        </div>
        <p className=" text-center">Обрати товар</p>
      </div>
      <div className="flex flex-col items-center justify-center gap-3">
        <div>
          <PassIcon width={46} height={46} />
        </div>
        <p className=" text-center">Вказати дані для відправки</p>
      </div>
      <div className="flex flex-col items-center justify-center gap-3">
        <div>
          <TruckIcon />
        </div>
        <p className=" text-center">Обрати спосіб доставки</p>
      </div>
      <div className="flex flex-col items-center justify-center gap-3">
        <div>
          <CashIcon />
        </div>
        <p className=" text-center">Обрати спосіб оплати</p>
      </div>
      <div className="flex flex-col items-center justify-center gap-3">
        <div>
          <GeoIcon />
        </div>
        <p className=" text-center">Отримати замовлення</p>
      </div>
    </div>
  );
}

export default DeliveryStages;
