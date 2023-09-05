import styles from './App.module.css';
import { Outlet } from 'react-router-dom';
import Filters from '../components/Filters/Filters';
import SearchBar from '../components/SearchBar/SearchBar';

function App() {
  const handleFilterChange = (/*filter: any*/) => {
    //dispatch(filterAndSortVideogames(filter, order));
  };

  const handleSearch = (/*search: string*/) => {
    //dispatch(searchByName(search, filter, order));
  };

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.searchBar}>
          <SearchBar handlerSearch={handleSearch}></SearchBar>
        </div>
        {/* <NavBar /> */}
      </header>
      <aside className={styles.sidebar}>
        <nav>
          <div className={styles.leftNavbar}>
            <Filters handlerChange={handleFilterChange}></Filters>
          </div>
        </nav>
      </aside>
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
