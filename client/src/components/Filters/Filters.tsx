import { useEffect, useState } from 'react';
import styles from './Filters.module.css';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import Filter from './Filter';
import { updateFilter } from '../../features/games/gamesSlice';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { IGameGenre, IGamePlatform } from '../../features/games/types';

const API_KEY = import.meta.env.VITE_RAWG_API_KEY;

export default function Filters() {
  const [genres, setGenres] = useState<Array<IGameGenre>>([]);
  const [platforms, setPlatforms] = useState<Array<IGamePlatform>>([]);

  const dispatch = useDispatch<AppDispatch>();

  // Cuando se monta el componente cargo todos los generos en el estado genres.
  useEffect(() => {
    async function getGenres() {
      try {
        const response = await fetch(
          `https://api.rawg.io/api/genres?key=${API_KEY}`
        );
        const jsonResponse = await response.json();

        setGenres(jsonResponse.results);
      } catch (error) {
        console.log(error);
      }
    }
    const fetchPlattforms = async () => {
      try {
        const response = await fetch(
          `https://api.rawg.io/api/platforms?key=${API_KEY}`
        );
        const jsonResponse = await response.json();

        setPlatforms(jsonResponse.results);
      } catch (error) {
        console.log(error);
      }
    };

    getGenres();
    fetchPlattforms();
  }, []);

  function handleFilterChange(filter: string, checked: string[]) {
    dispatch(updateFilter({ name: filter, values: checked }));
  }

  return (
    <div className={styles.filters}>
      {/* Genres */}
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          <Typography>Géneros</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Filter
            name='genres'
            options={genres.map((genre) => genre.name)}
            handleFilterChange={handleFilterChange}
          />
        </AccordionDetails>
      </Accordion>
      {/* Plattforms */}
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          <Typography>Plattforms</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Filter
            name='platforms'
            options={platforms.map((platform) => platform.name)}
            handleFilterChange={handleFilterChange}
          />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
