import styles from './App.module.css';
import { Outlet } from 'react-router-dom';
import Filters from '../components/Filters/Filters';
import SearchBar from '../components/SearchBar/SearchBar';
import NavBar from '../components/NavBar/NavBar';
import { Button, Divider, Stack } from '@mui/material';
import Order from '../components/Order/Order';

function App() {
  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <NavBar />
        <SearchBar />
      </header>
      <aside className={styles.sidebar}>
        <Stack spacing={2} divider={<Divider />}>
          <Stack>
            <Stack direction='row' alignItems='center'>
              <Button>Ordering</Button>
              <Stack direction='row'>
                {/* <Typography>OFF</Typography>
                <Switch {...label} size='small' />
                <Typography>ON</Typography> */}
              </Stack>
            </Stack>
            <Order></Order>
          </Stack>

          <Stack>
            <Stack direction='row' alignItems='center'>
              <Button>Fiters</Button>
              <Stack direction='row'>
                {/* <Typography>OFF</Typography>
                <Switch {...label} size='small' />
                <Typography>ON</Typography> */}
              </Stack>
            </Stack>
            <Filters></Filters>
          </Stack>
        </Stack>
      </aside>
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
