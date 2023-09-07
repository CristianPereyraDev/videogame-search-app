import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import SearchResultList from './SearchResultList';
import useDebounce from '../../hooks/use-debounce';
import { AppDispatch, RootState } from '../../app/store';
import {
  fetchGamesThunk,
  setError,
  setFindedGames,
} from '../../features/games/gamesSlice';

import styles from './SearchBar.module.css';
import { Box } from '@mui/material';
import { IGame } from '../../features/games/types';
import { filterQueryParams } from '../../utils/filters.util';

const API_KEY = import.meta.env.VITE_RAWG_API_KEY;

export default function SearchBar() {
  const [videogames, setVideogames] = useState<Array<IGame>>([]);
  const [count, setCount] = useState(0);
  const [search, setSearch] = useState<string>('');
  const [searchURL, setSearchURL] = useState('');
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const searchBarRef = useRef(null);

  // Custom hook to implement the search bar deboucing.
  const debouncedSearch = useDebounce(search, 500);

  // Get necessary state from Redux store
  const { filter, order } = useSelector((state: RootState) => state.games);
  const dispatch = useDispatch<AppDispatch>();

  const handleSearchChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!showResult) {
      setShowResult(true);
    }

    setSearch(e.target.value);
  };

  const handleSearchKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setShowResult(false);

      if (videogames.length > 0) {
        dispatch(setFindedGames({ count, videogames, apiURL: searchURL }));
      }
    }
  };

  useEffect(() => {
    //dispatch(fetchPage(1));
  }, [dispatch]);

  useEffect(() => {
    // Fetching the games that match search and filters
    async function fetchGames() {
      setLoading(true);

      const filtersQuery = filterQueryParams(filter);
      const URL = `https://api.rawg.io/api/games?key=${API_KEY}&search=${debouncedSearch}${filtersQuery}`;

      const response = await fetch(URL);

      if (!response.ok) {
        return dispatch(setError(`Api request error!`));
      }

      const jsonResponse = await response.json();

      const results: Array<{
        id: number;
        name: string;
        released: string;
        background_image: string;
        description: string;
        rating: number;
        genres: [];
        platforms: [];
      }> = jsonResponse.results;

      setCount(jsonResponse.count);
      setSearchURL(URL);

      setVideogames(
        results.map<IGame>((apiGame) => {
          const ret: IGame = {
            id: apiGame.id,
            name: apiGame.name,
            released: apiGame.released,
            image: apiGame.background_image,
            genres: [],
            platforms: [],
            description: apiGame.description,
            rating: apiGame.rating,
          };
          return ret;
        })
      );

      setLoading(false);
    }

    if (document.activeElement === searchBarRef.current) {
      fetchGames();
    } else {
      dispatch(fetchGamesThunk());
    }
  }, [debouncedSearch, filter, order, dispatch]);

  return (
    <section className={styles.search}>
      <input
        ref={searchBarRef}
        type='search'
        placeholder='Mario, GTA, ...'
        onChange={handleSearchChanged}
        onKeyUp={handleSearchKeyUp}
        className={styles.searchTerm}
        value={search}
      />
      {debouncedSearch && showResult ? (
        <Box sx={{ position: 'relative' }}>
          <Box
            sx={{
              position: 'absolute',
              top: '5px',
              boxSizing: 'border-box',
              width: '100%',
              maxHeight: '60vh',
              borderRadius: '16px',
              backgroundColor: 'background.paper',
              p: '10px',
              zIndex: '100',
              overflowY: 'auto',
            }}
          >
            {loading ? (
              <p>Loading...</p>
            ) : (
              <SearchResultList result={videogames} />
            )}
          </Box>
        </Box>
      ) : null}
    </section>
  );
}
