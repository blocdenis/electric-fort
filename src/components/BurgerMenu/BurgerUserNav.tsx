import { ProfileIcon } from '../icons';

function BurgerUserhNav() {
  return (
    <div className=" text-white px-4 flex items-center">
      <div className="w-[48px] h-[48px] flex justify-center items-center mr-3">
        <ProfileIcon width={34} height={34} />
      </div>

      <p>Phone number</p>
    </div>
  );
}

export default BurgerUserhNav;
