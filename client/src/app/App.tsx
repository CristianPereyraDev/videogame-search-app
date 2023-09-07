import styles from './App.module.css';
import { Outlet } from 'react-router-dom';
import Filters from '../components/Filters/Filters';
import SearchBar from '../components/SearchBar/SearchBar';
import NavBar from '../components/NavBar/NavBar';
import { Button, Stack, Switch, Typography } from '@mui/material';

const label = { inputProps: { 'aria-label': 'Filter' } };

function App() {
  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <NavBar />
        <SearchBar />
        <Stack direction='row' alignItems='center'>
          <Button>Fiters</Button>
          <Stack direction='row'>
            <Typography>OFF</Typography>
            <Switch {...label} size='small' />
            <Typography>ON</Typography>
          </Stack>
        </Stack>
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
