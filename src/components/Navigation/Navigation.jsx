import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";
import clsx from "clsx";


const Navigation = () => {
 
  const buildLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };

  return ( <>

<nav className={css.nav}>
      <NavLink to="/" className={buildLinkClass}>
        Home
      </NavLink>
      <NavLink to="/catalog" className={buildLinkClass}>
      Catalog
      </NavLink>
      <NavLink to="/favorites" className={buildLinkClass}>
      Favorites
      </NavLink>
    </nav>
<div className={css.line}></div>

  </>
    
  );
};

export default Navigation;