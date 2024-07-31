'use client';
import { logOutUser } from '@/services/api/api';
import React from 'react';

function LogOutButton() {
  const handleLogOut = async () => {
    try {
      logOutUser().then(() => alert('User logout'));
    } catch (error) {
      alert(error);
    }
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
