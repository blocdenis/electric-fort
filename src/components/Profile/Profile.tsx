'use client';
import ProfileInfo from './ProfileInfo';
import classNames from 'classnames';
import styles from './Profile.module.scss';
import { useState } from 'react';
import ProfileReviews from './ProfileReviews';
// import Link from 'next/link';
import ProfileOrdersHistory from './ProfileOrdersHistory';
import { useQuery } from '@tanstack/react-query';
import { getUserInfo } from '@/services/api/api';
import { Link } from '@/navigation';

function Profile() {
  const PROFILE_TABS = {
    PROFILE_INFO: 'Персональна інформація',
    ORDERS_HISTORY: 'Історія замовлень',
    REVIEWS: 'Відгуки',
  };

  const [tab, setTab] = useState(PROFILE_TABS.PROFILE_INFO);

  const handleTabClick = (event: React.MouseEvent<HTMLLIElement>) => {
    switch (event.currentTarget.innerText) {
      case 'Персональна інформація':
        setTab(PROFILE_TABS.PROFILE_INFO);
        break;
      case 'Історія замовлень':
        setTab(PROFILE_TABS.ORDERS_HISTORY);
        break;
      case 'Відгуки':
        setTab(PROFILE_TABS.REVIEWS);
        break;

      default:
        break;
    }
  };

  const { data: user, isFetching } = useQuery({
    queryKey: ['user'],
    queryFn: () => getUserInfo(),
    staleTime: 10 * 1000,
  });

  return (
    <div className="flex w-full">
      <div className="w-[23%]">
        <ul className=" pt-6 mb-[42px]">
          <li
            onClick={handleTabClick}
            className={classNames(
              styles.switcher_item,
              'mb-[42px] cursor-pointer ',
              tab === PROFILE_TABS.PROFILE_INFO && styles.switcher_item__active
            )}
          >
            <Link
              href={'/user_profile/#personal_info'}
              className=" inline-block w-full h-full"
            >
              Персональна інформація
            </Link>
          </li>
          <li
            onClick={handleTabClick}
            className={classNames(
              styles.switcher_item,
              'mb-[42px] cursor-pointer ',
              tab === PROFILE_TABS.ORDERS_HISTORY &&
                styles.switcher_item__active
            )}
          >
            <Link
              href={'/user_profile/#history_order'}
              className=" inline-block w-full h-full"
            >
              Історія замовлень
            </Link>
          </li>
          <li
            onClick={handleTabClick}
            className={classNames(
              styles.switcher_item,
              'cursor-pointer',
              tab === PROFILE_TABS.REVIEWS && styles.switcher_item__active
            )}
          >
            <Link
              className=" inline-block w-full h-full"
              href={'/user_profile/#reviews'}
            >
              Відгуки
            </Link>
          </li>
        </ul>
        <p className="mb-4">За програмою лояльності ви маєте діючу знижку:</p>
        <div className="flex flex-col justify-between w-full h-[152px] bg-primary_green text-black py-6 pr-6 pl-[30px] ">
          <p className="text-base font-bold">Ваша знижка становить:</p>
          <p className="text-xxl font-bold text-right">{user?.discount}%</p>
        </div>
      </div>
      <div
        className={classNames('w-[77%]', {
          'border border-primary_green': tab !== PROFILE_TABS.PROFILE_INFO,
        })}
      >
        {tab === PROFILE_TABS.PROFILE_INFO && <ProfileInfo />}
        {tab === PROFILE_TABS.ORDERS_HISTORY && <ProfileOrdersHistory />}
        {tab === PROFILE_TABS.REVIEWS && <ProfileReviews />}
      </div>
    </div>
  );
}

export default Profile;
