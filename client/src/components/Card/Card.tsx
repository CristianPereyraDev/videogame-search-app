import Card from '@mui/material/Card';
import {
  Button,
  CardActions,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from '@mui/material';
import { IGame } from '../../features/games/types';

export default function GameCard({ game }: { game: IGame }) {
  return (
    <Card sx={{ maxWidth: 340 }}>
      <CardMedia
        component='img'
        height={194}
        image={game.image}
        alt={game.name}
      />
      <CardContent>
        <Stack
          direction={'row'}
          justifyContent='space-between'
          alignItems='center'
        >
          <Typography variant='subtitle1'>{game.name}</Typography>
          <Typography variant='body2'>
            Rating: {game.rating ? game.rating.toString() : '-'}
          </Typography>
        </Stack>
        <Typography variant='body2'>{game.released}</Typography>
        <Typography variant='body2'>
          {game.genres.map((genre, i) => (
            <span key={genre.id}>
              {i !== 0 ? ', ' : ''}
              {genre.name}
            </span>
          ))}
        </Typography>
      </CardContent>
      <CardActions>
        <Button href={`/details/${game.id}`} variant='contained'>
          Details
        </Button>
      </CardActions>
    </Card>
  );
}
