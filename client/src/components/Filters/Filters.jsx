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
    props.handlerChange({ prop: "source", value: source });
  }

  function handleGenreFilterChange(e) {
    const genre = e.target.value;
    props.handlerChange({ prop: "genres", value: genre });
  }

  return (
    <div className={styles.filters}>
      <h2>Filtros</h2>
      <div>
        <h4>Source</h4>
        <Select
          title="Todas las fuentes"
          value={filter && filter.prop === "source" ? filter.value : ""}
          options={[
            { value: "api", label: "API" },
            { value: "db", label: "Database" },
          ]}
          onChange={handleSourceFilterChange}
        ></Select>
      </div>
      <div>
        <h4>Géneros</h4>
        <Select
          title="Todos los géneros"
          value={filter && filter.prop === "genres" ? filter.value : ""}
          options={genres.map((genre) => {
            return { value: genre.id, label: genre.name };
          })}
          onChange={handleGenreFilterChange}
        />
      </div>
    </div>
  );
}
