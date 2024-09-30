import { Link, NavLink } from 'react-router-dom';
import css from './Navigation.module.css';
import clsx from 'clsx';
import { useState } from 'react';
import UserBar from '../UserBar/UserBar';
import LogInModal from '../LogInModal/LogInModal';
import RegistrationModal from '../RegistrationModal/RegistrationModal';
import AuthDetails from '../Authentication/AuthDetails';
import BurgerMenu from 'components/BurgerMenu/BurgerMenu';
import IconSvg from 'components/IconSvg/IconSvg';

const Navigation = ({ authUser }) => {
  const [openSignModal, setSineModalOpen] = useState(false);
  const [openRegModal, setRegModalOpen] = useState(false);
  const [showBurgerMenu, setShowBurgerMenu] = useState(false);

  function openBurger() {
    setShowBurgerMenu(true);
  }

  function closeBurger() {
    setShowBurgerMenu(false);
  }

  function onOpenSignModal() {
    setSineModalOpen(true);
  }

  function onCloseSineMenu() {
    setSineModalOpen(false);
  }

  function onOpenRegModal() {
    setRegModalOpen(true);
  }

  function onCloseRegMenu() {
    setRegModalOpen(false);
  }

  const buildLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };

  return (
    <>
      <div className={css.container}>
        <Link to="/" className={css.logo}>
          <p>
            psychologists.<span>services</span>
          </p>
        </Link>
        <nav className={css.nav}>
          <NavLink to="/" className={buildLinkClass}>
            Home
          </NavLink>
          <NavLink to="/psychologists" className={buildLinkClass}>
            Psychologists
          </NavLink>
          {authUser && (
            <NavLink to="/favorites" className={buildLinkClass}>
              Favorites
            </NavLink>
          )}
        </nav>

        {!authUser ? (
          <div className={css.display}>
            <UserBar
              openMenu={onOpenSignModal}
              onOpenRegModal={onOpenRegModal}
              showBurgerMenu={showBurgerMenu}
            />
          </div>
        ) : (
          <div className={css.display}>
            <AuthDetails authUser={authUser} />
          </div>
        )}
        <button onClick={openBurger} className={css.burgerbtn}>
          <IconSvg iconName={'burger'} width={25} height={20} />
        </button>
      </div>

      <div className={css.line}></div>

      <LogInModal modalIsOpen={openSignModal} closeModal={onCloseSineMenu} />
      <RegistrationModal
        modalIsOpen={openRegModal}
        closeModal={onCloseRegMenu}
      />
      <BurgerMenu
        modalIsOpen={showBurgerMenu}
        closeModal={closeBurger}
        authUser={authUser}
        onOpenRegModal={onOpenRegModal}
        onOpenSignModal={onOpenSignModal}
      />
    </>
  );
};

export default Navigation;
