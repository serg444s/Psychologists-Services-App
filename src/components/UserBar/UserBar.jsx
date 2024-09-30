import css from './UserBar.module.css';

const UserBar = ({ openMenu, onOpenRegModal, closeBurger, showBurgerMenu }) => {
  function logIn() {
    openMenu();
    closeBurger();
  }

  function registration() {
    onOpenRegModal();
    closeBurger();
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
