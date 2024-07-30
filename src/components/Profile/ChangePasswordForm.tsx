import React from 'react';
import SecondaryButton from '../Buttons/SecondaryButton';

function ChangePasswordForm() {
  return (
    <form className="flex">
      <p className="w-[228px]">Пароль*</p>
      <div className="flex flex-col gap-[18px]">
        <input
          className=" bg-backgroung border border-white w-[360px] h-10"
          type="password"
          name="current-password"
          id="current-password"
        />
        <input
          className=" bg-backgroung border border-white w-[360px] h-10"
          type="password"
          name="new-password"
          id="current-password"
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
