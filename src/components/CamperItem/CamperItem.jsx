import { useState } from 'react';
import { formatPrice } from '../../utils/formatPrice';
import IconSvg from '../IconSvg/IconSvg';
import css from './CamperItem.module.css';
import CamperModal from '../CamperModal/CamperModal';
import { changeFavorite } from '../../redux/favoriteSlice';
import { useDispatch } from 'react-redux';
import { getLocation } from '../../utils/getLocation';

const CamperItem = ({ item }) => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const [isFavorite, setIsFavorite] = useState(() => {
    const storedValue = localStorage.getItem(`favorite-${item._id}`);
    return storedValue ? JSON.parse(storedValue) : false;
  });

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const place = 'https://www.google.com/maps/place';

  const onFavoriteAdd = obj => {
    const newFavoriteStatus = !isFavorite;
    dispatch(changeFavorite(obj));
    setIsFavorite(newFavoriteStatus);
    localStorage.setItem(
      `favorite-${item._id}`,
      JSON.stringify(newFavoriteStatus)
    );
  };

  const renderListItems = obj => {
    return (
      <ul className={css.details}>
        <li>
          <IconSvg width={20} height={20} iconName={'adults'} />
          <p>{`${obj.adults} adults`}</p>
        </li>
        <li>
          <IconSvg width={20} height={20} iconName={'automatic'} />
          <p>{obj.transmission}</p>
        </li>
        <li>
          <IconSvg width={20} height={20} iconName={'petrol'} />
          <p>{obj.engine}</p>
        </li>
        <li>
          <IconSvg width={20} height={20} iconName={'kitchen'} />
          <p>{`${obj.details.kitchen} kitchen`}</p>
        </li>
        <li>
          <IconSvg width={20} height={20} iconName={'bed'} />
          <p>{`${obj.details.beds} beds`}</p>
        </li>
        <li>
          <IconSvg width={20} height={20} iconName={'acmask'} />
          <p>{`${obj.details.airConditioner} AC`}</p>
        </li>
      </ul>
    );
  };

  return (
    <div className={css.container}>
      <div className={css.imgwrap}>
        <img
          alt={item.name || 'camper'}
          src={
            item.gallery.length > 0
              ? item.gallery[0]
              : 'https://www.shutterstock.com/image-vector/no-image-available-vector-illustration-260nw-744886198.jpg'
          }
        />
      </div>
      <div className={css.item}>
        <div className={css.title}>
          <h2>{item.name}</h2>
          <h3 className={css.price}>{formatPrice(item.price)}</h3>
          <button
            onClick={() => {
              onFavoriteAdd(item);
            }}
            className={css.add}
          >
            <IconSvg iconName={isFavorite ? 'favorite' : 'hart'} />
          </button>
        </div>

        <div className={css.location}>
          <p className={css.reviews}>
            <IconSvg width={16} height={16} iconName={'star'} />
            {item.rating} ({item.reviews.length} Reviews)
          </p>

          <a
            href={`${place}/${getLocation(item.location)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconSvg width={16} height={16} iconName={'map'} />
            {item.location}
          </a>
        </div>
        <p className={css.text}>{item.description}</p>
        {renderListItems(item)}
        <button className={css.btn} onClick={openModal}>
          Show More
        </button>
        <CamperModal
          modalIsOpen={showModal}
          closeModal={closeModal}
          item={item}
        />
      </div>
    </div>
  );
};
export default CamperItem;
