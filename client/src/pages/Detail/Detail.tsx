import { useParams, useSearchParams } from 'react-router-dom';
import styles from './Detail.module.css';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { IGame } from '../../features/games/types';

export default function Detail() {
  const { gameId } = useParams();
  const [searchParams /*, setSearchParams*/] = useSearchParams();
  const [videogame, setVideogame] = useState<IGame | null | undefined>(null);

  const { videogames } = useSelector((state: RootState) => state.games);

  useEffect(() => {
    setVideogame(videogames.find((game) => game.id === Number(gameId)));
  }, [gameId, searchParams, videogames]);

  return (
    <div>
      <div className={styles.detailContainer}>
        {/* Render name */}
        <div className={styles.title}>{videogame ? videogame.name : ''}</div>
        {/* Render image */}
        <div className={styles.image}>
          <img
            src={videogame ? videogame.image : ''}
            alt={videogame ? videogame.name : ''}
          />
        </div>
        {/* Render description, la cual puede venir como texto html("<p>Description text</p>") */}
        <div
          className={styles.description}
          dangerouslySetInnerHTML={{
            __html: videogame ? videogame.description || '' : '',
          }}
        />
        {/* Render rating */}
        <div className={styles.rating}>
          <label>Rating:</label> {videogame ? videogame.rating : ''}
        </div>
        {/* Render released */}
        <div className={styles.released}>
          <label>Released:</label> {videogame ? videogame.released : ''}
        </div>
        {/* Render platforms */}
        <div className={styles.platforms}>
          <label>Platforms:</label>
          {videogame
            ? videogame.platforms.map((platform, i) => (
                <span key={i}>{`${i !== 0 ? ',' : ''} ${platform.name}`}</span>
              ))
            : null}
        </div>
        {/* Render genres */}
        <div className={styles.genres}>
          <label>Genres:</label>
          {videogame
            ? videogame.genres.map((genre, i) => (
                <span key={genre.id}>{`${i !== 0 ? ',' : ''} ${
                  genre.name
                }`}</span>
              ))
            : null}
        </div>
      </div>
    </div>
  );
}
