import { CHANGE_PAGE, SEARCH_BY_NAME, FILTER, ORDER } from "../actions/types";
import { OrderMethod } from "../../utils/reducer.util";

const initialState = {
  videogames: [],
  filter: null, // a filter is a object like { prop: "genres", value: 1 }
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
        prevPage: prevPage,
        nextPage: nextPage,
      };
    }

    case CHANGE_PAGE: {
      const { prevPage, nextPage, results } = payload;
      return {
        ...state,
        videogames: results,
        prevPage: prevPage,
        nextPage: nextPage,
      };
    }

    case FILTER: {
      const { data, filter } = payload;
      console.log("Reducer-FILTER: ", data);
      return {
        ...state,
        videogames: data.results,
        prevPage: data.prevPage,
        nextPage: data.nextPage,
        filter: filter,
      };
    }

    case ORDER: {
      console.log("ORDER", payload);
      return {
        ...state,
        order: payload,
      };
    }

    default:
      return { ...state };
  }
}

export default rootReducer;
