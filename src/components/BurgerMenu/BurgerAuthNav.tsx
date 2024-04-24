interface BurgerAuthNavProps {
  onClick: () => void;
}

function BurgerAuthNav({ onClick }: BurgerAuthNavProps) {
  return (
    <button
      onClick={onClick}
      className=" bg-white justify-self-center w-full py-[8px] px-[145px] text-black"
    >
      Увійти
    </button>
  );
}

export default BurgerAuthNav;
