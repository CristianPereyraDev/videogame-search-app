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
import images from '../../Images/Images';

export default function GameCard({ game }: { game: IGame }) {
  return (
    <Card sx={{ maxWidth: 340, minWidth: 340 }}>
      <CardMedia
        component='img'
        height={194}
        image={game.image || images.default}
        alt={game.name}
        sx={{ objectFit: game.image ? 'cover' : 'scale-down' }}
      />
      <CardContent>
        <Stack
          direction={'row'}
          justifyContent='space-between'
          alignItems='center'
        >
          <Typography variant='h6'>{game.name}</Typography>
          <Typography variant='body2' color='text.secondary'>
            Rating: {game.rating.toString()}
          </Typography>
        </Stack>
        <Stack direction='row' justifyContent='space-between'>
          <Typography variant='body2' color='text.secondary'>
            Released:
          </Typography>
          <Typography variant='body2'>{game.released}</Typography>
        </Stack>
        <Stack direction='row' justifyContent='space-between'>
          <Typography variant='body2' color='text.secondary'>
            Genres:
          </Typography>
          <Typography variant='body2'>
            {game.genres.map((genre, i) => (
              <span key={genre.id}>
                {i !== 0 ? ', ' : ''}
                {genre.name}
              </span>
            ))}
          </Typography>
        </Stack>
      </CardContent>
      <CardActions>
        <Button href={`/details/${game.id}`} variant='contained' size='small'>
          Details
        </Button>
      </CardActions>
    </Card>
  );
}
