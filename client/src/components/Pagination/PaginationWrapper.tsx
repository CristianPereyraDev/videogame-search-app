import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { fetchPage } from '../../features/games/gamesSlice';
import { Pagination } from '@mui/material';
import React from 'react';

const PAGE_SIZE = import.meta.env.VITE_PAGE_SIZE;

export default function PaginationWrapper() {
  // Sync with global state.
  const { count, page } = useSelector((state: RootState) => state.games);
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(fetchPage(value));
  };

  return (
    <div>
      <Pagination
        count={Math.ceil(count / PAGE_SIZE)}
        page={page}
        onChange={handleChange}
      />
    </div>
  );
}
