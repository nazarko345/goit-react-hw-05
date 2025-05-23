import { NavLink, Outlet } from "react-router-dom";
import clsx from "clsx";
import css from "./Navigation.module.css";

export default function Navigation() {
  const getActiveLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.isActive);
  };

  return (
    <div className={css.container}>
      <nav className={css.naw}>
        <NavLink to="/" className={getActiveLinkClass}>
          Home
        </NavLink>
        <NavLink to="movies" className={getActiveLinkClass}>
          Movies
        </NavLink>
      </nav>
      <Outlet />
    </div>
  );
}
