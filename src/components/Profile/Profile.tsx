'use client';
import ProfileInfo from './ProfileInfo';
import classNames from 'classnames';
import styles from './Profile.module.scss';
import { useState } from 'react';
import ProfileReviews from './ProfileReviews';
import Link from 'next/link';
import ProfileOrdersHistory from './ProfileOrdersHistory';
import { useQuery } from '@tanstack/react-query';
import { getUserInfo } from '@/services/api/api';

function Profile() {
  const PROFILE_TABS = {
    PROFILE_INFO: 'Персональна інформація',
    ORDERS_HISTORY: 'Історія замовлень',
    REVIEWS: 'Відгуки',
  };

  const [isProfileInfoOpen, setIsProfileInfoOpen] = useState(false);
  const [isOrdersHistoryOpen, setIsOrdersHistoryOpen] = useState(false);
  const [isReviewsOpen, setIsReviewsOpen] = useState(false);
  const [tab, setTab] = useState(PROFILE_TABS.PROFILE_INFO);

  const handleTabClick = (event: React.MouseEvent<HTMLDivElement>) => {
    switch (event.currentTarget.innerText) {
      case 'Персональна інформація':
        setIsProfileInfoOpen((prevVal) => !prevVal);
        setIsOrdersHistoryOpen(false);
        setIsReviewsOpen(false);
        setTab(PROFILE_TABS.PROFILE_INFO);
        break;
      case 'Історія замовлень':
        setTab(PROFILE_TABS.ORDERS_HISTORY);
        setIsOrdersHistoryOpen((prevVal) => !prevVal);
        setIsProfileInfoOpen(false);
        setIsReviewsOpen(false);
        break;
      case 'Відгуки':
        setTab(PROFILE_TABS.REVIEWS);
        setIsReviewsOpen((prevVal) => !prevVal);
        setIsOrdersHistoryOpen(false);
        setIsProfileInfoOpen(false);
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
      <div className="w-full laptop:w-[23%]">
        <div className=" pt-6 mb-[42px] w-full">
          <div
            onClick={handleTabClick}
            className={classNames(
              styles.switcher_item,
              // 'mb-[42px]',
              tab === PROFILE_TABS.PROFILE_INFO && styles.switcher_item__active
            )}
          >
            <Link
              href={'/user_profile/#personal_info'}
              className=" inline-block w-full h-full"
            >
              Персональна інформація
            </Link>
          </div>
          {isProfileInfoOpen ? (
            <div className="mb-8 laptop:hidden">
              <ProfileInfo />
            </div>
          ) : null}
          <div
            onClick={handleTabClick}
            className={classNames(
              styles.switcher_item,
              // 'mb-[42px]',
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
          </div>
          {isOrdersHistoryOpen ? (
            <div className="mb-8 laptop:hidden">
              <ProfileOrdersHistory />
            </div>
          ) : null}
          <div
            onClick={handleTabClick}
            className={classNames(
              styles.switcher_item,
              tab === PROFILE_TABS.REVIEWS && styles.switcher_item__active
            )}
          >
            <Link
              className=" inline-block w-full h-full"
              href={'/user_profile/#reviews'}
            >
              Відгуки
            </Link>
          </div>
          {isReviewsOpen ? (
            <div className="mb-8 laptop:hidden">
              <ProfileReviews />
            </div>
          ) : null}
        </div>
        <p className="mb-4">За програмою лояльності ви маєте діючу знижку:</p>
        <div className="flex flex-col justify-between w-full h-[152px] bg-primary_green text-black py-6 pr-6 pl-[30px] ">
          <p className="text-base font-bold">Ваша знижка становить:</p>
          <p className="text-xxl font-bold text-right">{user?.discount}%</p>
        </div>
      </div>
      <div
        className={classNames('w-[77%] hidden laptop:block', {
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
