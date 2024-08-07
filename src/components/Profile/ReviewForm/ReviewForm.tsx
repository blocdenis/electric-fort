import Button from '@/components/Buttons/Button/Button';
import styles from './ReviewForm.module.scss';
import ReviewIcon from '@/components/icons/ReviewIcon';

interface ReviewFormProps {
  productName: string;
}

function ReviewForm({ productName }: ReviewFormProps) {
  return (
    <div>
      <h2 className={styles.title}>Відгук</h2>

      <p className={styles.product_name}>{productName}</p>
      <form className="flex flex-col">
        <label className={styles.review_label} htmlFor="review">
          Текст відгуку*
        </label>
        <textarea className={styles.review_textarea} name="review"></textarea>
        <Button
          className="flex justify-center items-center gap-[22px] self-end"
          onClick={() => console.log('Відгук')}
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
