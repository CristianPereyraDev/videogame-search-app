import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { IGame } from '../Card/Card';
import SearchResultList from './SearchResultList';
import useDebounce from '../../hooks/use-debounce';
import { AppDispatch } from '../../app/store';
import { setFindedGames } from '../../features/games/gamesSlice';

import styles from './SearchBar.module.css';

const API_KEY = import.meta.env.VITE_RAWG_API_KEY;

export default function SearchBar() {
  const [videogames, setVideogames] = useState<Array<IGame>>([]);
  const [search, setSearch] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);

  // Custom hook to implement the search bar deboucing.
  const debouncedSearch = useDebounce(search, 500);

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

      const result = [...videogames];
      if (result.length > 0) {
        dispatch({ type: 'updateAll', payload: result });
        dispatch(setFindedGames({ search, videogames }));
      }
    }
  };

  useEffect(() => {
    // Fetching the games
    async function fetchGames() {
      setLoading(true);

      const data = await fetch(
        `https://api.rawg.io/api/games?key=${API_KEY}&search=${debouncedSearch}`
      ).then((res) => res.json());

      const results: Array<any> = data.results;

      setVideogames(
        results.map<IGame>((game) => {
          const ret: IGame = {
            id: game.id.toString(),
            name: game.name,
            released: game.released,
            image: game.background_image,
            genres: [],
            platforms: [],
            description: '',
            rating: 1,
          };
          return ret;
        })
      );

      setLoading(false);
    }

    fetchGames();
  }, [debouncedSearch]);

  return (
    <section className={styles.search}>
      <input
        type='search'
        placeholder='Mario, GTA, ...'
        onChange={handleSearchChanged}
        onKeyUp={handleSearchKeyUp}
        className={styles.searchTerm}
        value={search}
      />
      {debouncedSearch && showResult ? (
        <section className={styles.searchResultWrapper}>
          <div>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <SearchResultList result={videogames} />
            )}
          </div>
        </section>
      ) : null}
    </section>
  );
}
