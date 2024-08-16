import React, { useState } from 'react';
import SecondaryButton from '../Buttons/SecondaryButton';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { UserActivities, getUserInfo, updateUser } from '@/services/api/api';
import { useForm } from 'react-hook-form';
import { getDirtyFields } from '@/lib/utils/getDirtystrings';
import { zodResolver } from '@hookform/resolvers/zod';
import { userInfoZodSchema } from '@/lib/schemas/validationZodSchemas';

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
  phone?: string | null;
  email?: string;
  delivery_address?: DeliveryAddress | null;
  activity?: UserActivities;
}

type FormFields = {
  first_name: string | null;
  last_name: string | null;
  email: string;
  phone: string | null;
  activity: UserActivities;
  delivery_address: DeliveryAddress | null;
};

function ProfileInfoFormCopy({ handleCancelClick }: ProfileInfoFormProps) {
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

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, dirtyFields },
    getValues,
  } = useForm<FormFields>({
    defaultValues: {
      first_name: user?.first_name,
      last_name: user?.last_name,
      email: user?.email,
      phone: user?.phone,
      activity: user?.activity,
      delivery_address: user?.delivery_address,
    },
    resolver: zodResolver(userInfoZodSchema),
  });

  // function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
  //   event.preventDefault();
  //   // console.log({ ...updatedUserData, delivery_address: address });
  //   updateUserData.mutateAsync({
  //     ...updatedUserData,
  //     delivery_address: address,
  //   });
  //   handleCancelClick();
  // }

  function handleFormSubmit() {
    console.log(getDirtyFields(dirtyFields, getValues()));
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="laptop:h-10 mb-6 flex flex-col laptop:flex-row">
        <label htmlFor="last_name" className="text-mid mb-3 laptop:w-[228px]">
          Прізвище
        </label>
        <div>
          <input
            className=" bg-backgroung border border-white h-[40px] px-3 py-[9px] w-[360px]"
            type="text"
            id="last_name"
            {...register('last_name')}
          />
          <p className=" text-yellow text-sm">
            {errors.last_name && errors.last_name.message}
          </p>
        </div>
      </div>
      <div className="laptop:h-10 mb-6 flex flex-col laptop:flex-row">
        <label htmlFor="first_name" className="text-mid mb-3 laptop:w-[228px]">
          Ім’я
        </label>
        <div>
          <input
            className=" bg-backgroung border border-white h-[40px] px-3 py-[9px] w-[360px]"
            type="text"
            id="first_name"
            {...register('first_name')}
          />
          <p className=" text-yellow text-sm">
            {errors.first_name && errors.first_name.message}
          </p>
        </div>
      </div>
      <div className="laptop:h-10 mb-6 flex flex-col laptop:flex-row">
        <label htmlFor="phone" className="text-mid mb-3 laptop:w-[228px]">
          Номер телефону
        </label>
        <div>
          <input
            className=" bg-backgroung border border-white h-[40px] px-3 py-[9px] w-[360px]"
            type="tel"
            id="phone"
            {...register('phone')}
          />
          <p className=" text-yellow text-sm">
            {errors.phone && errors.phone.message}
          </p>
        </div>
      </div>
      <div className="laptop:h-10 mb-6 flex flex-col laptop:flex-row">
        <label htmlFor="email" className="text-mid mb-3 laptop:w-[228px]">
          Пошта*
        </label>
        <div>
          <input
            className=" bg-backgroung border border-white h-[40px] px-3 py-[9px] w-[360px]"
            type="email"
            id="email"
            {...register('email', { required: "Це поле обов'язвове" })}
          />
          <p className=" text-yellow text-sm">
            {errors.email && errors.email.message}
          </p>
        </div>
      </div>
      <div className="mb-6 laptop:flex">
        <p className="text-mid mb-3 laptop:w-[228px]">Адреса доставки</p>
        <div className="flex flex-col gap-2">
          <div className="flex laptop:justify-center items-center h-10">
            <label htmlFor="city" className="w-[105px]">
              Місто
            </label>
            <div>
              <input
                className=" bg-backgroung border border-white h-[40px] px-3 py-[9px] w-[255px] laptop:h-full"
                type="text"
                id="city"
                {...register('delivery_address.city')}
              />
              <p className=" text-yellow text-sm">
                {errors.delivery_address?.city &&
                  errors.delivery_address.city.message}
              </p>
            </div>
          </div>
          <div className="flex laptop:justify-center items-center h-[40px]">
            <label htmlFor="street" className=" w-[105px]">
              Вулиця
            </label>
            <div>
              <input
                className=" bg-backgroung border border-white h-[40px] px-3 py-[9px] w-[255px] laptop:h-full"
                type="text"
                id="street"
                {...register('delivery_address.street')}
              />
              <p className=" text-yellow text-sm">
                {errors.delivery_address?.street &&
                  errors.delivery_address.street.message}
              </p>
            </div>
          </div>
          <div className="flex laptop:justify-center items-center h-[40px]">
            <label htmlFor="house" className=" w-[105px]">
              Будинок
            </label>
            <div>
              <input
                className=" bg-backgroung border border-white h-[40px] px-3 py-[9px] w-[255px] laptop:h-full"
                type="text"
                id="house"
                {...register('delivery_address.house')}
              />
              <p className=" text-yellow text-sm">
                {errors.delivery_address?.house &&
                  errors.delivery_address.house.message}
              </p>
            </div>
          </div>
          <div className="flex laptop:justify-center items-center h-[40px]">
            <label htmlFor="apartment" className=" w-[105px]">
              Квартира
            </label>
            <div>
              <input
                className=" bg-backgroung border border-white h-[40px] px-3 py-[9px] w-[255px] laptop:h-full"
                type="text"
                id="apartment"
                {...register('delivery_address.apartment')}
              />
              <p className=" text-yellow text-sm">
                {errors.delivery_address?.apartment &&
                  errors.delivery_address.apartment.message}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="laptop:h-10 mb-6 flex flex-col laptop:flex-row">
        <label htmlFor="activity" className="text-mid mb-3 laptop:w-[228px]">
          Вид діяльності
        </label>
        <select
          className=" bg-backgroung border border-white h-[40px] px-3 py-[9px] w-[360px]"
          id="activity"
          {...register('activity')}
        >
          <option>Не вказувати</option>
          <option>Електрик</option>
          <option>Дизайнер</option>
          <option>Виконроб</option>
          <option>Будівельна організація</option>
        </select>
        <p className=" text-yellow text-sm">
          {errors.activity && errors.activity.message}
        </p>
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

export default ProfileInfoFormCopy;
