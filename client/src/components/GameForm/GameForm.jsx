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
    messages: {
      name: "",
      description: "",
      platforms: "",
      image: "",
      released: "",
      rating: "",
      genres: "",
    },
    isValidate: false,
  });

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

    console.log("handleInputChange", name, value);

    setGameData(newGameData);
    // Validar solo el input que cambió
    setErrors({
      messages: {
        ...errors.messages,
        [name]: validators[name](newGameData[name]),
      },
      isValidate: validateGameForm(newGameData),
    });
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
      .map((elem) => elem.data);
    // Actualizo el estado gameData. Este estado es el que se va a enviar al servidor.
    const newGameData = { ...gameData, platforms: platformsChecked };
    setGameData(newGameData);
    //
    setErrors({
      messages: {
        ...errors.messages,
        platforms: validators.platforms(newGameData.platforms),
      },
      isValidate: validateGameForm(newGameData),
    });
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
    setErrors({
      messages: {
        ...errors.messages,
        genres: validators.genres(newGameData.genres),
      },
      isValidate: validateGameForm(newGameData),
    });
  };

  function handleImageChange(e) {
    const imageFile = e.target.files[0];
    const newGameData = { ...gameData, image: imageFile };
    setGameData({ ...gameData, image: imageFile });
    //
    setErrors({
      messages: {
        ...errors.messages,
        image: validators.image(newGameData.image),
      },
      isValidate: validateGameForm(newGameData),
    });
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
        <p className={styles.error}>
          {errors.messages.name && errors.messages.name}
        </p>
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
          {errors.messages.description && errors.messages.description}
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
        <p className={styles.error}>
          {errors.messages.image && errors.messages.image}
        </p>
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
        <p className={styles.error}>
          {errors.messages.rating && errors.messages.rating}
        </p>
      </div>
      {/* released input */}
      <div className={styles.dateInputContainer}>
        <label className={styles.inputLabel}>Fecha de lanzamiento</label>
        <input
          type="date"
          name="released"
          value={gameData.released}
          onChange={handleInputChange}
        />
        <p className={styles.error}>
          {errors.messages.released && errors.messages.released}
        </p>
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
        <p className={styles.error}>
          {errors.messages.platforms && errors.messages.platforms}
        </p>
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
        <p className={styles.error}>
          {errors.messages.genres && errors.messages.genres}
        </p>
      </div>
      <button
        type="submit"
        className={`btn ${styles.submit}`}
        disabled={!errors.isValidate}
      >
        Agregar Juego
      </button>
    </form>
  );
}
