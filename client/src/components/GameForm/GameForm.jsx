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
    image: null,
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
  const [isValidate, setIsValidate] = useState(false);

  // Use effets
  useEffect(() => {
    async function getPlatformsAndGenres() {
      // Get platforms and genres in parallel
      const [platformsRes, genresRes] = await Promise.all([
        axios.get("http://localhost:3001/platforms"),
        axios.get("http://localhost:3001/genres"),
      ]);
      // Set local states
      setPlatforms(makeUncheckedPlatforms(platformsRes.data));
      setGenres(makeUncheckedGenres(genresRes.data));
    }
    getPlatformsAndGenres();
  }, []);

  // Este handler hace una última verificación antes de enviar el formulario.
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Create a FormData instance for send the data as multipart/formdata
    if (validateGameForm(gameData)) {
      console.log("enviando al server...", gameData);
      try {
        const response = await axios.post(
          "http://localhost:3001/videogames",
          {
            ...gameData,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } catch (error) {
        window.alert(error.message);
      }
    } else {
      console.log("No se puede enviar el formulando si hay errores");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newGameData = { ...gameData, [name]: value };
    setGameData(newGameData);
    // Validar solo el input que cambió
    setErrors({ ...errors, [name]: validators[name](newGameData) });
    setIsValidate(validateGameForm(newGameData));
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
    const newGameData = { ...gameData, platforms: platformsChecked };
    setGameData(newGameData);
    //
    setErrors({ ...errors, platforms: validators.platforms(newGameData) });
    setIsValidate(validateGameForm(newGameData));
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
    const newGameData = { ...gameData, genres: genresChecked };
    setGameData(newGameData);
    //
    setErrors({ ...errors, genres: validators.genres(newGameData) });
    setIsValidate(validateGameForm(newGameData));
  };

  function handleImageChange(e) {
    const imageFile = e.target.files[0];
    setGameData({ ...gameData, image: imageFile });
  }

  // Render
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.title}>Agregar Videojuego</div>
      {/* name input */}
      <div className={`${styles.inputTextContainer} ${styles.ic1}`}>
        <label className={styles.inputLabel}>Nombre</label>
        <input
          type="text"
          name="name"
          value={gameData.name}
          onChange={handleInputChange}
          className={styles.input}
        />
        <p className={styles.error}>{errors.name && errors.name}</p>
      </div>
      {/* description input */}
      <div className={`${styles.inputTextContainer}`}>
        <label className={styles.inputLabel}>Descripción</label>
        <input
          type="text"
          name="description"
          value={gameData.description}
          onChange={handleInputChange}
          className={styles.input}
        />
        <p className={styles.error}>
          {errors.description && errors.description}
        </p>
      </div>
      {/* image input */}
      <div className={`${styles.inputTextContainer} ${styles.ic1}`}>
        <label className={styles.inputLabel}>Imagen</label>
        <input
          type="file"
          name="image"
          onChange={handleImageChange}
          className={styles.input}
        />
        <p className={styles.error}>{errors.image && errors.image}</p>
      </div>
      {/* rating input */}
      <div className={`${styles.inputTextContainer} ${styles.ic1}`}>
        <label className={styles.inputLabel}>Rating</label>
        <input
          type="text"
          name="rating"
          value={gameData.rating}
          onChange={handleInputChange}
          className={styles.input}
        />
        <p className={styles.error}>{errors.rating && errors.rating}</p>
      </div>
      {/* released input */}
      <div className={styles.dateInputContainer}>
        <label className={styles.inputLabel}>Fecha de lanzamiento</label>
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
                {platforms[platformId].data}
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
      <button
        type="submit"
        className={`btn ${styles.submit}`}
        disabled={!isValidate}
      >
        Agregar Juego
      </button>
    </form>
  );
}
