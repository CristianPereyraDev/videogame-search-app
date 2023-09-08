import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { updateOrder } from '../../features/games/gamesSlice';
import {
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Stack,
  Switch,
} from '@mui/material';
import { useEffect, useState } from 'react';

export default function Order() {
  const [field, setField] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  function handleOrderByChange(e: SelectChangeEvent) {
    setField(e.target.value);
  }

  function handleReverseChange(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e.target.checked);
    setIsReversed(e.target.checked);
  }

  useEffect(() => {
    if (field) {
      dispatch(updateOrder({ field, isReversed: isReversed }));
    } else {
      dispatch(updateOrder(null));
    }
  }, [field, isReversed, dispatch]);

  return (
    <Stack direction='row' alignItems='center'>
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
      <FormControlLabel
        value='reverse'
        label='Reverse'
        control={
          <Switch
            checked={isReversed}
            onChange={handleReverseChange}
            inputProps={{ 'aria-label': 'controlled' }}
            size='small'
          />
        }
        labelPlacement='top'
      />
    </Stack>
  );
}
