import React, { useState } from 'react';
import SecondaryButton from '../Buttons/SecondaryButton';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUser } from '@/services/api/api';

interface UpdatePassword {
  old_password: string;
  new_password: string;
  repeat_new_password: string;
}

function ChangePasswordForm() {
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

  const [formData, setFormData] = useState<UpdatePassword>({
    old_password: '',
    new_password: '',
    repeat_new_password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log({ password: formData });
    updateUserData.mutateAsync({ password: formData });
  }

  return (
    <form onSubmit={handleFormSubmit} className="flex">
      <p className="w-[228px]">Пароль*</p>
      <div className="flex flex-col gap-[18px]">
        <input
          className=" bg-backgroung border border-white w-[360px] h-10"
          type="password"
          name="old_password"
          id="old_password"
          placeholder="Поточний пароль"
          onChange={handleChange}
          value={formData.old_password}
        />
        <input
          className=" bg-backgroung border border-white w-[360px] h-10"
          type="password"
          name="new_password"
          id="new_password"
          placeholder="Новий пароль"
          onChange={handleChange}
          value={formData.new_password}
        />
        <input
          className=" bg-backgroung border border-white w-[360px] h-10"
          type="password"
          name="repeat_new_password"
          id="repeat_new_password"
          placeholder="Підтвердити пароль"
          onChange={handleChange}
          value={formData.repeat_new_password}
        />
        <SecondaryButton
          // onClick={}
          className="px-[15px] w-1/2 self-end"
          type="submit"
        >
          Зберегти пароль
        </SecondaryButton>
      </div>
    </form>
  );
}

export default ChangePasswordForm;
