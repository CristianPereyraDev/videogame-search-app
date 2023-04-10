import { NavLink } from "react-router-dom";
import styles from "./Landing.module.css";
import AnimatedPacman from "./AnimatedPacman";

export default function Landing(props) {
  return (
    <div className={styles.landingContainer}>
      <AnimatedPacman />
      <NavLink to="/home">
        <button className="btn">Ingresar</button>
      </NavLink>
    </div>
  );
}
