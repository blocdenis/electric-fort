import classNames from 'classnames';
import { CartIcon, HeartIcon, CrossIcon } from '../icons';
import BurgerMenuItem from './BurgerMenuItem';
import BurgerUserhNav from './BurgerUserNav';
import BurgerAuthNav from './BurgerAuthNav';

export interface BurgerMenuProps {
  onCloseClick: () => void;
  isOpen: boolean;
}

const burgerMenuItems = [
  {
    title: 'Кошик',
    icon: (
      <CartIcon width={37} hanging={37} className=" [&_path]:stroke-black" />
    ),
    value: 3,
  },
  {
    title: 'Список бажань',
    icon: (
      <HeartIcon
        width={30}
        hanging={26.75}
        className=" [&_path]:stroke-black"
      />
    ),
    value: 12,
  },
];

function BurgerMenu({ onCloseClick, isOpen }: BurgerMenuProps) {
  const isLogIn = false;
  return (
    <div
      className={classNames(
        'text-base font-normal absolute z-20 w-full top-0 left-0 transition-transform',
        isOpen ? 'translate-y-0' : 'translate-y-[-120%]'
      )}
    >
      <div className=" flex h-[72px] items-center justify-start px-[20px] bg-secondary_green">
        <CrossIcon onClick={onCloseClick} className="[&_rect]:fill-yellow" />
      </div>
      <div className="py-[24px] bg-primary_green">
        {isLogIn ? <BurgerUserhNav /> : <BurgerAuthNav />}
      </div>
      <div className=" px-4 pt-4 pb-8 bg-black">
        <ul className=" bg-black pb-6 mb-6 border-b border-b-gray-ligthMax ">
          {burgerMenuItems.map((item) => (
            <BurgerMenuItem
              key={item.title}
              title={item.title}
              value={item.value}
            >
              {item.icon}
            </BurgerMenuItem>
          ))}
        </ul>
        <div className="w-full mb-6">
          <p className="mb-2 ">Ми в соціальних мережах</p>
          {/* <Socials /> */}
        </div>
        {/* <Phone className="[&>p]:text-mdDesc" /> */}
      </div>
    </div>
  );
}

export default BurgerMenu;
