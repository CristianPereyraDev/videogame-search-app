import styles from './App.module.css';
import { Outlet } from 'react-router-dom';
import SearchBar from '../components/SearchBar/SearchBar';
import NavBar from '../components/NavBar/NavBar';
import Loading from '../components/Utils/Loading';
import { useSelector } from 'react-redux';
import { RootState } from './store';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Sidebar from '../components/Sidebar/Sidebar';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

function App() {
  const { loading } = useSelector((state: RootState) => state.games);
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleDrawerToggle = () => {
    setOpenDrawer(!openDrawer);
  };

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'grid',
        gridTemplateColumns: '1fr 4fr;',
        gridTemplateRows: 'auto 1fr;',
        gridTemplateAreas: {
          xs: `'header header' 'content content'`,
          md: `'header header' 'sidebar content'`,
        },
      }}
    >
      {/* HEADER */}
      <Box
        component='header'
        gridArea='header'
        sx={{
          height: '60px',
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          padding: '10px',
        }}
      >
        <IconButton
          onClick={handleDrawerToggle}
          sx={{ display: { md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <NavBar />
        <SearchBar />
      </Box>
      {/* SIDEBAR - CONTENT */}

      <Box
        component='aside'
        gridArea='sidebar'
        sx={{ display: { xs: 'none', md: 'block' }, overflow: 'auto' }}
      >
        <Sidebar />
      </Box>
      <Box component='main' gridArea='content' sx={{ overflow: 'auto' }}>
        {loading ? (
          <div className={styles.loading}>
            <Loading></Loading>
          </div>
        ) : (
          <Outlet />
        )}
      </Box>

      <Drawer
        variant='temporary'
        open={openDrawer}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
      >
        <Sidebar />
      </Drawer>
    </Box>
  );
}

export default App;
