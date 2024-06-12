import React from 'react';
import styles from './Reviews.module.scss';
import { Review } from '@/lib/types/types';

interface ReviewsProps {
  reviews: Review[];
}

const Reviews: React.FC<ReviewsProps> = ({ reviews }) => {
  return (
    <div className={styles.reviews}>
      {reviews.map((review) => (
        <div key={review.id} className={styles.review}>
          <div className={styles.header}>
            <div className={styles.name}>{review.name}</div>
            <div className={styles.date}>{review.date}</div>
          </div>
          <div className={styles.reviewText}>{review.reviewText}</div>
          <div className={styles.separator}></div>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
