import styles from "./SearchBar.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchByName } from "../../redux/actions/actions";
import SearchIcon from "../Icons/SearchIcon";

export default function SearchBar(props) {
  const [videogameName, setVideogameName] = useState("");
  const dispatch = useDispatch();

  return (
    <div className={styles.search}>
      <input
        type="search"
        className={styles.searchTerm}
        placeholder="Buscar juego..."
        onChange={(e) => setVideogameName(e.target.value)}
      />
      <button
        onClick={() => dispatch(searchByName(videogameName))}
        className={styles.searchButton}
      >
        <SearchIcon />
      </button>
    </div>
  );
}
