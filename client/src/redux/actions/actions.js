import { CHANGE_PAGE, SEARCH_BY_NAME, FILTER, ORDER } from "./types";
import axios from "axios";

/**
 * Acción que modifica el estado del páginado en el store.
 * @param {*} page
 * @returns
 */
export function changePage(page) {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `http://localhost:3001/videogames?page=${page}`
      );
      dispatch({
        type: CHANGE_PAGE,
        payload: { videogames: response.data, page: page },
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
        `http://localhost:3001/videogames/name?name=${name}`
      );
      dispatch({ type: SEARCH_BY_NAME, payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };
}

/**
 * Acción que modifica el filtro en el store.
 * @param {*} genre
 * @returns
 */
export function filterVideogames(genre) {
  return { type: FILTER, payload: genre };
}

/**
 * Acción cambia el orden de los videojuegos en el store.
 * @param {*} order
 * @returns
 */
export function orderVideogames(order) {
  return { type: ORDER, payload: order };
}
