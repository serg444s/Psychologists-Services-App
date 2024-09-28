import Modal from 'react-modal';
import css from './CamperModal.module.css';
import ReviewList from '../ReviewList/ReviewList';
import Features from '../Features/Features';
import { useState } from 'react';
import CamperForm from '../CamperForm/CamperForm';
import { formatPrice } from '../../utils/formatPrice';
import IconSvg from '../IconSvg/IconSvg';
import { getLocation } from '../../utils/getLocation';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '40px',
    width: '980px',
    height: '600px',
    borderRadius: '20px',
  },
};

Modal.setAppElement('#root');
const place = 'https://www.google.com/maps/place';

const CamperModal = ({ item, modalIsOpen, closeModal }) => {
  const [visible, setVisible] = useState(true);

  const onReviews = () => {
    setVisible(true);
  };

  const onFeatures = () => {
    setVisible(false);
  };

  const closeAndDefolt = () => {
    closeModal();
    setVisible(true);
  };

  const ImageGallery = urls => {
    if (urls.length > 0) {
      return urls.map((url, index) => (
        <div key={index} className={css.imgwrap}>
          <img src={url} alt={`Camper ${index + 1}`} className={css.img} />
        </div>
      ));
    } else {
      return (
        <div className={css.imgwrap}>
          <img
            src="https://www.shutterstock.com/image-vector/no-image-available-vector-illustration-260nw-744886198.jpg"
            alt="camper not found"
            className={css.img}
          ></img>
        </div>
      );
    }
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeAndDefolt}
      style={customStyles}
    >
      <div className={css.header}>
        <h2 className={css.name}>{item.name}</h2>
        <button onClick={closeAndDefolt} className={css.btnclose}>
          <IconSvg iconName={'close'} />
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
          <IconSvg width={16} height={16} iconName={'location'} />
          {item.location}
        </a>
      </div>
      <h3 className={css.price}>{formatPrice(item.price)}</h3>

      <div className={css.gallery}>
        {item.gallery.length > 0 && ImageGallery(item.gallery)}
      </div>
      <p className={css.text}>{item.description}</p>
      <div className={css.btn}>
        <button onClick={onReviews} className={visible && css.active}>
          Reviews
        </button>
        <button onClick={onFeatures} className={!visible && css.active}>
          Features
        </button>
      </div>
      <div className={css.line}></div>
      <div className={css.footermodal}>
        {visible ? (
          <ReviewList reviews={item.reviews} />
        ) : (
          <Features item={item} />
        )}
        <CamperForm />
      </div>
    </Modal>
  );
};

export default CamperModal;
