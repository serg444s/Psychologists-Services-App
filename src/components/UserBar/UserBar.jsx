import css from "./UserBar.module.css";

const UserBar = ({ openMenu, onOpenRegModal }) => {
  return (
    <div className={css.container}>
      <button onClick={openMenu} className={css.btn}>
        Log In
      </button>
      <button onClick={onOpenRegModal} className={css.btn}>
        Registration
      </button>
    </div>
  );
};

export default UserBar;
