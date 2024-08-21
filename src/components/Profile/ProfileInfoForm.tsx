import React, { useState } from 'react';
import SecondaryButton from '../Buttons/SecondaryButton';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { UserActivities, getUserInfo, updateUser } from '@/services/api/api';
import { useForm } from 'react-hook-form';
import { getDirtyFields } from '@/lib/utils/getDirtystrings';
import { zodResolver } from '@hookform/resolvers/zod';
import { userInfoZodSchema } from '@/lib/schemas/validationZodSchemas';
import classNames from 'classnames';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ProfileInfoFormProps {
  handleCancelClick: () => void;
}

type DeliveryAddress = {
  city: string;
  street: string;
  house: string;
  apartment: string;
};

type FormFields = {
  first_name: string | null;
  last_name: string | null;
  email: string;
  phone: string | null;
  activity: UserActivities;
  delivery_address: DeliveryAddress | null;
};

function ProfileInfoForm({ handleCancelClick }: ProfileInfoFormProps) {
  const [error, setError] = useState<string>('');
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
    onError(error) {
      const err: {
        detail: [{ input: string; loc: string[]; msg: string; type: string }];
      } = JSON.parse(error.message);
      setError(err.detail[0].msg);
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

  function handleFormSubmit() {
    const changedFilds = getDirtyFields(dirtyFields, getValues());
    updateUserData
      .mutateAsync(changedFilds)
      .then(() => handleCancelClick())
      .catch((error: Error) => {
        const err: {
          detail: [{ input: string; loc: string[]; msg: string; type: string }];
        } = JSON.parse(error.message);
        const msg = err.detail[0].msg;
        // console.log(msg);
        toast.error(msg);
      });
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      {/* {error ? (
        <p className=" text-error_red text-sm text-center absolute top-0 right-0">
          {error}
        </p>
      ) : null} */}
      <div className="laptop:h-10 mb-6 flex flex-col laptop:flex-row">
        <label htmlFor="last_name" className="text-mid mb-3 laptop:w-[228px]">
          Прізвище
        </label>
        <div>
          <input
            className={classNames(
              {
                ' outline border border-error_red text-error_red':
                  errors.last_name,
              },
              ' bg-backgroung border border-white h-[40px] px-3 py-[9px] w-[360px]'
            )}
            type="text"
            id="last_name"
            {...register('last_name')}
          />
          <p className=" text-error_red text-sm">
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
            className={classNames(
              {
                ' outline border border-error_red text-error_red':
                  errors.first_name,
              },
              ' bg-backgroung border border-white h-[40px] px-3 py-[9px] w-[360px]'
            )}
            type="text"
            id="first_name"
            {...register('first_name')}
          />
          <p className=" text-error_red text-sm">
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
            className={classNames(
              {
                ' outline border border-error_red text-error_red': errors.phone,
              },
              ' bg-backgroung border border-white h-[40px] px-3 py-[9px] w-[360px]'
            )}
            type="tel"
            id="phone"
            placeholder="+380XXXXXXXXX"
            {...register('phone')}
          />
          <p className=" text-error_red text-sm">
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
            className={classNames(
              {
                ' outline border border-error_red text-error_red': errors.email,
              },
              ' bg-backgroung border border-white h-[40px] px-3 py-[9px] w-[360px]'
            )}
            type="email"
            id="email"
            {...register('email', { required: "Це поле обов'язвове" })}
          />
          <p className=" text-error_red text-sm">
            {errors.email && errors.email.message}
          </p>
        </div>
      </div>
      <div className="mb-6 laptop:flex">
        <p className="text-mid mb-3 laptop:w-[228px]">Адреса доставки</p>
        <div className="flex flex-col gap-2">
          <div className="flex laptop:justify-center items-center h-10">
            <label htmlFor="delivery_address.city" className="w-[105px]">
              Місто
            </label>
            <div>
              <input
                className={classNames(
                  {
                    ' outline border border-error_red text-error_red':
                      errors.delivery_address?.city,
                  },
                  ' bg-backgroung border border-white h-[40px] px-3 py-[9px] w-[255px] laptop:h-full'
                )}
                type="text"
                id="city"
                {...register('delivery_address.city')}
              />
              {/* <p className=" text-error_red text-sm">
              {errors.delivery_address?.city &&
                errors.delivery_address.city.message}
            </p> */}
            </div>
          </div>
          <div className="flex laptop:justify-center items-center h-[40px]">
            <label htmlFor="delivery_address.street" className=" w-[105px]">
              Вулиця
            </label>
            <div>
              <input
                className={classNames(
                  {
                    ' outline border border-error_red text-error_red':
                      errors.delivery_address?.street,
                  },
                  ' bg-backgroung border border-white h-[40px] px-3 py-[9px] w-[255px] laptop:h-full'
                )}
                type="text"
                id="street"
                {...register('delivery_address.street')}
              />
              {/* <p className=" text-error_red text-sm">
              {errors.delivery_address?.street &&
                errors.delivery_address.street.message}
            </p> */}
            </div>
          </div>
          <div className="flex laptop:justify-center items-center h-[40px]">
            <label htmlFor="delivery_address.house" className=" w-[105px]">
              Будинок
            </label>
            <div>
              <input
                className={classNames(
                  {
                    ' outline border border-error_red text-error_red':
                      errors.delivery_address?.house,
                  },
                  ' bg-backgroung border border-white h-[40px] px-3 py-[9px] w-[255px] laptop:h-full'
                )}
                type="text"
                id="house"
                {...register('delivery_address.house')}
              />
              {/* <p className=" text-error_red text-sm">
              {errors.delivery_address?.house &&
                errors.delivery_address.house.message}
            </p> */}
            </div>
          </div>
          <div className="flex laptop:justify-center items-center h-[40px]">
            <label htmlFor="apartment" className=" w-[105px]">
              Квартира
            </label>
            <div>
              <input
                className={classNames(
                  {
                    ' outline border border-error_red text-error_red':
                      errors.delivery_address?.apartment,
                  },
                  ' bg-backgroung border border-white h-[40px] px-3 py-[9px] w-[255px] laptop:h-full'
                )}
                type="text"
                id="apartment"
                {...register('delivery_address.apartment')}
              />
              {/* <p className=" text-error_red text-sm">
              {errors.delivery_address?.apartment &&
                errors.delivery_address.apartment.message}
            </p> */}
            </div>
          </div>
        </div>
      </div>
      <div className="laptop:h-10 mb-6 flex flex-col laptop:flex-row">
        <label htmlFor="activity" className="text-mid mb-3 laptop:w-[228px]">
          Вид діяльності
        </label>
        <select
          className={classNames(
            {
              ' outline border border-error_red text-error_red':
                errors.activity,
            },
            ' bg-backgroung border border-white h-[40px] px-3 py-[9px] w-[360px]'
          )}
          id="activity"
          {...register('activity')}
        >
          <option>Не вказувати</option>
          <option>Електрик</option>
          <option>Дизайнер</option>
          <option>Виконроб</option>
          <option>Будівельна організація</option>
        </select>
        <p className=" text-error_red text-sm">
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

export default ProfileInfoForm;
