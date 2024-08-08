import Image from 'next/image';
import React from 'react';
import Success from '../icons/Success';

function AfterReviewSendInfo() {
  return (
    <div>
      <div>
        <Success />
      </div>
      <h2>Дякуємо!</h2>
      <p>Ваш відгук буде опубліковано після модерації. </p>
    </div>
  );
}

export default AfterReviewSendInfo;
