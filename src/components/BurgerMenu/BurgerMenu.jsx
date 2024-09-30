import Modal from 'react-modal';
import IconSvg from '../IconSvg/IconSvg';
import css from './BurgerMenu.module.css';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import UserBar from 'components/UserBar/UserBar';
import AuthDetails from 'components/Authentication/AuthDetails';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '60px',
    maxWidth: '565px',
    height: '509px',
    borderRadius: '30px',
    position: 'relative',
    backgroundImage: 'linear-gradient(135deg, #fff7f0, #ffe5cc)',
  },
};

Modal.setAppElement('#root');

const BurgerMenu = ({
  modalIsOpen,
  closeModal,
  authUser,
  onOpenSignModal,
  onOpenRegModal,
}) => {
  const buildLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
    >
      <div>
        <button onClick={closeModal} className={css.btnclose}>
          <IconSvg iconName={'close'} width={26} height={26} />
        </button>

        <nav className={css.nav}>
          <NavLink to="/" className={buildLinkClass} onClick={closeModal}>
            Home
          </NavLink>
          <NavLink
            to="/psychologists"
            className={buildLinkClass}
            onClick={closeModal}
          >
            Psychologists
          </NavLink>
          {authUser && (
            <NavLink
              to="/favorites"
              className={buildLinkClass}
              onClick={closeModal}
            >
              Favorites
            </NavLink>
          )}
        </nav>

        {!authUser ? (
          <UserBar
            openMenu={onOpenSignModal}
            onOpenRegModal={onOpenRegModal}
            closeBurger={closeModal}
          />
        ) : (
          <AuthDetails authUser={authUser} />
        )}
      </div>
    </Modal>
  );
};

export default BurgerMenu;
