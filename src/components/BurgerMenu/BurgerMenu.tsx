import classNames from 'classnames';
import {
  CartIcon,
  HeartIcon,
  CrossIcon,
  TikTokIcon,
  InstagramIcon,
} from '../icons';
import BurgerMenuItem from './BurgerMenuItem';
import BurgerUserhNav from './BurgerUserNav';
import BurgerAuthNav from './BurgerAuthNav';
import { navigationItems } from '../Navigation/Navigation';
import NavigationItem from '../Navigation/NavigationItem';
import styles from '../Navigation/Navigation.module.scss';
import stylesHeader from '../Header/Header.module.scss';
import ContactText from '../Contact/ContactText/ContactText';

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
    href: '/profile/favorites',
  },
];

function BurgerMenu({ onCloseClick, isOpen }: BurgerMenuProps) {
  const isLogIn = false;
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={classNames(
        'lg:hidden text-base font-normal absolute z-20 w-full top-0 left-0 transition-transform duration-1000',
        isOpen ? 'translate-y-0' : 'translate-y-[-150%]'
      )}
    >
      <div className=" flex h-[72px] items-center justify-start px-[20px] bg-secondary_green">
        <CrossIcon onClick={onCloseClick} className="[&_rect]:fill-yellow" />
      </div>
      <div className="py-[11px] bg-primary_green grid justify-items-start">
        {isLogIn ? <BurgerUserhNav /> : <BurgerAuthNav />}
      </div>
      <div className=" px-4 pt-4 pb-8 h-auto bg-black">
        <ul className=" bg-black text-white pb-6 mb-6 border-b border-b-gray-ligthMax ">
          {burgerMenuItems.map((item) => (
            <BurgerMenuItem
              onClick={onCloseClick}
              key={item.title}
              title={item.title}
              value={item.value}
              href={item?.href}
            >
              {item.icon}
            </BurgerMenuItem>
          ))}
        </ul>
        <ul className={styles.menu_list}>
          {navigationItems.map((item) => {
            if (item.href !== '#') {
              return (
                <NavigationItem
                  onClick={onCloseClick}
                  key={item.id}
                  title={item.title}
                  href={item.href}
                  accent={item.href == '/cooperation'}
                />
              );
            }
          })}
        </ul>
        <div className="w-full mb-6">
          <p className="mb-2 ">Ми в соціальних мережах</p>
          <div className={stylesHeader.container_icons}>
            <TikTokIcon href="https://www.tiktok.com/" color="#69AF00" />
            <InstagramIcon href="https://www.instagram.com" color="#69AF00" />
          </div>
        </div>
        <div className="flex flex-col gap-4 text-white">
          <ContactText color="#69AF00" />
          <ContactText color="#69AF00" />
        </div>
        <div className="flex items-center justify-center">
          <div className=" flex gap-3">
            <button className=" hover:text-yellow">
              <span>UA</span>
            </button>
            <span className="">|</span>
            <button className=" hover:text-yellow">
              <span>RU</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BurgerMenu;
