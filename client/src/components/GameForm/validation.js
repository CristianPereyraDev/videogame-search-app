// eslint-disable-next-line
const regexName = /\b([A-ZÀ-ÿ]+[-,a-z0-9. ']+)+/;
const regexDescription = /\b[a-zA-Z][a-zA-Z0-9. ]+/;
const regexImageUrl = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/;
const regexDate =
  /[1-9][0-9][0-9]{2}-([0][1-9]|[1][0-2])-([1-2][0-9]|[0][1-9]|[3][0-1])/gm;
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
  return "";
}
function validateDescription(gameData) {
  if (!regexDescription.test(gameData.description))
    return "La descripción no es válida";
  if (!(gameData.description.length > 1 && gameData.description.length < 255))
    return "Error de rango";
  return "";
}
function validatePlatforms(gameData) {
  if (gameData.platforms.length === 0)
    return "Debes seleccionar al menos una plataforma";
  return "";
}
function validateImage(gameData) {
  if (!regexImageUrl.test(gameData.image)) return "Ingresar una url válida";
  return "";
}
function validateReleased(gameData) {
  if (!regexDate.test(gameData.released)) return "Formato de fecha no válido";
  return "";
}
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
