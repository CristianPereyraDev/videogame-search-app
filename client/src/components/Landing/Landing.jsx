import { NavLink } from "react-router-dom";
import styles from "./Landing.module.css";

export default function Landing(props) {
  return (
    <div className={styles.landingContainer}>
      <h1>Landing Page</h1>
      <NavLink to="/home">
        <button className="btn">Home</button>
      </NavLink>
    </div>
  );
}
