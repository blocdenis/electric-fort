import React, { useState } from 'react';
import SecondaryButton from '../../../Buttons/SecondaryButton';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUser } from '@/services/api/api';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { changePasswordZodSchema } from '@/lib/schemas/validationZodSchemas';
import classNames from 'classnames';
import CloseEyeIcon from '../../../icons/CloseEyeIcon';
import EyeIcon from '../../../icons/EyeIcon';

interface ChangePasswordFormProps {
  handleCancelClick: () => void;
}
interface UpdatePasswordFormFilds {
  old_password: string;
  new_password: string;
  repeat_new_password: string;
}

function ChangePasswordForm({ handleCancelClick }: ChangePasswordFormProps) {
  const [isCurrentPasswordShown, setIsCurrentPasswordShown] = useState(false);
  const [isNewPasswordShown, setIsNewPasswordShown] = useState(false);
  const [isConfirmPasswordShown, setIsConfirmPasswordShown] = useState(false);
  const [error, setError] = useState<string>('');
  const queryClient = useQueryClient();

  const updateUserData = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user'],
        exact: true,
        refetchType: 'active',
      });
      setError('');
    },
    onError(error) {
      const res: { detail: string } = JSON.parse(error.message);
      console.log(JSON.parse(error.message));
      setError(res.detail);
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    getValues,
  } = useForm<UpdatePasswordFormFilds>({
    defaultValues: {
      old_password: '',
      new_password: '',
      repeat_new_password: '',
    },
    resolver: zodResolver(changePasswordZodSchema),
  });

  function toggleCurrentPasswordVisibility() {
    setIsCurrentPasswordShown((prevValue) => !prevValue);
  }
  function toggleNewPasswordVisibility() {
    setIsNewPasswordShown((prevValue) => !prevValue);
  }
  function toggleConfirmPasswordVisibility() {
    setIsConfirmPasswordShown((prevValue) => !prevValue);
  }

  function handleFormSubmit(data: UpdatePasswordFormFilds) {
    console.log({ password: data });
    updateUserData.mutateAsync({ password: data });
    handleCancelClick();
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="flex">
      <p className="w-[228px]">Пароль*</p>
      <div className="flex flex-col gap-[18px]">
        <div className=" relative">
          <input
            className={classNames(
              {
                ' outline border border-error_red text-error_red':
                  errors.old_password,
              },
              ' bg-backgroung border border-white w-[360px] h-10 px-3 py-[9px]'
            )}
            type={isCurrentPasswordShown ? 'text' : 'password'}
            id="old_password"
            placeholder="Поточний пароль"
            {...register('old_password')}
          />

          {isCurrentPasswordShown ? (
            <div
              onClick={toggleCurrentPasswordVisibility}
              className=" flex justify-center items-center absolute top-2 right-3 w-6 h-6"
            >
              <CloseEyeIcon className="w-[27px] h-[30px]" />
            </div>
          ) : (
            <div
              onClick={toggleCurrentPasswordVisibility}
              className="flex justify-center items-center absolute top-2 right-3 w-6 h-6"
            >
              <EyeIcon className="w-[24px] h-[24px]" />
            </div>
          )}
          {errors.old_password && (
            <p className=" text-error_red text-sm">
              {errors.old_password.message}
            </p>
          )}
        </div>
        <div className=" relative">
          <input
            className={classNames(
              {
                ' outline border border-error_red text-error_red':
                  errors.new_password,
              },
              ' bg-backgroung border border-white w-[360px] h-10 px-3 py-[9px]'
            )}
            type={isNewPasswordShown ? 'text' : 'password'}
            id="new_password"
            placeholder="Новий пароль"
            {...register('new_password')}
          />
          {isNewPasswordShown ? (
            <div
              onClick={toggleNewPasswordVisibility}
              className=" flex justify-center items-center absolute top-2 right-3 w-6 h-6"
            >
              <CloseEyeIcon className="w-[27px] h-[30px]" />
            </div>
          ) : (
            <div
              onClick={toggleNewPasswordVisibility}
              className="flex justify-center items-center absolute top-2 right-3 w-6 h-6"
            >
              <EyeIcon className="w-[24px] h-[24px]" />
            </div>
          )}
          {errors.new_password && (
            <p className=" text-error_red text-sm">
              {errors.new_password.message}
            </p>
          )}
        </div>
        <div className=" relative">
          <input
            className={classNames(
              {
                ' outline border border-error_red text-error_red':
                  errors.repeat_new_password,
              },
              ' bg-backgroung border border-white w-[360px] h-10 px-3 py-[9px]'
            )}
            type={isConfirmPasswordShown ? 'text' : 'password'}
            id="repeat_new_password"
            placeholder="Підтвердити пароль"
            {...register('repeat_new_password')}
          />
          {isConfirmPasswordShown ? (
            <div
              onClick={toggleConfirmPasswordVisibility}
              className=" flex justify-center items-center absolute top-2 right-3 w-6 h-6"
            >
              <CloseEyeIcon className="w-[27px] h-[30px]" />
            </div>
          ) : (
            <div
              onClick={toggleConfirmPasswordVisibility}
              className="flex justify-center items-center absolute top-2 right-3 w-6 h-6"
            >
              <EyeIcon className="w-[24px] h-[24px]" />
            </div>
          )}
          {errors.repeat_new_password && (
            <p className=" text-error_red text-sm ">
              {errors.repeat_new_password.message}
            </p>
          )}
        </div>
        {error ? (
          <p className="w-[360px]  text-error_red text-sm">{error}</p>
        ) : null}
        <SecondaryButton className="px-[15px] w-1/2 self-end" type="submit">
          Зберегти пароль
        </SecondaryButton>
      </div>
    </form>
  );
}

export default ChangePasswordForm;
