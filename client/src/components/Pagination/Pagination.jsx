import styles from "./Pagination.module.css";
import { useDispatch, useSelector } from "react-redux";
import { changePage } from "../../redux/actions/actions";

export default function Pagination(props) {
  // Sync with global state.
  const { nextPage, prevPage } = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <div className={styles.pagination}>
      <button
        disabled={!prevPage}
        onClick={() => dispatch(changePage(prevPage))}
      >
        Prev page
      </button>
      <button
        disabled={!nextPage}
        onClick={() => dispatch(changePage(nextPage))}
      >
        Next page
      </button>
    </div>
  );
}
