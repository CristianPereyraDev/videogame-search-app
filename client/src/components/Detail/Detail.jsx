import { Link, useParams } from "react-router-dom";
import styles from "./Detail.module.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Detail(props) {
  const { gameId } = useParams();
  const [videogame, setVideogame] = useState({});

  useEffect(() => {
    async function getVideogameDetail() {
      try {
        const response = await axios.get(
          `http://localhost:3001/videogames/${gameId}`
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
  }, [gameId]);

  return (
    <div>
      <Link to="/home">
        <button>Home</button>
      </Link>
      <div className={styles.detailContainer}>
        {/* Render name */}
        <h3>{videogame.name}</h3>
        {/* Render image */}
        <img src={videogame.image} alt={videogame.name} />
        {/* Render description, la cual puede venir como texto html("<p>Description text</p>") */}
        <div dangerouslySetInnerHTML={{ __html: videogame.description }} />
        {/* Render platforms */}
        <div>{/*videogame.platforms.map((platform) => "")*/}</div>
        {/* Render rating */}
        <div>Rating: {videogame.rating}</div>
        {/* Render released */}
        <div>Released: {videogame.released}</div>
        {/* Render genres */}
        <div>Genres:</div>
      </div>
    </div>
  );
}
