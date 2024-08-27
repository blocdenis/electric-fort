import React from 'react';
import ProfileReviewItem from './ProfileReviewItem';
import ShowMoreButton from '../../Buttons/ShowMoreButton/ShowMoreButton';
import { useQuery } from '@tanstack/react-query';
import { getUserReviews } from '@/services/api/api';
import { useFilters } from '@/context/FiltersContext';
import Loading from '@/components/Loading/Loading';

function ProfileReviews() {
  const { urlPage } = useFilters();
  const page = 1; //for fetching data
  const itemsPerPage = 3;
  const pageSize = Number(urlPage) * itemsPerPage; //for fetching data

  const { data, isFetching } = useQuery({
    queryKey: ['userReviews', page, pageSize],
    queryFn: () => getUserReviews(Number(page), Number(pageSize)),
    staleTime: 10 * 1000,
  });

  const userReviews = data?.data;

  if (!data) {
    return <Loading />;
  }

  return (
    <div className="h-full min-h-[167px] flex items-center laptop:px-[20px] laptop:py-[20px]">
      {userReviews?.length !== 0 ? (
        <div className="w-full self-start">
          <ul>
            {userReviews?.map((review) => (
              <li key={review.add_date}>
                <ProfileReviewItem review={review} />
              </li>
            ))}
          </ul>

          {data?.count > pageSize ? (
            <div className="flex justify-center">
              <ShowMoreButton isDisabled={isFetching} className=" mx-auto" />
            </div>
          ) : null}
        </div>
      ) : (
        <p className="w-full text-center text-base laptop:text-lg">
          Ви ще не зробили жодного замовлення.
          <br />
          Ви маєте змогу залишати відгуки лише до товарів які ви придбали.
        </p>
      )}
    </div>
  );
}

export default ProfileReviews;
