import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./GameForm.module.css";
import { validateGameForm, validators } from "./validation";
import { formatDate } from "../../utils/date.util";
import {
  makeUncheckedPlatforms,
  makeUncheckedGenres,
} from "../../utils/form.util";

export default function GameForm(props) {
  // States
  const [platforms, setPlatforms] = useState({});
  const [genres, setGenres] = useState({});
  const [gameData, setGameData] = useState({
    name: "",
    description: "",
    platforms: [], // array of names
    image: "",
    released: formatDate(new Date()),
    rating: "1",
    genres: [], // array of ids
  });
  const [errors, setErrors] = useState({
    name: "",
    description: "",
    platforms: "",
    image: "",
    released: "",
    rating: "",
    genres: "",
  });
  // Use effets
  useEffect(() => {
    async function getPlatformsAndGenres() {
      // Get platforms and set platfroms state
      let response = await axios.get("http://localhost:3001/platforms");
      setPlatforms(makeUncheckedPlatforms(response.data.platforms));
      response = await axios.get("http://localhost:3001/genres");
      setGenres(makeUncheckedGenres(response.data));
    }
    getPlatformsAndGenres();
  }, []);
  // Handlers. Los grupos de checkbox lo manejan otros handlers (platforms, genres).
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newGameData = { ...gameData, [name]: value };
    setGameData(newGameData);
    // Validar solo el input que cambió
    setErrors({ ...errors, [name]: validators[name](newGameData) });
  };

  const handlePlatformCheckChange = (e) => {
    const { id, checked } = e.target;
    // Actualizo el estado platforms
    const newPlatformsState = {
      ...platforms,
      [id]: { ...platforms[id], checked: checked },
    };
    setPlatforms(newPlatformsState);
    // Obtengo la lista de nombres checkeados y solo guardo el nombre.
    const platformsChecked = Object.values(newPlatformsState)
      .filter((elem) => elem.checked)
      .map((elem) => elem.data.name);
    // Actualizo el estado gameData. Este estado es el que se va a enviar al servidor.
    const newGameDataState = { ...gameData, platforms: platformsChecked };
    setGameData(newGameDataState);
    //
    setErrors({ ...errors, platforms: validators.platforms(newGameDataState) });
  };

  const handleGenreCheckChange = (e) => {
    const { id, checked } = e.target;
    // Actualizo el estado genres
    const newGenresState = {
      ...genres,
      [id]: { ...genres[id], checked: checked },
    };
    setGenres(newGenresState);
    // Obtengo la lista de genres checkeados y guardo solo el id
    const genresChecked = Object.values(newGenresState)
      .filter((elem) => elem.checked)
      .map((elem) => elem.data.id);
    // Actualizo el estado gameData. Este estado es el que se va a enviar al servidor.
    const newGameDataState = { ...gameData, genres: genresChecked };
    setGameData(newGameDataState);
    //
    setErrors({ ...errors, genres: validators.genres(newGameDataState) });
  };

  // Este handler hace una última verificación antes de enviar el formulario.
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateGameForm(gameData)) {
      console.log("enviando al server...", gameData);
      try {
        const response = await axios.post(
          "http://localhost:3001/videogames",
          gameData
        );
      } catch (error) {}
    } else {
      console.log("No se puede enviar el formulando si hay errores");
    }
  };

  // Render
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.title}>Agregar Videojuego</div>
      {/* name input */}
      <div className={`${styles.inputTextContainer} ${styles.ic1}`}>
        <input
          type="text"
          name="name"
          value={gameData.name}
          onChange={handleInputChange}
          placeholder=" "
          className={styles.input}
        />
        <label className={styles.placeholder}>Name</label>
        <p className={styles.error}>{errors.name && errors.name}</p>
      </div>
      {/* description input */}
      <div className={`${styles.inputTextContainer} ${styles.ic1}`}>
        <input
          type="text"
          name="description"
          value={gameData.description}
          onChange={handleInputChange}
          placeholder=" "
          className={styles.input}
        />
        <label className={styles.placeholder}>Description</label>
        <p className={styles.error}>
          {errors.description && errors.description}
        </p>
      </div>
      {/* image input */}
      <div className={`${styles.inputTextContainer} ${styles.ic1}`}>
        <input
          type="text"
          name="image"
          value={gameData.image}
          onChange={handleInputChange}
          placeholder=" "
          className={styles.input}
        />
        <label className={styles.placeholder}>Image</label>
        <p className={styles.error}>{errors.image && errors.image}</p>
      </div>
      {/* rating input */}
      <div className={`${styles.inputTextContainer} ${styles.ic1}`}>
        <input
          type="text"
          name="rating"
          value={gameData.rating}
          onChange={handleInputChange}
          placeholder=" "
          className={styles.input}
        />
        <label className={styles.placeholder}>Rating</label>
        <p className={styles.error}>{errors.rating && errors.rating}</p>
      </div>
      {/* released input */}
      <div className={`${styles.ic1}`}>
        <div>
          <label className={""}>Fecha de lanzamiento</label>
        </div>
        <input
          type="date"
          name="released"
          value={gameData.released}
          onChange={handleInputChange}
          placeholder=" "
          className={styles.input}
        />
        <p className={styles.error}>{errors.released && errors.released}</p>
      </div>
      {/* platforms input */}
      <div className={`${styles.inputContainerDropdown} ${styles.ic1}`}>
        <input type="checkbox" id="platforms_toggle" />
        <label htmlFor="platforms_toggle">Elegir Plataformas</label>
        <div className={styles.dropdownContent}>
          {Object.keys(platforms).map((platformId) => (
            <div key={platformId} className={styles.checkContainer}>
              <label>
                <input
                  type="checkbox"
                  id={platformId}
                  name={platformId}
                  checked={platforms[platformId].checked}
                  onChange={handlePlatformCheckChange}
                  className={styles.input}
                />
                {platforms[platformId].data.name}
              </label>
            </div>
          ))}
        </div>
        <p className={styles.error}>{errors.platforms && errors.platforms}</p>
      </div>
      {/* Genres input */}
      <div className={`${styles.inputContainerDropdown} ${styles.ic1}`}>
        <input type="checkbox" id="genres_toggle" />
        <label htmlFor="genres_toggle">Elegir Géneros</label>
        <div className={styles.dropdownContent}>
          {Object.keys(genres).map((genreId) => (
            <div key={genreId} className={styles.checkContainer}>
              <label>
                <input
                  type="checkbox"
                  id={genreId}
                  name={genreId}
                  checked={genres[genreId].checked}
                  onChange={handleGenreCheckChange}
                  className={styles.input}
                />
                {genres[genreId].data.name}
              </label>
            </div>
          ))}
        </div>
        <div className={`${styles.cut}`}></div>
        <p className={styles.error}>{errors.genres && errors.genres}</p>
      </div>
      <button type="submit" className={`btn ${styles.submit}`}>
        Agregar Juego
      </button>
    </form>
  );
}
