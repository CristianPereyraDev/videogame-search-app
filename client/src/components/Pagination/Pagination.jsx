import styles from "./Pagination.module.css";

export default function Pagination(props) {
  return (
    <div className={styles.pagination}>
      <button>Prev</button>
      <button>Next</button>
    </div>
  );
}
