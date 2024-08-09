import React from 'react';
import ProfileReviewItem from './ProfileReviewItem';
import ShowMoreButton from '../Buttons/ShowMoreButton/ShowMoreButton';
import { useQuery } from '@tanstack/react-query';
import { getUserReviews } from '@/services/api/api';

function ProfileReviews() {
  const { data } = useQuery({
    queryKey: ['userReviews'],
    queryFn: () => getUserReviews(),
    staleTime: 10 * 1000,
  });

  const userReviews = data?.data;

  return (
    <div className="h-full flex items-center px-[20px] py-[20px]">
      {userReviews?.length !== 0 ? (
        <div className="w-full self-start">
          <ul>
            {userReviews?.map((review) => (
              <li key={review.product_id}>
                <ProfileReviewItem review={review} />
              </li>
            ))}
          </ul>

          <div className="flex justify-center">
            <ShowMoreButton className=" mx-auto" />
          </div>
        </div>
      ) : (
        <p className="w-full text-center text-lg">
          Ви ще не зробили жодного замовлення.
          <br />
          Ви маєте змогу залишати відгуки лише до товарів які ви придбали.
        </p>
      )}
    </div>
  );
}

export default ProfileReviews;
