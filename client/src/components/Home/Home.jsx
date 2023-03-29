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
  useEffect(() => {
    dispatch(changePage("http://localhost:3001/videogames?page=1&pageSize=15"));
  });
  return (
    <div className={styles.homeContainer}>
      <div className={styles.homeNavbar}>
        <div className={styles.searchBar}>
          <SearchBar></SearchBar>
        </div>
        <div className={styles.orderBar}>
          <Order></Order>
        </div>
        <div className={styles.filterBar}>
          <Filters></Filters>
        </div>
      </div>
      <div className={styles.cardsContainer}>
        <Cards></Cards>
      </div>
      <div className={styles.paginationContainer}>
        <Pagination></Pagination>
      </div>
    </div>
  );
}
