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
      /**
       * Traigo la página desde el back y le aviso al reducer que hay que hacer cambios
       * en el estado global.
       */
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
      // Dispath the action
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
 * Acción que modifica el array videogames del store dado un filtro.
 * @param {*} filter callback to filter videogames
 * @returns
 */
export function filterVideogames(filter) {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `http://localhost:3001/videogames?page=1&pageSize=${MAX_SEARCH_COUNT}&filterProp=${filter.prop}&filterValue=${filter.value}`
      );
      // Dispath the action
      dispatch({
        type: FILTER,
        payload: { data: response.data, filter: filter },
      });
    } catch (error) {
      console.log(error);
    }
  };
}

/**
 * Acción cambia el orden de los videojuegos en el store.
 * @param {*} order
 * @returns
 */
export function orderVideogames(order) {
  return { type: ORDER, payload: order };
}
