import IconSvg from '../IconSvg/IconSvg';
import css from './ReviewItem.module.css';

const ReviewItem = ({ review }) => {
  const avatar = review.reviewer_name.toUpperCase().slice(0, 1);

  const roundRating = number => {
    const roundedNumber = Math.round(number);
    return Array.from({ length: roundedNumber }).map((_, index) => (
      <IconSvg key={index} iconName={'star'} width={16} height={16} />
    ));
  };

  return (
    <>
      <div className={css.title}>
        <div className={css.avatar}>
          <p>{avatar}</p>
        </div>
        <div>
          <p className={css.name}>{review.reviewer_name}</p>
          {roundRating(review.reviewer_rating)}
        </div>
      </div>

      <p className={css.desc}>{review.comment}</p>
    </>
  );
};
export default ReviewItem;
