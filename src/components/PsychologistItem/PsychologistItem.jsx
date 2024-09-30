import { useEffect, useState } from 'react';
import IconSvg from '../IconSvg/IconSvg';
import css from './PsychologistItem.module.css';
import ReviewList from '../ReviewsList/ReviewsList';

const PsychologistItem = ({ item, addToFaforites, authUser }) => {
  const [show, setShow] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  function ShowReviews() {
    setShow(true);
  }

  const add = item => {
    addToFaforites(item);
    setIsFavorite(!isFavorite);
  };

  useEffect(() => {
    if (!authUser) return;
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const isItemFavorite = favorites.some(
      favItem => favItem.psychologId === item.psychologId
    );
    setIsFavorite(isItemFavorite);
  }, [item.psychologId, authUser]);

  return (
    <div className={css.container}>
      <div className={css.imgwrap}>
        <img
          alt={item.name || 'Psychologist'}
          src={item.avatar_url}
          className={css.img}
        />
        <IconSvg iconName={'ball'} styles={css.icon} width={14} height={14} />
      </div>
      <div className={css.content}>
        <div className={css.header}>
          <div className={css.namecontainer}>
            <p className={css.psychologist}>Psychologist</p>
            <h2 className={css.name}>{item.name}</h2>
          </div>
          <div className={css.details}>
            <p className={css.reviews}>
              <span>
                <IconSvg width={16} height={16} iconName={'star'} />
              </span>
              {`Raiting: ${item.rating}`}
            </p>
            <p
              className={css.reviews}
            >{`Price/1hour: ${item.price_per_hour}$`}</p>
            <button
              onClick={() => {
                add(item);
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
            <span className={css.span}>{item.experience}</span>
          </li>
          <li className={css.item}>
            <p>License: </p>
            <span className={css.span}>{item.license}</span>
          </li>
          <li className={css.item}>
            <p>Specialization: </p>
            <span className={css.span}>{item.specialization}</span>
          </li>
          <li className={css.item}>
            <p>Initial consultation: </p>
            <span className={css.span}>{item.initial_consultation}</span>
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
