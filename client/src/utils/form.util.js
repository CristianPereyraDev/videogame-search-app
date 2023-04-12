function padTo2Digits(num) {
  return num.toString().padStart(2, "0");
}

export function formatDate(date) {
  return [
    date.getFullYear(),
    padTo2Digits(date.getMonth() + 1),
    padTo2Digits(date.getDate()),
  ].join("-");
}

export const DefaultGameData = {
  name: "",
  description: "",
  platforms: [], // array of names
  image: { file: null, filename: "" },
  released: formatDate(new Date()),
  rating: "1",
  genres: [], // array of ids
};

export const DefaultErrors = {
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
};

/**
 *
 * @param {*} arrayOfPlatforms
 * @returns
 */
export function makeUncheckedPlatforms(arrayOfPlatforms) {
  const result = {};
  arrayOfPlatforms.forEach((platform) => {
    if (!result.hasOwnProperty(platform))
      result[platform] = { checked: false, data: platform };
  });
  //console.log("makeUncheckedPlatforms", result);
  return result;
}

export function makeUncheckedGenres(arrayOfGenres) {
  const result = {};
  arrayOfGenres.forEach((genre) => {
    if (!result.hasOwnProperty(genre.id))
      result[genre.id] = { checked: false, data: genre };
  });
  //console.log("makeUncheckedGenres", result);
  return result;
}
