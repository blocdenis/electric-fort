'use client';
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
// import { navigationItems } from '../Navigation/Navigation';
import NavigationItem from '../Navigation/NavigationItem';
import styles from '../Navigation/Navigation.module.scss';
import ContactText from '../Contact/ContactText/ContactText';
import { useState } from 'react';
import { useShoppingCart } from '@/context/ShoppingCartContext';
import { useFavorites } from '@/context/FavoritesContext';
import { useAuth } from '@/context/AuthContext';

export interface BurgerMenuProps {
  onCloseClick: () => void;
  isOpen: boolean;
}

function BurgerMenu({ onCloseClick, isOpen }: BurgerMenuProps) {
  const { cartQuantity, openCart } = useShoppingCart();
  const { favoritesQuantity, openCloseFavorites, openCloseAuth } =
    useFavorites();
  const { isAuthenticated } = useAuth();
  const burgerMenuItems = [
    {
      title: 'Кошик',
      icon: (
        <CartIcon width={37} hanging={37} className=" [&_path]:stroke-black" />
      ),
      value: cartQuantity,
      onClick: () => {
        onCloseClick();
        openCart();
      },
      href: '/',
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
      value: favoritesQuantity,
      onClick: () => {
        onCloseClick();
        openCloseFavorites();
      },
      href: '/',
    },
  ];

  const navigationItems = [
    { id: '1', title: 'Про нас', href: '/about_us' },
    { id: '2', title: 'Доставка і оплата', href: '/delivery' },
    { id: '3', title: 'Повернення та обмін', href: '/return_policy' },
    { id: '4', title: 'Контакти', href: '#contacts' },
    {
      id: '5',
      title: 'Торгові марки',
      href: '/cooperation_tm',
    },
    {
      id: '6',
      title: 'Офіційне дилерство',
      href: '/cooperation_od',
    },
  ];

  const [isLogIn, setIsLogIn] = useState(false);
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
      <div className="py-[26px] px-4 bg-primary_green">
        {isAuthenticated ? (
          <BurgerUserhNav onClick={() => setIsLogIn((prevVal) => !prevVal)} />
        ) : (
          <BurgerAuthNav
            onClick={() => {
              openCloseAuth();
            }}
          />
        )}
      </div>
      <div className=" px-4 pt-4 pb-8 h-auto bg-black">
        <ul className=" bg-black text-white pb-6 mb-6 border-b border-b-gray-ligthMax ">
          {burgerMenuItems.map((item) => (
            <BurgerMenuItem
              onClick={item.onClick}
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
                  // accent={item.href == '/cooperation'}
                />
              );
            }
          })}
        </ul>
        <div className="w-full mb-6 mt-8">
          <p className="mb-2 ">Ми в соціальних мережах</p>
          <div className=" flex gap-10 items-center h-12">
            <TikTokIcon
              href="https://www.tiktok.com/@electrychna_fortec?_t=8jWQfj7DEsH&_r=1"
              color="#69AF00"
              target="_blank"
            />
            <InstagramIcon
              href="https://www.instagram.com/electrychna_fortecia/"
              color="#69AF00"
              target="_blank"
            />
          </div>
        </div>
        <div className="flex flex-col gap-4 text-white mb-8">
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
