import styles from './App.module.css';
import { Outlet } from 'react-router-dom';
import Filters from '../components/Filters/Filters';
import SearchBar from '../components/SearchBar/SearchBar';
import NavBar from '../components/NavBar/NavBar';

function App() {
  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <NavBar />
        <SearchBar />
      </header>
      <aside className={styles.sidebar}>
        <Filters></Filters>
      </aside>
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
