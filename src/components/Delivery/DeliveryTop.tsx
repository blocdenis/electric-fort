import Image from 'next/image';
import deliveryImg from '../../../public/delivery_img-min.png';
import CarIcon from '../icons/CarIcon';
import WalletIcon from '../icons/WalletIcon';

function DeliveryTop() {
  return (
    <div className="flex px-[64px] justify-between">
      <div className=" mr-[152.5px] my-[86.5px]">
        <div className=" flex items-center justify-center mb-8">
          <div className=" mr-8">
            <WalletIcon width={59} height={59} />
          </div>
          <p className=" text-[24px] font-bold">Оплата</p>
        </div>
        <ul>
          <li className="mb-4">Готівкою при отриманні</li>
          <li className="mb-4">Безготівковий</li>
          <li className="mb-4">Оплата на сайті</li>
          <li>Накладений платіж</li>
        </ul>
      </div>
      <div className="mr-[152.5px] my-[86.5px]">
        <div className=" flex items-center justify-center mb-8">
          <div className=" mr-8">
            <CarIcon width={82} height={59} />
          </div>
          <p className=" text-[24px] font-bold">Доставка</p>
        </div>
        <ul>
          <li className="mb-4">Нова Пошта</li>
          <li>Самовивіз</li>
        </ul>
      </div>
      <div className="w-[412px] h-[412px]">
        <Image
          src={deliveryImg}
          alt="delivery_image"
          width={412}
          height={412}
        />
      </div>
    </div>
  );
}

export default DeliveryTop;
