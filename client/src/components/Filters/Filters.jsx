import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Filters.module.css";
import { useSelector } from "react-redux";

export default function Filters(props) {
  const [genres, setGenres] = useState([]);
  // Sync with global state
  const { filter } = useSelector((state) => state);

  // Cuando se monta el componente cargo todos los generos en el estado genres.
  useEffect(() => {
    async function getGenres() {
      try {
        const response = await axios.get("http://localhost:3001/genres");
        setGenres(response.data);
      } catch (error) {
        console.log(error.message);
      }
    }
    getGenres();
  }, []);

  function handleSourceFilterChange(e) {
    const source = e.target.value;

    if (source) props.handlerChange({ prop: "source", value: source });
  }

  function handleGenreFilterChange(e) {
    const genre = e.target.value;
    if (genre) props.handlerChange({ prop: "genres", value: genre });
  }

  return (
    <div className={styles.filters}>
      <div>
        <h4>Source</h4>
        <select onChange={handleSourceFilterChange}>
          <option value="none">Elije una fuente:</option>
          <option value="api">API</option>
          <option value="db">Database</option>
        </select>
      </div>
      <div>
        <h4>Géneros</h4>
        <select onChange={handleGenreFilterChange}>
          <option value="none">Elije un género:</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
