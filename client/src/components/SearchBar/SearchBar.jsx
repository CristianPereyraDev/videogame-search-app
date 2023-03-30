import styles from "./SearchBar.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchByName } from "../../redux/actions/actions";

export default function SearchBar(props) {
  const [videogameName, setVideogameName] = useState("");
  const dispatch = useDispatch();

  return (
    <div className={styles.SearchBarContainer}>
      <input
        type="search"
        placeholder="Buscar juego..."
        onChange={(e) => setVideogameName(e.target.value)}
      />
      <button onClick={() => dispatch(searchByName(videogameName))}>
        Search
      </button>
    </div>
  );
}
