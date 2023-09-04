import styles from './Card.module.css';
import { Link } from 'react-router-dom';

export interface IGameGenre {
  id: string;
  name: string;
  slug: string;
  image: string;
  games_count: number;
}

export interface IGamePlatform {
  id: number;
  name: string;
  slug: string;
  image: string | null;
  year_end: number | null;
  year_start: number | null;
  games_count: number;
  image_background: string;
}

export interface IGame {
  id: string;
  name: string;
  description: string | null;
  released: string;
  image: string;
  rating: number | null;
  genres: Array<IGameGenre>;
  platforms: Array<IGamePlatform>;
}

export default function Card({ id, name, released, image, genres }: IGame) {
  return (
    <div className={styles.card}>
      <div className={styles.cardImage}>
        <img src={image} alt='' />
      </div>
      <div className={styles.cardText}>
        <div className={styles.cardTitle}>
          <Link to={`/detail/${id}`}>{name}</Link>
          <span>{released}</span>
        </div>
        <div className={styles.cardGenres}>
          <label>Géneros:</label>
          <div>
            {genres.map((genre, i) => (
              <span key={genre.id}>
                {i !== 0 ? ', ' : ''}
                {genre.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
