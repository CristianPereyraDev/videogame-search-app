import Card from "../Card/Card";
import styles from "./Cards.module.css";
import { useSelector } from "react-redux";

export default function Cards({ videogames }) {
  // El estado global "loading" me dice si se estan cargando cards desde el back.
  const { loading } = useSelector((state) => state);
  return (
    <div className={styles.container}>
      <div className={styles.cardsContainer}>
        {videogames.map((videogame) => (
          <Card
            key={videogame.id}
            id={videogame.id}
            name={videogame.name}
            image={videogame.image}
            genres={videogame.genres}
            fromDb={!!videogame.fromDb}
          />
        ))}
      </div>
    </div>
  );
}
