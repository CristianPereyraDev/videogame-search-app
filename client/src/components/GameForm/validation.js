// eslint-disable-next-line
const regexName = /\b([A-ZÀ-ÿ]+[-,a-z0-9. ']+)+/;
const regexDescription = /\b[a-zA-Z][a-zA-Z0-9. ]+/;
const regexImageUrl = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/;
const regexDate =
  /[1-9][0-9][0-9]{2}-([0][1-9]|[1][0-2])-([1-2][0-9]|[0][1-9]|[3][0-1])/gm;
const regexRating = /^[0-5]$|^[0-4].[0-9]$|^[0-4].[0-9][0-9]$/;

export function validateGameForm(errors) {
  for (const prop in errors) {
    if (errors[prop] !== "") return false;
  }
  return true;
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
function validateRating(gameData) {
  const test = gameData.rating.match(regexRating);
  if (!(test && test[0].length === gameData.rating.length))
    return "Rating debe ser un número válido";
  return "";
}
function validateGenres(gameData) {
  if (gameData.genres.length === 0)
    return "Un juego debe tener al menos un género";
  return "";
}

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
