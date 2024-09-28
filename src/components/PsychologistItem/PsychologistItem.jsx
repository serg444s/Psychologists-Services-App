import { useEffect, useState } from 'react';
import IconSvg from '../IconSvg/IconSvg';
import css from './PsychologistItem.module.css';
import ReviewList from '../ReviewsList/ReviewsList';

const PsychologistItem = ({ item, addToFaforites }) => {
  const [show, setShow] = useState(false);

  function ShowReviews() {
    setShow(true);
  }

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const isItemFavorite = favorites.some(
      favItem => favItem.name === item.name
    );
    setIsFavorite(isItemFavorite);
  }, [item.name]);

  return (
    <div className={css.container}>
      <div className={css.imgwrap}>
        <img
          alt={item.name || 'Psychologist'}
          src={item.avatar_url}
          className={css.img}
        />
      </div>
      <div className={css.content}>
        <div className={css.header}>
          <div>
            <p className={css.psychologist}>Psychologist</p>
            <h2 className={css.name}>{item.name}</h2>
          </div>
          <div className={css.details}>
            <p className={css.reviews}>
              <IconSvg width={16} height={16} iconName={'star'} />
              {`Raiting: ${item.rating}`}
            </p>
            <p
              className={css.reviews}
            >{`Price/1our: ${item.price_per_hour}$`}</p>
            <button
              onClick={() => {
                addToFaforites(item);
              }}
              className={css.add}
            >
              <IconSvg iconName={isFavorite ? 'favorite' : 'hart'} />
            </button>
          </div>
        </div>

        <ul className={css.list}>
          <li className={css.item}>
            <p>Experience: </p>
            <span>{item.experience}</span>
          </li>
          <li className={css.item}>
            <p>License: </p>
            <span>{item.license}</span>
          </li>
          <li className={css.item}>
            <p>Specialization: </p>
            <span>{item.specialization}</span>
          </li>
          <li className={css.item}>
            <p>Initial consultation: </p>
            <span>{item.initial_consultation}</span>
          </li>
        </ul>
        <p className={css.text}>{item.about}</p>

        {show ? (
          <ReviewList
            reviews={item.reviews}
            name={item.name}
            photo={item.avatar_url}
          />
        ) : (
          <button className={css.btn} onClick={ShowReviews}>
            Read More
          </button>
        )}
      </div>
    </div>
  );
};

export default PsychologistItem;
