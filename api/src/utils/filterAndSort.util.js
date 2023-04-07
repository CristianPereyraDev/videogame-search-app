const OrderMethod = {
  Ascendent: "Ascendent",
  Descendent: "Descendent",
};

/**
 * Closure that generates source filter functions
 * @param {*} source
 * @returns
 */
function generateSourceFilter(source) {
  if (source === "db")
    return (videogame) =>
      videogame.hasOwnProperty("fromDb") && videogame["fromDb"];
  else
    return (videogame) =>
      !videogame.hasOwnProperty("fromDb") && !videogame["fromDb"];
}

/**
 * Closure that generates genre filter functions
 * @param {*} genreId
 * @returns
 */
function generateGenreFilter(genreId) {
  return (videogame) =>
    videogame.genres.some((genre) => Number(genre.id) === Number(genreId));
}

/**
 * Makes a filter
 * @param {*} filterProp
 * @param {*} filterValue
 * @returns
 */
function getFilterCb(filterProp, filterValue) {
  let filterCb = (videogame) => true;
  if (filterProp && filterProp === "genres")
    filterCb = generateGenreFilter(filterValue);
  else if (filterProp && filterProp === "source")
    filterCb = generateSourceFilter(filterValue);
  return filterCb;
}

/**
 *
 * @param {*} videogames
 * @param {*} method
 * @returns
 */
function orderVideogamesByName(videogames, method) {
  return videogames.sort((v1, v2) =>
    method === OrderMethod.Ascendent
      ? v1.name.localeCompare(v2.name)
      : v1.name.localeCompare(v2.name) * -1
  );
}

/**
 *
 * @param {*} videogames
 * @param {*} method
 * @returns
 */
function orderVideogamesByRating(videogames, method) {
  return videogames.sort((v1, v2) =>
    method === OrderMethod.Ascendent
      ? v1.rating - v2.rating
      : v2.rating - v1.rating
  );
}

/**
 * Filtra y ordena un arreglo de videojuegos
 * @param {*} videogames
 * @param {*} filter Filter object
 * @param {*} order Order object
 * @returns
 */
function filterAndSort(videogames, filter, order) {
  // Apply Filter
  const filterCb = getFilterCb(filter.prop, filter.value);
  let result = videogames.filter(filterCb);
  // Apply Ordering
  if (order.by && order.hasOwnProperty("method")) {
    result =
      order.by === "name"
        ? orderVideogamesByName(result, order.method)
        : orderVideogamesByRating(result, order.method);
  }
  return result;
}

module.exports = { filterAndSort, OrderMethod };
