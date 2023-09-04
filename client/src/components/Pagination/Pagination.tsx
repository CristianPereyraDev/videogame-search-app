import styles from './Pagination.module.css';
import { useDispatch, useSelector } from 'react-redux';
//import { changePage } from "../../redux/actions/actions";
import { AppDispatch, RootState } from '../../app/store';
import { fetchPage } from '../../features/games/gamesSlice';

export default function Pagination() {
  // Sync with global state.
  const { nextPage, prevPage } = useSelector((state: RootState) => state.games);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className={styles.pagination}>
      <button
        className={styles.prevButton}
        disabled={!prevPage}
        onClick={() => dispatch(fetchPage(1))}
      >
        Prev page
      </button>
      <button
        className={styles.nextButton}
        disabled={!nextPage}
        onClick={() => dispatch(fetchPage(1))}
      >
        Next page
      </button>
    </div>
  );
}
