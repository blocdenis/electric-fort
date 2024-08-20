import React from 'react';
import ProfileOrderItem from './ProfileOrderItem';
import { useQuery } from '@tanstack/react-query';
import { getUserOrders } from '@/services/api/api';
import { notFound } from 'next/navigation';

function ProfileOrdersHistory() {
  const { data, isFetching } = useQuery({
    queryKey: ['userOrders'],
    queryFn: () => getUserOrders(),
    staleTime: 10 * 1000,
  });

  const orders = data?.data;

  return (
    <div className="flex items-center laptop:px-5 laptop:py-5 h-full w-full min-h-[147px]">
      {orders?.length !== 0 ? (
        <ul className="w-full flex flex-col gap-[10px] laptop:gap-0">
          {orders?.map((order) => (
            <li key={order.id}>
              <ProfileOrderItem order={order} />
            </li>
          ))}
        </ul>
      ) : (
        <p className=" text-base laptop:text-lg text-center justify-self-center w-full">
          Ви ще не зробили жодного замовлення.
        </p>
      )}
    </div>
  );
}

export default ProfileOrdersHistory;
