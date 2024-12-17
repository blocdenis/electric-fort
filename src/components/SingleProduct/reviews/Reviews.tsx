import React from 'react';
import styles from './Reviews.module.scss';
// import { Review } from '@/lib/types/types';
import { ProductRespond } from '@/services/api/api';
import { formatDate } from '@/lib/utils/formatDate';

interface ReviewsProps {
  reviews: ProductRespond[];
}

const Reviews: React.FC<ReviewsProps> = ({ reviews }) => {
  return (
    <div className={styles.reviews}>
      {reviews.map((review) => (
        <div key={review.add_date} className={styles.review}>
          <div className={styles.header}>
            <div className={styles.name}>
              {`${review.first_name} 
              ${review.last_name}`}
            </div>
            <div className={styles.date}>{formatDate(review.add_date)}</div>
          </div>
          <div className={styles.reviewText}>{review.respond}</div>
          <div className={styles.separator}></div>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
