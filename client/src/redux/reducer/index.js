import { CHANGE_PAGE, SEARCH_BY_NAME, FILTER, ORDER } from "../actions/types";
import { filterAndOrder, OrderMethod } from "../../utils/reducer.util";

const initialState = {
  videogames: [], // videogames without filtering and ordering
  filteredAndOrdered: [], // videogames after apply filters
  filter: (videogame) => true, // a filter is a boolean function
  nextPage: null,
  prevPage: null,
  order: { by: null, method: OrderMethod.Ascendent },
};

// Reducers can't contains side effects (api calls, read files, etc).
function rootReducer(state = initialState, { type, payload }) {
  switch (type) {
    case SEARCH_BY_NAME: {
      const { prevPage, nextPage, results } = payload;
      return {
        ...state,
        videogames: results,
        filteredAndOrdered: filterAndOrder(results, state.filter, state.order),
        prevPage: prevPage,
        nextPage: nextPage,
      };
    }

    case CHANGE_PAGE: {
      const { prevPage, nextPage, results } = payload;
      return {
        ...state,
        videogames: results,
        filteredAndOrdered: filterAndOrder(results, state.filter, state.order),
        prevPage: prevPage,
        nextPage: nextPage,
      };
    }

    case FILTER: {
      console.log("Filter", payload);
      return {
        ...state,
        filter: payload,
        filteredAndOrdered: filterAndOrder(
          state.videogames,
          payload,
          state.order
        ),
      };
    }

    case ORDER: {
      console.log("ORDER", payload);
      return {
        ...state,
        order: payload,
        filteredAndOrdered: filterAndOrder(
          state.videogames,
          state.filter,
          payload
        ),
      };
    }

    default:
      return { ...state };
  }
}

export default rootReducer;
