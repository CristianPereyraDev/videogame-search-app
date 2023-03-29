import styles from "./NavBar.module.css";
import { NavLink } from "react-router-dom";

export default function NavBar(props) {
  return (
    <div className={styles.Navbar}>
      <div className={styles.NavbarLinkContainer}>
        <div>
          <NavLink to="/home">
            <button>Videogames</button>
          </NavLink>
        </div>
        <div>
          <NavLink to="/add">
            <button>Agregar</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
