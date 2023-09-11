import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import SearchBar from '../components/SearchBar/SearchBar';
import NavBar from '../components/NavBar/NavBar';
import { AppDispatch, RootState } from './store';
import { clearError } from '../features/games/gamesSlice';

import Sidebar from '../components/Sidebar/Sidebar';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Dialog from '@mui/material/Dialog';
import CircularProgress from '@mui/material/CircularProgress';

function App() {
  const { loading, error } = useSelector((state: RootState) => state.games);
  const [openDrawer, setOpenDrawer] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

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
      <Box
        component='main'
        gridArea='content'
        sx={{ position: 'relative', overflow: 'auto' }}
      >
        {loading ? (
          <Box
            sx={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              display: 'grid',
              zIndex: 10,
            }}
          >
            <CircularProgress size={50} sx={{ placeSelf: 'center' }} />
          </Box>
        ) : null}
        <Outlet />
      </Box>

      <Drawer
        variant='temporary'
        open={openDrawer}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
      >
        <Sidebar />
      </Drawer>

      {/* Modal for errors */}
      <Dialog
        open={error ? true : false}
        title={error ?? undefined}
        onClose={() => {
          dispatch(clearError());
        }}
      />
    </Box>
  );
}

export default App;
