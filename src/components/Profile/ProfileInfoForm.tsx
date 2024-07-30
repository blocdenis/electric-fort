import React from 'react';
import SecondaryButton from '../Buttons/SecondaryButton';

interface ProfileInfoFormProps {
  handleCancelClick: () => void;
}

function ProfileInfoForm({ handleCancelClick }: ProfileInfoFormProps) {
  return (
    <form>
      <div className="h-10 mb-6 flex">
        <label htmlFor="last-name" className="w-[228px]">
          Прізвище
        </label>
        <input
          className=" bg-backgroung border border-white w-[360px]"
          type="text"
          name="last-name"
          id="last-name"
        />
      </div>
      <div className="h-10 mb-6 flex">
        <label htmlFor="name" className="w-[228px]">
          Ім’я
        </label>
        <input
          className=" bg-backgroung border border-white w-[360px]"
          type="text"
          name="name"
          id="name"
        />
      </div>
      <div className="h-10 mb-6 flex">
        <label htmlFor="phone" className="w-[228px]">
          Номер телефону
        </label>
        <input
          className=" bg-backgroung border border-white w-[360px]"
          type="phone"
          name="phone"
          id="phone"
        />
      </div>
      <div className="h-10 mb-6 flex">
        <label htmlFor="email" className="w-[228px]">
          Пошта*
        </label>
        <input
          className=" bg-backgroung border border-white w-[360px]"
          type="email"
          name="email"
          id="email"
        />
      </div>
      <div className="mb-6 flex">
        <p className="w-[228px]">Адреса доставки</p>
        <div className="flex flex-col gap-2">
          <div className="flex justify-center items-center h-10">
            <label htmlFor="city" className="w-[105px]">
              Місто
            </label>
            <input
              className=" bg-backgroung border border-white w-[255px] h-full"
              type="text"
              name="city"
              id="city"
            />
          </div>
          <div className="flex justify-center items-center h-[40px]">
            <label htmlFor="street" className=" w-[105px]">
              Вулиця
            </label>
            <input
              className=" bg-backgroung border border-white w-[255px] h-full"
              type="text"
              name="street"
              id="street"
            />
          </div>
          <div className="flex justify-center items-center h-[40px]">
            <label htmlFor="house" className=" w-[105px]">
              Будинок
            </label>
            <input
              className=" bg-backgroung border border-white w-[255px] h-full"
              type="text"
              name="house"
              id="house"
            />
          </div>
          <div className="flex justify-center items-center h-[40px]">
            <label htmlFor="apartment" className=" w-[105px]">
              Квартира
            </label>
            <input
              className=" bg-backgroung border border-white w-[255px] h-full"
              type="text"
              name="apartment"
              id="apartment"
            />
          </div>
        </div>
      </div>
      <div className="h-10 mb-6 flex">
        <label htmlFor="activity" className="w-[228px]">
          Вид діяльності
        </label>
        <select
          className=" bg-backgroung border border-white w-[360px]"
          name="activity"
          id="activity"
        >
          <option>Не вказувати</option>
          <option>Електрик</option>
          <option>Дизайнер</option>
          <option>Виконроб</option>
          <option>Будівельна організація</option>
        </select>
      </div>

      <div className="text-right mt-6 absolute bottom-[-64px] right-0">
        <button
          onClick={handleCancelClick}
          className="px-5 ml-[70px] bg-transparent"
        >
          Відмінити
        </button>
        <SecondaryButton type="submit" className="px-5 ml-[70px]">
          Зберегти
        </SecondaryButton>
      </div>
    </form>
  );
}

export default ProfileInfoForm;
