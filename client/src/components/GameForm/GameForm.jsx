import { useEffect, useState } from "react";
import { validateLoginForm } from "./validation";
import axios from "axios";
import styles from "./GameForm.module.css";

export default function GameForm(props) {
  // States
  const [platforms, setPlatforms] = useState([]);
  const [genres, setGenres] = useState([]);
  const [gameData, setGameData] = useState({
    name: "",
    description: "",
    platforms: [],
    image: "",
    released: "",
    rating: 1,
    genres: [],
  });
  const [errors, setErrors] = useState({
    name: "",
    description: "",
    platforms: "",
    image: "",
    released: "2018-07-22",
    rating: "",
    genres: "",
  });
  // Use effets
  useEffect(() => {
    async function getPlatformsAndGenres() {
      let response = await axios.get("http://localhost:3001/platforms");
      setPlatforms(response.data.platforms);
      response = await axios.get("http://localhost:3001/genres");
      setGenres(response.data);
    }
    getPlatformsAndGenres();
  }, []);
  // Handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newGameData = { ...gameData, [name]: value };
    setGameData(newGameData);
    //setErrors(validateLoginForm(newGameData));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // La función login viene por props.
    props.login(gameData);
  };

  // Render
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.title}>
        <h2>Agregar Videojuego</h2>
      </div>
      {/* name input */}
      <div className={`${styles.inputContainer} ${styles.ic1}`}>
        <input
          type="text"
          name="name"
          value={gameData.name}
          onChange={handleInputChange}
          placeholder=" "
          className={styles.input}
        />
        <div className={`${styles.cut}`}></div>
        <label className={styles.placeholder}>Name</label>
        <p className={styles.error}>{errors.name && errors.name}</p>
      </div>
      {/* description input */}
      <div className={`${styles.inputContainer} ${styles.ic1}`}>
        <input
          type="text"
          name="description"
          value={gameData.description}
          onChange={handleInputChange}
          placeholder=" "
          className={styles.input}
        />
        <div className={`${styles.cut}`}></div>
        <label className={styles.placeholder}>Description</label>
        <p className={styles.error}>
          {errors.description && errors.description}
        </p>
      </div>
      {/* platforms input */}
      <div className={`${styles.inputContainer} ${styles.ic1}`}>
        {platforms.map((platform) => (
          <div key={platform.id} className={styles.checkContainer}>
            <label>
              <input
                type="checkbox"
                name="platforms"
                value={platform.name}
                onChange={handleInputChange}
                className={styles.input}
              />
              {platform.name}
            </label>
          </div>
        ))}
        <div className={`${styles.cut}`}></div>
        <label className={styles.placeholder}>Platforms</label>
        <p className={styles.error}>{errors.platforms && errors.platforms}</p>
      </div>
      {/* image input */}
      <div className={`${styles.inputContainer} ${styles.ic1}`}>
        <input
          type="text"
          name="image"
          value={gameData.image}
          onChange={handleInputChange}
          placeholder=" "
          className={styles.input}
        />
        <div className={`${styles.cut}`}></div>
        <label className={styles.placeholder}>Image</label>
        <p className={styles.error}>{errors.image && errors.image}</p>
      </div>
      {/* released input */}
      <div className={`${styles.inputContainer} ${styles.ic1}`}>
        <input
          type="date"
          name="released"
          value={gameData.released}
          onChange={handleInputChange}
          placeholder=" "
          className={styles.input}
        />
        <div className={`${styles.cut}`}></div>
        <label className={styles.placeholder}>Fecha de lanzamiento</label>
        <p className={styles.error}>{errors.released && errors.released}</p>
      </div>
      {/* rating input */}
      <div className={`${styles.inputContainer} ${styles.ic1}`}>
        <input
          type="number"
          name="rating"
          value={gameData.rating}
          onChange={handleInputChange}
          placeholder=" "
          className={styles.input}
        />
        <div className={`${styles.cut}`}></div>
        <label className={styles.placeholder}>Rating</label>
        <p className={styles.error}>{errors.rating && errors.rating}</p>
      </div>
      {/* Genres input */}
      <div className={`${styles.inputContainer} ${styles.ic1}`}>
        {genres.map((genre) => (
          <div key={genre.id} className={styles.checkContainer}>
            <label>
              <input
                type="checkbox"
                name="platforms"
                value={genre.name}
                onChange={handleInputChange}
                className={styles.input}
              />
              {genre.name}
            </label>
          </div>
        ))}
        <div className={`${styles.cut}`}></div>
        <label className={styles.placeholder}>Platforms</label>
        <p className={styles.error}>{errors.genres && errors.genres}</p>
      </div>
      <button type="submit" className={`btn ${styles.submit}`}>
        Agregar Juego
      </button>
    </form>
  );
}
