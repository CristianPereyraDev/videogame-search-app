// eslint-disable-next-line
const regexName = /\b([A-ZÀ-ÿ]+[-,a-z0-9. ']+)+/;
const regexRating = /[0-9]+[.][0-9]/;

/**
 * {name: "", description: "", platforms: [], image: "", released: "", rating: 1, genres: [],}
 * @param {*} gameData gameData es un objeto donde cada propiedad corresponde con un input del form.
 * @returns retorna un objeto donde cada propiedad es corresponde a un input y su valor es un string.
 */
export function validateGameForm(gameData) {
  const errors = {};

  return errors;
}

function validateName(gameData) {
  if (!regexName.test(gameData.name)) return "El nombre debe ser válido";
  if (!(gameData.name.length > 1 && gameData.name.length < 10))
    return "Error de rango";
}
function validateDescription(gameData) {}
function validatePlatforms(gameData) {}
function validateImage(gameData) {}
function validateReleased(gameData) {}
function validateRating(gameData) {}
function validateGenres(gameData) {}

/**
 * It's a object where each property represents a input name and it's value is a callback
 */
export const validators = {
  name: validateName,
  description: validateDescription,
  platforms: validatePlatforms,
  image: validateImage,
  released: validateReleased,
  rating: validateRating,
  genres: validateGenres,
};
