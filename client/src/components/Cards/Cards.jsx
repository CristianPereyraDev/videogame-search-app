import { useSelector } from "react-redux";
import Card from "../Card/Card";
import styles from "./Cards.module.css";

export default function Cards(props) {
  // Listens the global store for changes
  const { videogames } = useSelector((state) => {
    return state;
  });

  return (
    <div className={styles.container}>
      {videogames.map((videogame) => (
        <Card
          key={videogame.id}
          id={videogame.id}
          name={videogame.name}
          image={videogame.background_image}
          genres={videogame.genres}
        />
      ))}
    </div>
  );
}
