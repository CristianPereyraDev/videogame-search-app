import styles from "./NavBar.module.css";
import { NavLink } from "react-router-dom";
import logo from "./icon_game_controller.png";
import AddIcon from "../Icons/AddIcon";

export default function NavBar(props) {
  return (
    <div className={styles.navbar}>
      {/* Home link */}
      <NavLink
        to="/home"
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? `${styles.navbarLink} ${styles.active}`
            : `${styles.navbarLink}`
        }
      >
        <img src={logo}></img>
      </NavLink>
      {/* Add videogame link */}
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
  );
}
