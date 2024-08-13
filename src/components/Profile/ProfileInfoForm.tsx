import React, { useState } from 'react';
import SecondaryButton from '../Buttons/SecondaryButton';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { UserActivities, getUserInfo, updateUser } from '@/services/api/api';

interface ProfileInfoFormProps {
  handleCancelClick: () => void;
}

type DeliveryAddress = {
  city: string;
  street: string;
  house: string;
  apartment: string;
};

interface ProfileInfoFormState {
  first_name?: string | null;
  last_name?: string | null;
  email?: string;
  phone?: string | null;
  activity?: UserActivities;
  delivery_address?: DeliveryAddress | null;
}

function ProfileInfoForm({ handleCancelClick }: ProfileInfoFormProps) {
  const { data: user, isFetching } = useQuery({
    queryKey: ['user'],
    queryFn: () => getUserInfo(),
    staleTime: 10 * 1000,
  });

  const queryClient = useQueryClient();

  const updateUserData = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user'],
        exact: true,
        refetchType: 'active',
      });
    },
  });

  const [address, setAddress] = useState<DeliveryAddress>({
    city: user?.delivery_address?.city ?? '',
    street: user?.delivery_address?.street ?? '',
    house: user?.delivery_address?.house ?? '',
    apartment: user?.delivery_address?.apartment ?? '',
  });

  const [formData, setFormData] = useState<ProfileInfoFormState>({
    first_name: user?.first_name,
    last_name: user?.last_name,
    email: user?.email,
    phone: user?.phone,
    activity: user?.activity,
    delivery_address: user?.delivery_address ? address : null,
  });

  const [updatedUserData, setUpdatedUserData] = useState<ProfileInfoFormState>(
    {}
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (
      name == 'city' ||
      name == 'street' ||
      name == 'house' ||
      name == 'apartment'
    ) {
      setAddress((prevAddress) => ({ ...prevAddress, [name]: value }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
      setUpdatedUserData((prevUserData) => ({
        ...prevUserData,
        [name]: value,
      }));
    }
  };
  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value, name } = e.currentTarget;

    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setUpdatedUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // console.log({ ...updatedUserData, delivery_address: address });
    updateUserData.mutateAsync({
      ...updatedUserData,
      delivery_address: address,
    });
    handleCancelClick();
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="laptop:h-10 mb-6 flex flex-col laptop:flex-row">
        <label htmlFor="last_name" className="text-mid mb-3 laptop:w-[228px]">
          Прізвище
        </label>
        <input
          className=" bg-backgroung border border-white h-[40px] px-3 py-[9px] w-[360px]"
          type="text"
          name="last_name"
          id="last_name"
          onChange={handleChange}
          value={formData.last_name ?? ''}
        />
      </div>
      <div className="laptop:h-10 mb-6 flex flex-col laptop:flex-row">
        <label htmlFor="first_name" className="text-mid mb-3 laptop:w-[228px]">
          Ім’я
        </label>
        <input
          className=" bg-backgroung border border-white h-[40px] px-3 py-[9px] w-[360px]"
          type="text"
          name="first_name"
          id="first_name"
          onChange={handleChange}
          value={formData.first_name ?? ''}
        />
      </div>
      <div className="laptop:h-10 mb-6 flex flex-col laptop:flex-row">
        <label htmlFor="phone" className="text-mid mb-3 laptop:w-[228px]">
          Номер телефону
        </label>
        <input
          className=" bg-backgroung border border-white h-[40px] px-3 py-[9px] w-[360px]"
          type="tel"
          name="phone"
          id="phone"
          onChange={handleChange}
          value={formData.phone ?? ''}
          // pattern="[\+]\d{3}[\(]\d{2}[\)]\d{3}[\-]\d{2}[\-]\d{2}"
          // placeholder="+38(000)123-45-67"
        />
      </div>
      <div className="laptop:h-10 mb-6 flex flex-col laptop:flex-row">
        <label htmlFor="email" className="text-mid mb-3 laptop:w-[228px]">
          Пошта*
        </label>
        <input
          className=" bg-backgroung border border-white h-[40px] px-3 py-[9px] w-[360px]"
          type="email"
          name="email"
          id="email"
          onChange={handleChange}
          value={formData.email}
        />
      </div>
      <div className="mb-6 laptop:flex">
        <p className="text-mid mb-3 laptop:w-[228px]">Адреса доставки</p>
        <div className="flex flex-col gap-2">
          <div className="flex laptop:justify-center items-center h-10">
            <label htmlFor="city" className="w-[105px]">
              Місто
            </label>
            <input
              className=" bg-backgroung border border-white h-[40px] px-3 py-[9px] w-[255px] laptop:h-full"
              type="text"
              name="city"
              id="city"
              onChange={handleChange}
              value={address.city}
            />
          </div>
          <div className="flex laptop:justify-center items-center h-[40px]">
            <label htmlFor="street" className=" w-[105px]">
              Вулиця
            </label>
            <input
              className=" bg-backgroung border border-white h-[40px] px-3 py-[9px] w-[255px] laptop:h-full"
              type="text"
              name="street"
              id="street"
              onChange={handleChange}
              value={address.street}
            />
          </div>
          <div className="flex laptop:justify-center items-center h-[40px]">
            <label htmlFor="house" className=" w-[105px]">
              Будинок
            </label>
            <input
              className=" bg-backgroung border border-white h-[40px] px-3 py-[9px] w-[255px] laptop:h-full"
              type="text"
              name="house"
              id="house"
              onChange={handleChange}
              value={address.house}
            />
          </div>
          <div className="flex laptop:justify-center items-center h-[40px]">
            <label htmlFor="apartment" className=" w-[105px]">
              Квартира
            </label>
            <input
              className=" bg-backgroung border border-white h-[40px] px-3 py-[9px] w-[255px] laptop:h-full"
              type="text"
              name="apartment"
              id="apartment"
              onChange={handleChange}
              value={address.apartment}
            />
          </div>
        </div>
      </div>
      <div className="laptop:h-10 mb-6 flex flex-col laptop:flex-row">
        <label htmlFor="activity" className="text-mid mb-3 laptop:w-[228px]">
          Вид діяльності
        </label>
        <select
          className=" bg-backgroung border border-white h-[40px] px-3 py-[9px] w-[360px]"
          name="activity"
          id="activity"
          onChange={handleOptionChange}
          value={formData.activity}
        >
          <option>Не вказувати</option>
          <option>Електрик</option>
          <option>Дизайнер</option>
          <option>Виконроб</option>
          <option>Будівельна організація</option>
        </select>
      </div>

      <div className="laptop:text-right laptop:mt-6 absolute bottom-[-120px] flex flex-col-reverse gap-4 w-full laptop:flex-row laptop:w-[390px] laptop:bottom-[-64px] laptop:right-0">
        <button
          onClick={handleCancelClick}
          className="laptop:px-5 laptop:w- bg-transparent h-[40px] py-[7px] w-full"
        >
          Відмінити
        </button>
        <SecondaryButton type="submit" className="laptop:px-5 w-full">
          Зберегти
        </SecondaryButton>
      </div>
    </form>
  );
}

export default ProfileInfoForm;
