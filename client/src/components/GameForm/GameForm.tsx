import React, { useEffect, useState } from 'react';
//import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './GameForm.module.css';
//import { validateGameForm, validators } from './validation';
import {
  platformsToCheckboxMap,
  genresToCheckboxMap,
  DefaultGameData,
  //DefaultErrors,
  PlatformCkeckboxMap,
  GenreCkeckboxMap,
} from '../../utils/form.util';
//import Modal from '../Utils/Modal';
//import { IGameGenre, IGamePlatform } from '../Card/Card';

export default function GameForm() {
  // States
  const [platforms, setPlatforms] = useState<PlatformCkeckboxMap>(new Map());
  const [genres, setGenres] = useState<GenreCkeckboxMap>(new Map());
  const [gameData, setGameData] = useState(DefaultGameData);
  //const [errors, setErrors] = useState(null);
  //const [newGame, setNewGame] = useState(null);

  //const navigate = useNavigate();

  // Use effets
  useEffect(() => {
    //setErrors(null);
    async function getPlatformsAndGenres() {
      // Get platforms and genres in parallel
      const [platformsRes, genresRes] = await Promise.all([
        axios.get('http://localhost:3001/platforms'),
        axios.get('http://localhost:3001/genres'),
      ]);
      // Set local states
      setPlatforms(platformsToCheckboxMap(platformsRes.data));
      setGenres(genresToCheckboxMap(genresRes.data));
    }
    getPlatformsAndGenres();
  }, []);

  // Este handler hace una última verificación antes de enviar el formulario.
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Create a FormData instance for send the data as multipart/formdata
    // if (validateGameForm(gameData)) {
    //   console.log('enviando al server...', gameData);
    //   try {
    //     const response = await axios.post(
    //       'http://localhost:3001/videogames',
    //       {
    //         ...gameData,
    //         image: gameData.image.file,
    //       },
    //       {
    //         headers: {
    //           'Content-Type': 'multipart/form-data',
    //         },
    //       }
    //     );
    //     // Set newGame state
    //     setNewGame(response.data.newGame);
    //     // Clear form
    //     platforms.forEach((value) => (value.checked = false));

    //     setGenres(
    //       genresToCheckboxMap(Object.entries(genres).map((e) => e[1].data))
    //     );

    //     setGameData(DefaultGameData);

    //     setErrors(DefaultErrors);
    //   } catch (error: any) {
    //     window.alert(error.message);
    //   }
    // } else {
    //   window.alert('No se puede enviar el formulario si hay errores');
    // }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newGameData = { ...gameData, [name]: value };

    setGameData(newGameData);
    // Validar solo el input que cambió
    // setErrors({
    //   messages: {
    //     ...errors.messages,
    //     [name]: validators[name](newGameData[name]),
    //   },
    //   isValidate: validateGameForm(newGameData),
    // });
  };

  const handlePlatformCheckChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { id, checked } = e.target;
    // Actualizo el estado platforms
    const newPlatformsState: PlatformCkeckboxMap = {
      ...platforms,
      [id]: { ...platforms.get(id), checked: checked },
    };
    setPlatforms(newPlatformsState);
    // Obtengo la lista de nombres checkeados y solo guardo el nombre.
    // const platformsChecked = Object.values(newPlatformsState)
    //   .filter((elem) => elem.checked)
    //   .map((elem) => elem.data);
    // Actualizo el estado gameData. Este estado es el que se va a enviar al servidor.
    //const newGameData = { ...gameData, platforms: platformsChecked };
    //setGameData(newGameData);
    //
    // setErrors({
    //   messages: {
    //     ...errors.messages,
    //     platforms: validators.platforms(newGameData.platforms),
    //   },
    //   isValidate: validateGameForm(newGameData),
    // });
  };

  const handleGenreCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    // const { id, checked } = e.target;
    // // Actualizo el estado genres
    // const newGenresState = {
    //   ...genres,
    //   [id]: { ...genres[id], checked: checked },
    // };
    // setGenres(newGenresState);
    // // Obtengo la lista de genres checkeados y guardo solo el id
    // const genresChecked = Object.values(newGenresState)
    //   .filter((elem) => elem.checked)
    //   .map((elem) => elem.data.id);
    // // Actualizo el estado gameData. Este estado es el que se va a enviar al servidor.
    // const newGameData = { ...gameData, genres: genresChecked };
    // setGameData(newGameData);
    // //
    // setErrors({
    //   messages: {
    //     ...errors.messages,
    //     genres: validators.genres(newGameData.genres),
    //   },
    //   isValidate: validateGameForm(newGameData),
    // });
  };

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    // const imageFile = e.target.files[0];
    // //const newGameData = { ...gameData, image: imageFile };
    // setGameData({
    //   ...gameData,
    //   image: { file: imageFile, filename: e.target.value },
    // });
    //
    // setErrors({
    //   messages: {
    //     ...errors.messages,
    //     image: validators.image(newGameData.image),
    //   },
    //   isValidate: validateGameForm(newGameData),
    // });
  }

  // Render
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.title}>Agregar Videojuego</div>
      {/* name input */}
      <div className={`${styles.inputTextContainer} ${styles.ic1}`}>
        <label className={styles.inputLabel}>Nombre</label>
        <input
          type='text'
          name='name'
          value={gameData.name}
          onChange={handleInputChange}
          className={styles.input}
        />
        <p className={styles.error}>
          {/* {errors.messages.name && errors.messages.name} */}
        </p>
      </div>
      {/* description input */}
      <div className={`${styles.inputTextContainer}`}>
        <label className={styles.inputLabel}>Descripción</label>
        <input
          type='text'
          name='description'
          value={gameData.description}
          onChange={handleInputChange}
          className={styles.input}
        />
        <p className={styles.error}>
          {/* {errors.messages.description && errors.messages.description} */}
        </p>
      </div>
      {/* image input */}
      <div className={`${styles.inputTextContainer} ${styles.ic1}`}>
        <label className={styles.inputLabel}>Imagen</label>
        <input
          type='file'
          name='image'
          onChange={handleImageChange}
          className={styles.input}
          value={gameData.image.filename}
        />
        <p className={styles.error}>
          {/* {errors.messages.image && errors.messages.image} */}
        </p>
      </div>
      {/* rating input */}
      <div className={`${styles.inputTextContainer} ${styles.ic1}`}>
        <label className={styles.inputLabel}>Rating</label>
        <input
          type='text'
          name='rating'
          value={gameData.rating}
          onChange={handleInputChange}
          className={styles.input}
        />
        <p className={styles.error}>
          {/* {errors.messages.rating && errors.messages.rating} */}
        </p>
      </div>
      {/* released input */}
      <div className={styles.dateInputContainer}>
        <label className={styles.inputLabel}>Fecha de lanzamiento</label>
        <input
          type='date'
          name='released'
          value={gameData.released}
          onChange={handleInputChange}
        />
        <p className={styles.error}>
          {/* {errors.messages.released && errors.messages.released} */}
        </p>
      </div>
      {/* platforms input */}
      <div className={`${styles.inputContainerDropdown} ${styles.ic1}`}>
        <input type='checkbox' id='platforms_toggle' />
        <label htmlFor='platforms_toggle'>Elegir Plataformas</label>
        <div className={styles.dropdownContent}>
          {Object.keys(platforms).map((platformId) => (
            <div key={platformId} className={styles.checkContainer}>
              <label>
                <input
                  type='checkbox'
                  id={platformId}
                  name={platformId}
                  //checked={platforms[platformId].checked}
                  onChange={handlePlatformCheckChange}
                  className={styles.input}
                />
                {/* {platforms[platformId].data} */}
              </label>
            </div>
          ))}
        </div>
        <p className={styles.error}>
          {/* {errors.messages.platforms && errors.messages.platforms} */}
        </p>
      </div>
      {/* Genres input */}
      <div className={`${styles.inputContainerDropdown} ${styles.ic1}`}>
        <input type='checkbox' id='genres_toggle' />
        <label htmlFor='genres_toggle'>Elegir Géneros</label>
        <div className={styles.dropdownContent}>
          {Object.keys(genres).map((genreId) => (
            <div key={genreId} className={styles.checkContainer}>
              <label>
                <input
                  type='checkbox'
                  id={genreId}
                  name={genreId}
                  //checked={genres[genreId].checked}
                  onChange={handleGenreCheckChange}
                  className={styles.input}
                />
                {/* {genres[genreId].data.name} */}
              </label>
            </div>
          ))}
        </div>
        <p className={styles.error}>
          {/* {errors.messages.genres && errors.messages.genres} */}
        </p>
      </div>
      {/* Submit button */}
      <div>
        <button
          type='submit'
          className={`btn ${styles.submit}`}
          //disabled={!errors.isValidate}
        >
          Agregar Juego
        </button>
      </div>
      {/* View new game button */}
      <div>
        {/* {newGame ? (
          <Modal
            message={`El juego <strong>${newGame.name}</strong> se guardo correctamente.`}
            action1={{
              handler: () => {
                navigate(`/detail/${newGame.id}?fromDb=true`);
              },
              name: 'Ver el nuevo juego',
            }}
            action2={{
              handler: () => setNewGame(null),
              name: 'Crear otro juego',
            }}
          />
        ) : null} */}
      </div>
    </form>
  );
}
