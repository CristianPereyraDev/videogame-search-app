import { CHANGE_PAGE, SEARCH_BY_NAME, FILTER, ORDER } from "./types";
import axios from "axios";
import { MAX_SEARCH_COUNT } from "../../configs/pagination.config";

/**
 * Acción que modifica el estado del páginado en el store.
 * @param {*} page
 * @returns
 */
export function changePage(pageUrl) {
  return async function (dispatch) {
    try {
      const response = await axios.get(pageUrl);
      dispatch({
        type: CHANGE_PAGE,
        payload: response.data, // { prevPage:..., nextPage:..., results:... }
      });
    } catch (error) {
      console.log(error);
    }
  };
}

/** */
export function searchByName(name) {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `http://localhost:3001/videogames/name?name=${name}&page=1&pageSize=${MAX_SEARCH_COUNT}`
      );
      dispatch({
        type: SEARCH_BY_NAME,
        payload: response.data, // { nextPage:..., results:... }
      });
    } catch (error) {
      console.log(error);
    }
  };
}

/**
 * Acción que modifica el filtro en el store.
 * @param {*} filter callback to filter videogames
 * @returns
 */
export function filterVideogames(filter) {
  return { type: FILTER, payload: filter };
}

/**
 * Acción cambia el orden de los videojuegos en el store.
 * @param {*} order
 * @returns
 */
export function orderVideogames(order) {
  return { type: ORDER, payload: order };
}
