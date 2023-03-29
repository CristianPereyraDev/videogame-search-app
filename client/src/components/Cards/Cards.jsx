import { useDispatch, useSelector } from "react-redux";
import Card from "../Card/Card";
import styles from "./Cards.module.css";

export default function Cards(props) {
  const { videogames } = useSelector((state) => {
    console.log("Estado nuevo!", state);
    return state;
  });
  return (
    <div className={styles.cardsContainer}>
      {videogames.map((videogame) => (
        <Card
          key={videogame.id}
          name={videogame.name}
          image={videogame.background_image}
          genres={videogame.genres}
        />
      ))}
    </div>
  );
}
