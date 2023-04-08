import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Filters.module.css";
import { useSelector } from "react-redux";
import Select from "../Utils/Select";

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
        <Select
          titleOption={{ value: "none", name: "Elije una fuente:" }}
          options={[
            { id: 1, value: "api", name: "API" },
            { id: 2, value: "db", name: "Database" },
          ]}
          changeHandler={handleSourceFilterChange}
        ></Select>
      </div>
      <div>
        <h4>Géneros</h4>
        <Select
          titleOption={{ id: 1, value: "none", name: "Elije una género:" }}
          options={genres.map((genre) => {
            return { id: genre.id, value: genre.id, name: genre.name };
          })}
          changeHandler={handleGenreFilterChange}
        />
      </div>
    </div>
  );
}
