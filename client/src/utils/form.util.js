export function makeUncheckedPlatforms(arrayOfPlatforms) {
  const result = {};
  arrayOfPlatforms.forEach((platform) => {
    if (!result.hasOwnProperty(platform))
      result[platform] = { checked: false, data: platform };
  });
  return result;
}

export function makeUncheckedGenres(arrayOfGenres) {
  const result = {};
  arrayOfGenres.forEach((genre) => {
    if (!result.hasOwnProperty(genre.id))
      result[genre.id] = { checked: false, data: genre };
  });
  return result;
}
