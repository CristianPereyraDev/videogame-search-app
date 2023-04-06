import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Filters.module.css";
import { useDispatch } from "react-redux";
import { filterVideogames } from "../../redux/actions/actions";

export default function Filters(props) {
  const [genres, setGenres] = useState([]);
  const dispath = useDispatch();

  // Closure that generates source filter functions
  function generateSourceFilter(gameSource) {
    if (gameSource === "db")
      return (videogame) => videogame.hasOwnProperty("fromDB");
    else return (videogame) => !videogame.hasOwnProperty("fromDB");
  }

  // Closure that generates genre filter functions
  function generateGenreFilter(genreId) {
    return (videogame) =>
      videogame.genres.some((genre) => Number(genre.id) === Number(genreId));
  }

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

    if (source) dispath(filterVideogames(generateSourceFilter(source)));
  }

  function handleGenreFilterChange(e) {
    const genre = e.target.value;
    if (genre) dispath(filterVideogames(generateGenreFilter(genre)));
  }

  return (
    <div className={styles.filters}>
      <div>
        <select onChange={handleSourceFilterChange}>
          <option value="">Source filter</option>
          <option value="api">API</option>
          <option value="db">Database</option>
        </select>
      </div>
      <div>
        <select onChange={handleGenreFilterChange}>
          {genres.map((genre) => (
            <option value={genre.id} key={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
