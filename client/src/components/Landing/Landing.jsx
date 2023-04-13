import { NavLink } from "react-router-dom";
import styles from "./Landing.module.css";
import AnimatedPacman from "./AnimatedPacman";

export default function Landing(props) {
  return (
    <div className={styles.landingContainer}>
      <div className={styles.animContainer}>
        <AnimatedPacman />
      </div>
      <div className={styles.buttonContainer}>
        <NavLink to="/home">
          <button className={styles.btn}>Ingresar</button>
        </NavLink>
      </div>
    </div>
  );
}
