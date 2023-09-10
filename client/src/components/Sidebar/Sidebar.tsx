import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Order from '../Order/Order';
import Filters from '../Filters/Filters';
import Divider from '@mui/material/Divider';

export default function Sidebar() {
  return (
    <>
      <Stack spacing={2} divider={<Divider />}>
        <Stack>
          <Stack direction='row' alignItems='center'>
            <Button>Ordering</Button>
            <Stack direction='row'></Stack>
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
    </>
  );
}
