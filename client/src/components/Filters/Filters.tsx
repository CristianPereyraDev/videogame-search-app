import { useEffect, useState } from 'react';
import styles from './Filters.module.css';
import { useSelector } from 'react-redux';
import Select from '../Utils/Select';
import { RootState } from '../../app/store';
import { IGameGenre } from '../Card/Card';
import { ApiFilter } from '../../utils/filters.util';

const API_KEY = import.meta.env.VITE_RAWG_API_KEY;

export default function Filters({
  handlerChange,
}: {
  handlerChange: (filter: ApiFilter) => void;
}) {
  const [genres, setGenres] = useState<Array<IGameGenre>>([]);
  // Sync with global state
  const { filter } = useSelector((state: RootState) => state.games);

  // Cuando se monta el componente cargo todos los generos en el estado genres.
  useEffect(() => {
    async function getGenres() {
      try {
        const response = await fetch(
          `https://api.rawg.io/api/genres?key=${API_KEY}`
        );
        const jsonResponse = await response.json();

        setGenres(jsonResponse.results);
      } catch (error: any) {
        console.log(error.message);
      }
    }
    getGenres();
  }, []);

  function handleSourceFilterChange(e: any) {
    const source = e.target.value;
    handlerChange({ name: 'source', value: source });
  }

  function handleGenreFilterChange(e: any) {
    const genre = e.target.value;
    handlerChange({ name: 'genres', value: genre });
  }

  return (
    <div className={styles.filters}>
      <h2>Filtros</h2>
      <div>
        <h4>Source</h4>
        <Select
          title='Todas las fuentes'
          value={filter && filter[0].name === 'source' ? filter[0].value : ''}
          options={[
            { value: 'api', label: 'API' },
            { value: 'db', label: 'Database' },
          ]}
          onChange={handleSourceFilterChange}
        ></Select>
      </div>
      <div>
        <h4>Géneros</h4>
        <Select
          title='Todos los géneros'
          value={filter && filter[0].name === 'genres' ? filter[0].value : ''}
          options={genres.map((genre) => {
            return { value: genre.id, label: genre.name };
          })}
          onChange={handleGenreFilterChange}
        />
      </div>
    </div>
  );
}
