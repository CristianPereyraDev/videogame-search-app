import styles from "./Home.module.css";
import SearchBar from "../SearchBar/SearchBar";
import Cards from "../Cards/Cards";
import Pagination from "../Pagination/Pagination";
import Order from "../Order/Order";
import Filters from "../Filters/Filters";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { changePage } from "../../redux/actions/actions";

export default function Home(props) {
  const dispatch = useDispatch();

  // Cuando se monta el componente cargo la primer página de videojuegos sin filtros ni ordenamiento.
  useEffect(() => {
    dispatch(changePage("http://localhost:3001/videogames?page=1&pageSize=15"));
  }, []);

  return (
    <div className={styles.homeContainer}>
      {/* Top navbar */}
      <div className={styles.topNavbar}>
        <div className={styles.searchBar}>
          <SearchBar></SearchBar>
        </div>
        <div className={styles.orderBar}>
          <Order></Order>
        </div>
      </div>
      {/* Cards and filters */}
      <div className={styles.content}>
        <div className={styles.leftNavbar}>
          <Filters></Filters>
        </div>
        <div className={styles.cards}>
          <Cards></Cards>
        </div>
      </div>
      {/* Pagination */}
      <div className={styles.homeFooter}>
        <Pagination></Pagination>
      </div>
    </div>
  );
}
