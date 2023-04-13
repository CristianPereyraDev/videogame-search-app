import styles from "./SearchBar.module.css";
import { useState } from "react";
import SearchIcon from "../Icons/SearchIcon";

export default function SearchBar(props) {
  const [videogameName, setVideogameName] = useState("");

  return (
    <div className={styles.search}>
      <input
        type="search"
        className={styles.searchTerm}
        placeholder="Buscar juego..."
        onChange={(e) => setVideogameName(e.target.value)}
      />
      <button
        onClick={() => props.handlerSearch(videogameName)}
        className={styles.searchButton}
      >
        <SearchIcon />
      </button>
    </div>
  );
}
