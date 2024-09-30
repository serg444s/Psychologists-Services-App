import css from './UserBar.module.css';

const UserBar = ({ openMenu, onOpenRegModal, closeBurger, showBurgerMenu }) => {
  function logIn() {
    if (showBurgerMenu) {
      closeBurger();
      openMenu();
    } else {
      openMenu();
    }
  }

  function registration() {
    if (showBurgerMenu) {
      closeBurger();
      onOpenRegModal();
    } else {
      onOpenRegModal();
    }
  }

  return (
    <div className={css.container}>
      <button onClick={logIn} className={css.btn}>
        Log In
      </button>
      <button onClick={registration} className={css.btn}>
        Registration
      </button>
    </div>
  );
};

export default UserBar;
