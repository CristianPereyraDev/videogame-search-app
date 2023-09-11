import { IGame } from '../../features/games/types';

import Grid from '@mui/material/Grid';

import GameCard from '../Card/Card';

export default function Cards({ videogames }: { videogames: Array<IGame> }) {
  return (
    <Grid
      container
      direction='row'
      spacing={2}
      columns={{ xs: 4, sm: 8, md: 12 }}
      justifyItems='center'
      style={{ marginTop: '5px', marginBottom: '5px' }}
    >
      {videogames.length > 0
        ? videogames.map((videogame) => (
            <Grid
              item
              xs={4}
              sm={4}
              md={4}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              key={videogame.id}
            >
              <GameCard game={videogame} />
            </Grid>
          ))
        : null}
    </Grid>
  );
}
