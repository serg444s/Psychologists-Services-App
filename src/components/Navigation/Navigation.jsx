import { Link, NavLink } from 'react-router-dom';
import css from './Navigation.module.css';
import clsx from 'clsx';
import { useState } from 'react';
import UserBar from '../UserBar/UserBar';
import LogInModal from '../LogInModal/LogInModal';
import RegistrationModal from '../RegistrationModal/RegistrationModal';
import AuthDetails from '../Authentication/AuthDetails';

const Navigation = ({ authUser }) => {
  const [openSignModal, setSineModalOpen] = useState(false);
  const [openRegModal, setRegModalOpen] = useState(false);

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
          <UserBar openMenu={onOpenSignModal} onOpenRegModal={onOpenRegModal} />
        ) : (
          <AuthDetails authUser={authUser} />
        )}
      </div>

      <div className={css.line}></div>

      <LogInModal modalIsOpen={openSignModal} closeModal={onCloseSineMenu} />
      <RegistrationModal
        modalIsOpen={openRegModal}
        closeModal={onCloseRegMenu}
      />
    </>
  );
};

export default Navigation;
