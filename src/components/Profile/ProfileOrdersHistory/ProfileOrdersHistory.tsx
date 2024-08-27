import React from 'react';
import ProfileOrderItem from './ProfileOrderItem/ProfileOrderItem';
import { useQuery } from '@tanstack/react-query';
import { getUserOrders } from '@/services/api/api';
import { useFilters } from '@/context/FiltersContext';
import ShowMoreButton from '../../Buttons/ShowMoreButton/ShowMoreButton';
import Loading from '@/components/Loading/Loading';

function ProfileOrdersHistory() {
  const { urlPage } = useFilters();
  const page = 1; //for fetching data
  const itemsPerPage = 3;
  const pageSize = Number(urlPage) * itemsPerPage; //for fetching data

  const { data, isFetching } = useQuery({
    queryKey: ['userOrders', page, pageSize],
    queryFn: () => getUserOrders(Number(page), Number(pageSize)),
    staleTime: 10 * 1000,
  });

  const orders = data?.data;

  if (!data) {
    return <Loading />;
  }

  return (
    <div className="flex items-center laptop:px-5 laptop:py-5 h-full w-full min-h-[147px]">
      {orders?.length !== 0 ? (
        <div className="w-full self-start">
          <ul className="w-full flex flex-col gap-[10px] laptop:gap-0">
            {orders?.map((order) => (
              <li key={order.id}>
                <ProfileOrderItem order={order} />
              </li>
            ))}
          </ul>
          {data?.count > pageSize ? (
            <div className="flex justify-center mt-6">
              <ShowMoreButton className=" mx-auto" />
            </div>
          ) : null}
        </div>
      ) : (
        <p className=" text-base laptop:text-lg text-center justify-self-center w-full">
          Ви ще не зробили жодного замовлення.
        </p>
      )}
    </div>
  );
}

export default ProfileOrdersHistory;
