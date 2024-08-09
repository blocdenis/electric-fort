import Image from 'next/image';
import React from 'react';
import Success from '../icons/Success';

function AfterReviewSendInfo() {
  return (
    <div className="flex flex-col items-center gap-[31px]">
      <div className="w-[143px] h-[152px]">
        <Success />
      </div>
      <h2 className=" text-lg font-bold">Дякуємо!</h2>
      <p className=" text-mid font-normal">
        Ваш відгук буде опубліковано після модерації.
      </p>
    </div>
  );
}

export default AfterReviewSendInfo;
