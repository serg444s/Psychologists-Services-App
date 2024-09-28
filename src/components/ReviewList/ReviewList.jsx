import ReviewItem from '../ReviewItem/ReviewItem';
import css from './ReviewList.module.css';

const ReviewList = ({ reviews }) => {
  return (
    <ul className={css.list}>
      {reviews.map((review, index) => {
        return (
          <li key={index} className={css.item}>
            <ReviewItem review={review} />
          </li>
        );
      })}
    </ul>
  );
};

export default ReviewList;
