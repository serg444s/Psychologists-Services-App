import IconSvg from "../IconSvg/IconSvg";
import css from "./ReviewItem.module.css";

const ReviewItem = ({ review }) => {
  const avatar = review.reviewer.toUpperCase().slice(0, 1);

  return (
    <>
      <div className={css.title}>
        <div className={css.avatar}>
          <p>{avatar}</p>
        </div>
        <div className={css.align}>
          <p className={css.name}>{review.reviewer}</p>

          <p className={css.name}>
            <IconSvg iconName={"star"} width={16} height={16} />
            {review.rating}
          </p>
        </div>
      </div>

      <p className={css.desc}>{review.comment}</p>
    </>
  );
};
export default ReviewItem;
