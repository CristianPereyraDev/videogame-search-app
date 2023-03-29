const Order = {
  Ascendent: Symbol("Ascendent"),
  Descendent: Symbol("Descendent"),
};

/**
 * @param {*} array array to be filtered
 * @param {*} filterFn a boolean function - (elem) => true/false
 */
export function arrayFilter(array, filterFn) {
  return array.filter((elem) => filterFn(elem));
}

function orderVideogamesByName(videogames, method) {
  return videogames.sort((v1, v2) =>
    method === Order.Ascendent
      ? v1.name.localeCompare(v2.name)
      : v1.name.localeCompare(v2.name) * -1
  );
}

function orderVideogamesByRating(videogames, method) {
  return videogames.sort((v1, v2) =>
    method === Order.Ascendent ? v1.rating - v2.rating : v2.rating - v1.rating
  );
}

export function filterAndOrder(videogames, filter, order) {
  // Apply Filter
  let result = arrayFilter(videogames, filter);
  // Apply Ordering
  if (order.hasOwnProperty("by") && order.hasOwnProperty("method")) {
    result =
      order.by === "name"
        ? orderVideogamesByName(filtered, order.method)
        : orderVideogamesByRating(filtered, order.method);
  }
  return result;
}