import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import IconSvg from "../IconSvg/IconSvg";
import css from "./AuthDetails.module.css";

const AuthDetails = ({ authUser }) => {
  function logOut() {
    signOut(auth)
      .then(console.log("Log out ok"))
      .catch((e) => {
        console.error(e);
      });
  }

  function trimEmail(email) {
    const atIndex = email.indexOf("@");
    if (atIndex !== -1) {
      return email.slice(0, atIndex);
    }
    return email;
  }

  return (
    <>
      {authUser && (
        <div className={css.container}>
          <IconSvg iconName={"user"} styles={css.icon} />
          <p className={css.name}>{trimEmail(authUser.email)}</p>
          <button onClick={logOut} className={css.btn}>
            Log Out
          </button>
        </div>
      )}
    </>
  );
};

export default AuthDetails;
