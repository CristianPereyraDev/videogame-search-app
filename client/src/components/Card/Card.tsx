import Card from '@mui/material/Card';
import {
  Button,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import { IGame } from '../../features/games/types';

export default function GameCard({ id, name, released, image, genres }: IGame) {
  return (
    <Card sx={{ maxWidth: 300 }}>
      <CardMedia component='img' height={194} image={image} alt={name} />
      <CardContent>
        <Typography variant='subtitle1'>{name}</Typography>
        <Typography variant='body2'>{released}</Typography>
        <Typography variant='body2'>
          {genres.map((genre, i) => (
            <span key={genre.id}>
              {i !== 0 ? ', ' : ''}
              {genre.name}
            </span>
          ))}
        </Typography>
      </CardContent>
      <CardActions>
        <Button href={`/details/${id}`} variant='contained'>
          Details
        </Button>
      </CardActions>
    </Card>
  );
}
