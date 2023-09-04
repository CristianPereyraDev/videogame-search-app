import {
  CHANGE_PAGE,
  SEARCH_BY_NAME,
  FILTER_AND_ORDER,
  GET_VIDEOGAMES_STARTED,
  GET_VIDEOGAMES_FAILED,
  CLEAR_ERROR,
} from './types';
import axios from 'axios';
import { MAX_SEARCH_COUNT } from '../../config/pagination.config';

// Actions to manage loading state in async tasks
export function getVideogamesStarted() {
  return { type: GET_VIDEOGAMES_STARTED };
}

export function getVideogamesFailed(error) {
  return { type: GET_VIDEOGAMES_FAILED, payload: error };
}

export function clearError() {
  return { type: CLEAR_ERROR };
}

/**
 * Acción que modifica el estado del páginado en el store.
 * @param {*} page
 * @returns
 */
export function changePage(pageUrl) {
  return async function (dispatch) {
    dispatch(getVideogamesStarted());
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
      dispatch(getVideogamesFailed(error.response.data));
    }
  };
}

/** */
export function searchByName(name, filter, order) {
  return async function (dispatch) {
    dispatch(getVideogamesStarted());
    try {
      const filterQuery =
        filter && filter.prop && filter.value
          ? `&filterProp=${filter.prop}&filterValue=${filter.value}`
          : '';
      const orderQuery =
        order && order.by && order.method
          ? `&orderBy=${order.by}&orderMethod=${order.method}`
          : '';
      const response = await axios.get(
        `http://localhost:3001/videogames/name?name=${name}&page=1&pageSize=${MAX_SEARCH_COUNT}${filterQuery}${orderQuery}`
      );
      // Dispath the action
      dispatch({
        type: SEARCH_BY_NAME,
        payload: response.data, // { nextPage:..., results:... }
      });
    } catch (error) {
      dispatch(getVideogamesFailed(error.response.data));
    }
  };
}

/**
 * Acción que modifica el array videogames del store dado un filtro.
 * @param {*} filter callback to filter videogames
 * @returns
 */
export function filterAndSortVideogames(filter, order) {
  return async function (dispatch) {
    dispatch(getVideogamesStarted());
    try {
      console.log('filterAndSortVideogames', filter, order);
      const filterQuery =
        filter && filter.prop && filter.value
          ? `&filterProp=${filter.prop}&filterValue=${filter.value}`
          : '';
      const orderQuery =
        order && order.by && order.method
          ? `&orderBy=${order.by}&orderMethod=${order.method}`
          : '';

      const response = await axios.get(
        `http://localhost:3001/videogames?page=1&pageSize=${MAX_SEARCH_COUNT}${filterQuery}${orderQuery}`
      );
      // Dispath the action
      dispatch({
        type: FILTER_AND_ORDER,
        payload: { data: response.data, filter: filter, order: order },
      });
    } catch (error) {
      dispatch(getVideogamesFailed(error.response.data));
    }
  };
}
