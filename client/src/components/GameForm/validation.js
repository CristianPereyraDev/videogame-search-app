// eslint-disable-next-line
const regexName = /\b([A-ZÀ-ÿ]+[-,a-z0-9. ']+)+/;
const regexDescription = /\b[a-zA-Z][a-zA-Z0-9. ]+/;
const regexImageUrl = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/;
const regexDate =
  /[1-9][0-9][0-9]{2}-([0][1-9]|[1][0-2])-([1-2][0-9]|[0][1-9]|[3][0-1])/;
const regexRating = /^[0-5]$|^[0-4].[0-9]$|^[0-4].[0-9][0-9]$/;

export function validateGameForm(gameData) {
  for (const prop in gameData) {
    if (validators[prop](gameData[prop]) !== "") {
      return false;
    }
  }
  return true;
}

function validateName(name) {
  if (!regexName.test(name)) return "El nombre debe ser válido";
  if (!(name.length > 1 && name.length < 10)) return "Error de rango";
  return "";
}
function validateDescription(description) {
  if (!regexDescription.test(description)) return "La descripción no es válida";
  if (!(description.length > 1 && description.length < 255))
    return "Error de rango";
  return "";
}
function validatePlatforms(platforms) {
  if (platforms.length === 0)
    return "Debes seleccionar al menos una plataforma";
  return "";
}
function validateImage(image) {
  if (!image) return "Débes elegir una imagen";
  //if (!regexImageUrl.test(gameData.image)) return "Ingresar una url válida";
  return "";
}
function validateReleased(released) {
  if (!regexDate.test(released.trim())) {
    return "Formato de fecha no válido";
  }
  return "";
}
function validateRating(rating) {
  const test = rating.toString().match(regexRating);
  if (!(test && test[0].length === rating.length))
    return "Rating debe ser un número válido";
  return "";
}
function validateGenres(genres) {
  if (genres.length === 0) return "Debes seleccionar al menos un género";
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
