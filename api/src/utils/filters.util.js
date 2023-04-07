// Closure that generates source filter functions
function generateSourceFilter(source) {
  if (source === "db")
    return (videogame) =>
      videogame.hasOwnProperty("fromDb") && videogame["fromDb"];
  else
    return (videogame) =>
      !videogame.hasOwnProperty("fromDb") && !videogame["fromDb"];
}

// Closure that generates genre filter functions
function generateGenreFilter(genreId) {
  return (videogame) =>
    videogame.genres.some((genre) => Number(genre.id) === Number(genreId));
}

function getFilterCb(filterProp, filterValue) {
  console.log("filterProp", filterProp, "filterValue", filterValue);
  let filterCb = (videogame) => true;
  if (filterProp && filterProp === "genres")
    filterCb = generateGenreFilter(filterValue);
  else if (filterProp && filterProp === "source")
    filterCb = generateSourceFilter(filterValue);
  return filterCb;
}

module.exports = { getFilterCb };
