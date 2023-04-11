import { Link, useParams, useSearchParams } from "react-router-dom";
import styles from "./Detail.module.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Detail(props) {
  const { gameId } = useParams();
  let [searchParams, setSearchParams] = useSearchParams();
  const [videogame, setVideogame] = useState({ platforms: [], genres: [] });

  useEffect(() => {
    console.log("useEfect from detail");
    async function getVideogameDetail() {
      try {
        const response = await axios.get(
          `http://localhost:3001/videogames/${gameId}?fromDb=${searchParams.get(
            "fromDb"
          )}`
        );
        if (response.data.name) {
          setVideogame(response.data);
        } else {
          window.alert("No existe el videogame");
        }
      } catch (error) {
        setVideogame({});
        window.alert(error.message);
      }
    }
    getVideogameDetail();
  }, [gameId, searchParams]);

  return (
    <div>
      <div className={styles.detailContainer}>
        {/* Render name */}
        <div className={styles.title}>{videogame.name}</div>
        {/* Render image */}
        <div className={styles.image}>
          <img src={videogame.image} alt={videogame.name} />
        </div>
        {/* Render description, la cual puede venir como texto html("<p>Description text</p>") */}
        <div
          className={styles.description}
          dangerouslySetInnerHTML={{ __html: videogame.description }}
        />
        {/* Render rating */}
        <div className={styles.rating}>
          <label>Rating:</label> {videogame.rating}
        </div>
        {/* Render released */}
        <div className={styles.released}>
          <label>Released:</label> {videogame.released}
        </div>
        {/* Render platforms */}
        <div className={styles.platforms}>
          <label>Platforms:</label>
          {videogame.platforms.map((platform, i) => (
            <span key={i}>{`${i !== 0 ? "," : ""} ${platform}`}</span>
          ))}
        </div>
        {/* Render genres */}
        <div className={styles.genres}>
          <label>Genres:</label>
          {videogame.genres.map((genre, i) => (
            <span key={genre.id}>{`${i !== 0 ? "," : ""} ${genre.name}`}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
