import styles from "./SearchBar.module.css";

export default function SearchBar(props) {
  return (
    <div className={styles.SearchBarContainer}>
      <input type="search" />
      <button>Search</button>
    </div>
  );
}
