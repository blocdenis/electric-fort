import { ProfileIcon } from '../icons';

function BurgerUserhNav() {
  return (
    <div className=" text-black px-4 flex items-center">
      <div className="w-[48px] h-[48px] flex justify-center items-center mr-3">
        <ProfileIcon width={34} height={34} className="[&_*]:stroke-black" />
      </div>

      <p>+38(111) 11-11-11</p>
    </div>
  );
}

export default BurgerUserhNav;
