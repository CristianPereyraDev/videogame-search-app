import styles from './Home.module.css';
import SearchBar from '../../components/SearchBar/SearchBar';
import Cards from '../../components/Cards/Cards';
import Pagination from '../../components/Pagination/Pagination';
import Order from '../../components/Order/Order';
import Filters from '../../components/Filters/Filters';
import Loading from '../../components/Utils/Loading';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchPage,
  clearError,
  //filterAndSortVideogames,
  //searchByName,
} from '../../features/games/gamesSlice';
import Modal from '../../components/Utils/Modal';
import { RootState, AppDispatch } from '../../app/store';

export default function Home() {
  // Sync with global state
  const { loading, error, videogames /*filter, order*/ } = useSelector(
    (state: RootState) => state.games
  );

  const dispatch = useDispatch<AppDispatch>();

  // Cuando se monta el componente Home cargo la primer página de videojuegos sin filtros ni ordenamiento.
  useEffect(() => {
    dispatch(fetchPage(1));
  }, [dispatch]);

  function handleFilterChange(/*filter: any*/) {
    //dispatch(filterAndSortVideogames(filter, order));
  }

  function handleOrderChange(/*order: any*/) {
    //dispatch(filterAndSortVideogames(filter, order));
  }

  function handleSearch(/*search: string*/) {
    //dispatch(searchByName(search, filter, order));
  }

  return (
    <div className={styles.homeContainer}>
      {/* Top navbar */}
      <div className={styles.topNavbar}>
        <div className={styles.searchBar}>
          <SearchBar handlerSearch={handleSearch}></SearchBar>
        </div>
        <div className={styles.orderBar}>
          <Order handlerChange={handleOrderChange}></Order>
        </div>
      </div>
      {/* Cards and filters */}
      <div className={styles.content}>
        <div className={styles.leftNavbar}>
          <Filters handlerChange={handleFilterChange}></Filters>
        </div>
        <div className={styles.cards}>
          {/* Pagination */}
          {videogames.length > 0 ? <Pagination /> : null}
          {/* Cards component */}
          <Cards videogames={videogames}></Cards>
          {/* Pagination */}
          {videogames.length > 0 ? <Pagination /> : null}
        </div>
      </div>
      <div className={styles.homeFooter}></div>
      {/* Loading */}
      <div className={styles.loading}>
        {loading ? <Loading></Loading> : null}
      </div>
      {/* Modal for errors */}
      {error ? (
        <Modal
          title='Ooops!'
          isError={true}
          handleClose={() => {
            dispatch(clearError());
          }}
          message={error}
          action1=''
          action2=''
        />
      ) : null}
    </div>
  );
}