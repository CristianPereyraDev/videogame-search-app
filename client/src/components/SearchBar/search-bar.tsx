import { useEffect, useState } from 'react';
import { IGame } from '../Card/Card';
import SearchResultList from './search-result-list';
import useDebounce from '../../hooks/use-debounce';
//import { GamesDispatchContext } from '../contexts/games-contexts';

const APIKEY = 'cc981b284d414d8c8499e3e50c11debe';

export default function SearchBar() {
  const [games, setGames] = useState<Array<IGame>>([]);
  const [search, setSearch] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);

  // Custom hook to implement the search bar deboucing.
  const debouncedSearch = useDebounce(search, 500);

  //const dispatch = useContext(GamesDispatchContext);

  const handleSearchChanged = (e: any) => {
    if (!showResult) {
      setShowResult(true);
    }

    setSearch(e.target.value);
  };

  const handleSearchKeyUp = (e: any) => {
    if (e.key === 'Enter') {
      setShowResult(false);

      const result = [...games];
      if (result.length > 0) {
        //dispatch({ type: 'updateAll', payload: result });
      }
    }
  };

  useEffect(() => {
    // Fetching the games
    async function fetchGames() {
      setLoading(true);

      const data = await fetch(
        `https://api.rawg.io/api/games?key=${APIKEY}&search=${debouncedSearch}`
      ).then((res) => res.json());

      const results: Array<any> = data.results;

      setGames(
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
    <section className='relative'>
      <input
        type='search'
        placeholder='Mario, GTA, ...'
        onChange={handleSearchChanged}
        onKeyUp={handleSearchKeyUp}
        className='w-full'
        value={search}
      />
      {debouncedSearch && showResult ? (
        <section className='absolute w-full bg-red-700 px-3 py-3 overflow-y-auto'>
          {loading ? <p>Loading...</p> : <SearchResultList result={games} />}
        </section>
      ) : null}
    </section>
  );
}
