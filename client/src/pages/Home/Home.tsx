import styles from './Home.module.css';
import Cards from '../../components/Cards/Cards';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNextPage } from '../../features/games/gamesSlice';
import { RootState, AppDispatch } from '../../app/store';
import { Stack, Typography } from '@mui/material';
import React from 'react';

export default function Home() {
  // Sync with global state
  const { videogames, count } = useSelector((state: RootState) => state.games);

  const dispatch = useDispatch<AppDispatch>();

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const containerHeight = event.currentTarget.clientHeight;
    const scrollHeight = event.currentTarget.scrollHeight;
    const scrollTop = event.currentTarget.scrollTop;
    const scrollPercent = (scrollTop + containerHeight) / scrollHeight;

    if (scrollPercent === 1) {
      dispatch(fetchNextPage());
    }
  };

  return (
    <div className={styles.homeContainer} onScroll={handleScroll}>
      {/* Top navbar */}
      <div className={styles.topNavbar}>
        <Stack direction='row' spacing={1} alignItems='center'>
          <Typography variant='body2'>Games count:</Typography>
          <Typography variant='body2' color='text.secondary'>
            {count}
          </Typography>
        </Stack>
      </div>

      {/* Cards */}
      <Cards videogames={videogames}></Cards>
    </div>
  );
}
