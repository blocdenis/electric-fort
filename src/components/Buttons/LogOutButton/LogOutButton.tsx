'use client';
import { useAuth } from '@/context/AuthContext';
import { logOutUser } from '@/services/api/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';

function LogOutButton() {
  const { setIsAuthenticated } = useAuth();
  const queryClient = useQueryClient();

  const logedOutUser = useMutation({
    mutationFn: logOutUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user'],
        exact: true,
        refetchType: 'active',
      });
      console.log('user loged out');
    },
  });
  const handleLogOut = () => {
    logedOutUser.mutateAsync(undefined);
    setIsAuthenticated(false);
  };

  return (
    <button
      type="button"
      onClick={handleLogOut}
      className=" bg-primary_green flex justify-center items-center text-black px-[65.5px] py-[7.5px]"
    >
      Вийти
    </button>
  );
}

export default LogOutButton;
