const OrderMethod = {
  Ascendent: "Ascendent",
  Descendent: "Descendent",
};

function orderVideogamesByName(videogames, method) {
  return videogames.sort((v1, v2) =>
    method === OrderMethod.Ascendent
      ? v1.name.localeCompare(v2.name)
      : v1.name.localeCompare(v2.name) * -1
  );
}

function orderVideogamesByRating(videogames, method) {
  return videogames.sort((v1, v2) =>
    method === OrderMethod.Ascendent
      ? v1.rating - v2.rating
      : v2.rating - v1.rating
  );
}

function filterAndOrder(videogames, filter, order) {
  // Apply Filter
  let result = arrayFilter(videogames, filter);
  console.log("filterResult=", result);
  // Apply Ordering
  if (order.by && order.hasOwnProperty("method")) {
    result =
      order.by === "name"
        ? orderVideogamesByName(result, order.method)
        : orderVideogamesByRating(result, order.method);
  }
  return result;
}

module.exports = { filterAndOrder, OrderMethod };
