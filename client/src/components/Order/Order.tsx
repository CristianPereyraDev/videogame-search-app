import styles from './Order.module.css';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { updateOrder } from '../../features/games/gamesSlice';
import { FormControl, InputLabel, MenuItem, Stack } from '@mui/material';
import { useEffect, useState } from 'react';

export default function Order() {
  const [field, setField] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  function handleOrderByChange(e: SelectChangeEvent) {
    setField(e.target.value);
  }

  function handleOrderChange(e: React.ChangeEvent<HTMLInputElement>) {
    setIsReversed(e.target.checked);
  }

  useEffect(() => {
    dispatch(updateOrder({ field, isReversed: isReversed }));
  }, [field, isReversed, dispatch]);

  return (
    <Stack direction='row'>
      {/* Order by select */}
      <FormControl sx={{ m: 1, minWidth: 120 }} size='small'>
        <InputLabel id='ordering-select-label'>Order by</InputLabel>
        <Select
          labelId='ordering-select-label'
          id='ordering-select'
          label='Order by'
          value={field}
          onChange={handleOrderByChange}
        >
          <MenuItem value=''>
            <em>None</em>
          </MenuItem>
          <MenuItem value='name'>Name</MenuItem>
          <MenuItem value='released'>Released</MenuItem>
          <MenuItem value='added'>Added</MenuItem>
          <MenuItem value='created'>Created</MenuItem>
          <MenuItem value='updated'>Updated</MenuItem>
          <MenuItem value='rating'>Rating</MenuItem>
          <MenuItem value='metacritic'>Metacritic</MenuItem>
        </Select>
      </FormControl>

      {/* Order method */}
      <div className={styles.orderMethod}>
        <span>Des.</span>
        <label className={styles.switch}>
          <input
            type='checkbox'
            name='order'
            id='order'
            //checked={order.method === OrderMethod.Ascendent}
            onChange={handleOrderChange}
          />
          <span className={`${styles.slider} ${styles.round}`}></span>
        </label>
        <span>Asc.</span>
      </div>
    </Stack>
  );
}
