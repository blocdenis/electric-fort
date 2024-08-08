import Button from '@/components/Buttons/Button/Button';
import styles from './ReviewForm.module.scss';
import ReviewIcon from '@/components/icons/ReviewIcon';
import { useState } from 'react';

interface ReviewFormProps {
  productName: string;
  id: number;
}

function ReviewForm({ productName, id }: ReviewFormProps) {
  const [review, setReview] = useState('');
  const formData = {
    product_id: id,
    respond: review,
  };
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setReview(value);
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formData);
  };
  return (
    <div>
      <h2 className={styles.title}>Відгук</h2>

      <p className={styles.product_name}>{productName}</p>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <label className={styles.review_label} htmlFor="review">
          Текст відгуку*
        </label>
        <textarea
          className={styles.review_textarea}
          name="review"
          value={review}
          onChange={onChange}
        ></textarea>
        <Button
          className="flex justify-center items-center gap-[22px] self-end"
          type="submit"
        >
          <ReviewIcon width={24} height={24} />
          Залишити відгук
        </Button>
      </form>
    </div>
  );
}

export default ReviewForm;
