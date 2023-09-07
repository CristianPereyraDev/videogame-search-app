import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import { IGame } from '../../features/games/types';

export default function SearchResultList({ result }: { result: Array<IGame> }) {
  return (
    <List>
      {result.map((game) => (
        <ListItem key={game.id}>
          <ListItemAvatar>
            <Avatar src={game.image} variant='rounded'></Avatar>
          </ListItemAvatar>
          <ListItemText primary={game.name} secondary={game.released} />
        </ListItem>
      ))}
    </List>
  );
}
