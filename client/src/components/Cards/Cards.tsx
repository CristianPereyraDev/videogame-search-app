import { IGame } from '../../features/games/types';
import GameCard from '../Card/Card';
import styles from './Cards.module.css';

export default function Cards({ videogames }: { videogames: Array<IGame> }) {
  return (
    <div className={styles.cardsContainer}>
      {videogames.length > 0 ? (
        videogames.map((videogame) => (
          <GameCard
            key={videogame.id}
            id={videogame.id}
            name={videogame.name}
            image={videogame.image}
            genres={videogame.genres}
            released={videogame.released}
            platforms={[]}
            description={null}
            rating={null}
          />
        ))
      ) : (
        <div className={styles.emptyMessage}>Aquí no hay nada!</div>
      )}
    </div>
  );
}
