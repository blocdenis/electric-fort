import Button from '@/components/Buttons/Button/Button';
import styles from './ReviewForm.module.scss';
import ReviewIcon from '@/components/icons/ReviewIcon';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addUserReview } from '@/services/api/api';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { reviewTextZodSchema } from '@/lib/schemas/validationZodSchemas';

interface ReviewFormProps {
  productName: string;
  id: number;
  onClose: () => void;
}

interface ReviewFild {
  review: string;
}

function ReviewForm({ productName, id, onClose }: ReviewFormProps) {
  const [error, setError] = useState<string>('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReviewFild>({
    defaultValues: { review: '' },
    resolver: zodResolver(reviewTextZodSchema),
  });
  const queryClient = useQueryClient();

  const sendUserReview = useMutation({
    mutationFn: addUserReview,
    onSuccess: () => {
      // queryClient.invalidateQueries({
      //   queryKey: ['userReviews'],
      //   exact: true,
      //   refetchType: 'active',
      // });
      // console.log('review send');
      onClose();
    },
    onError(error) {
      const res: { detail: string } = JSON.parse(error.message);
      console.log(JSON.parse(error.message));
      setError(res.detail);
    },
  });

  const handleReviewFormSubmit = (data: ReviewFild) => {
    // console.log(data);
    sendUserReview.mutateAsync({ product_id: id, respond: data.review });
  };
  return (
    <>
      <div>
        <h2 className={styles.title}>Відгук</h2>

        <p className={styles.product_name}>{productName}</p>
        <form
          onSubmit={handleSubmit(handleReviewFormSubmit)}
          className="flex flex-col"
        >
          <label className={styles.review_label} htmlFor="review">
            Текст відгуку*
          </label>
          <textarea
            className={styles.review_textarea}
            {...register('review')}
          ></textarea>
          {errors.review && (
            <p className=" text-error_red text-sm">{errors.review.message}</p>
          )}
          {error && <p className=" text-error_red text-sm">{error}</p>}
          <Button
            className="flex justify-center items-center gap-[22px] self-end w-[281px] py-[4px]"
            type="submit"
          >
            <div className="w-[39px] h-[39px] flex items-center justify-center">
              <ReviewIcon width={24} height={24} className=" w-full h-full" />
            </div>
            Залишити відгук
          </Button>
        </form>
      </div>
    </>
  );
}

export default ReviewForm;
