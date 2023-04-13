import styles from "./NavBar.module.css";
import { NavLink, useLocation } from "react-router-dom";
import LogoIcon from "../Icons/LogoIcon";

export default function NavBar(props) {
  const location = useLocation();
  return (
    <div className={styles.navbar}>
      {/* Home link */}
      <div className={styles.homeLinkContainer}>
        <NavLink
          onClick={
            location.pathname === "/home"
              ? () => {
                  window.location.reload();
                }
              : null
          }
          to="/home"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? `${styles.active}` : ``
          }
        >
          <LogoIcon />
        </NavLink>
      </div>
      {/* Add videogame link */}
      <div className={styles.addLink}>
        <NavLink
          to="/add"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? `${styles.navbarLink} ${styles.active}`
              : `${styles.navbarLink}`
          }
        >
          <span>Agregar Juego</span>
        </NavLink>
      </div>
    </div>
  );
}
