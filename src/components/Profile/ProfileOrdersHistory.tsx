import React from 'react';
import ProfileOrderItem from './ProfileOrderItem';
import { useQuery } from '@tanstack/react-query';
import { getUserOrders } from '@/services/api/api';

function ProfileOrdersHistory() {
  const { data, isFetching } = useQuery({
    queryKey: ['userOrders'],
    queryFn: () => getUserOrders(),
    staleTime: 10 * 1000,
  });

  const orders = data?.data;

  return (
    <div className="px-5 py-5">
      <ul>
        {orders?.map((order) => (
          <li key={order.id}>
            <ProfileOrderItem order={order} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProfileOrdersHistory;
