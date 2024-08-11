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
    <div className="flex items-center px-5 py-5 h-full w-full">
      {orders?.length !== 0 ? (
        <ul className="w-full">
          {orders?.map((order) => (
            <li key={order.id}>
              <ProfileOrderItem order={order} />
            </li>
          ))}
        </ul>
      ) : (
        <p className=" text-lg text-center justify-self-center w-full">
          Ви ще не зробили жодного замовлення.
        </p>
      )}
    </div>
  );
}

export default ProfileOrdersHistory;
