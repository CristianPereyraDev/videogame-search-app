import styles from "./Home.module.css";
import SearchBar from "../SearchBar/SearchBar";
import Cards from "../Cards/Cards";
import Pagination from "../Pagination/Pagination";
import Order from "../Order/Order";
import Filters from "../Filters/Filters";
import Loading from "../Utils/Loading";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changePage,
  clearError,
  filterAndSortVideogames,
} from "../../redux/actions/actions";
import Modal from "../Utils/Modal";

export default function Home(props) {
  // Sync with global state
  const { loading, error, videogames, filter, order } = useSelector(
    (state) => state
  );
  // Local states
  const [showError, setShowError] = useState(true);

  const dispatch = useDispatch();

  // Cuando se monta el componente Home cargo la primer página de videojuegos sin filtros ni ordenamiento.
  useEffect(() => {
    dispatch(changePage("http://localhost:3001/videogames?page=1&pageSize=15"));
  }, []);

  function handleFilterChange(filter) {
    dispatch(filterAndSortVideogames(filter, order));
  }

  function handleOrderChange(order) {
    dispatch(filterAndSortVideogames(filter, order));
  }

  return (
    <div className={styles.homeContainer}>
      {/* Loading */}
      <div className={styles.loading}>
        {loading ? <Loading></Loading> : null}
      </div>
      {/* Modal for errors */}
      {error ? (
        <Modal
          handleClose={() => {
            dispatch(clearError());
          }}
          message={error.message}
        />
      ) : null}
      {/* Top navbar */}
      <div className={styles.topNavbar}>
        <div className={styles.searchBar}>
          <SearchBar></SearchBar>
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
          <Pagination></Pagination>
          <Cards videogames={videogames}></Cards>
          {/* Pagination */}
          <Pagination></Pagination>
        </div>
      </div>
      <div className={styles.homeFooter}></div>
    </div>
  );
}
