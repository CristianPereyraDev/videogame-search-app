import styles from "./NavBar.module.css";
import { NavLink } from "react-router-dom";
import logo from "./icon_game_controller.png";
import AddIcon from "../Icons/AddIcon";

export default function NavBar(props) {
  return (
    <div className={styles.navbar}>
      <NavLink to="/home" className={styles.navbarLink}>
        <img src={logo}></img>
      </NavLink>

      <NavLink to="/add" className={styles.navbarLink}>
        <button className={styles.navbarButton}>
          <span>Agregar Juego</span>
          <span>
            <AddIcon></AddIcon>
          </span>
        </button>
      </NavLink>
    </div>
  );
}
