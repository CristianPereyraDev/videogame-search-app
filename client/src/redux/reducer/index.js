import {
  CHANGE_PAGE,
  SEARCH_BY_NAME,
  FILTER_AND_ORDER,
  GET_VIDEOGAMES_STARTED,
  GET_VIDEOGAMES_FAILED,
  CLEAR_ERROR
} from '../actions/types'
import { OrderMethod } from '../../utils/reducer.util'

const initialState = {
  loading: false,
  error: null,
  videogames: [],
  filter: null, // a filter is a object like { prop: "genres", value: 1 }
  order: { by: '', method: OrderMethod.Ascendent },
  nextPage: null,
  prevPage: null
}

// Reducers can't contains side effects (api calls, read files, etc).
function rootReducer (state = initialState, { type, payload }) {
  switch (type) {
    case GET_VIDEOGAMES_STARTED: {
      return { ...state, loading: true }
    }

    case GET_VIDEOGAMES_FAILED: {
      return { ...state, loading: false, error: payload }
    }

    case CLEAR_ERROR: {
      return { ...state, error: null }
    }

    case SEARCH_BY_NAME: {
      const { prevPage, nextPage, results } = payload
      return {
        ...state,
        loading: false,
        videogames: results,
        prevPage,
        nextPage
      }
    }

    case CHANGE_PAGE: {
      const { prevPage, nextPage, results } = payload
      return {
        ...state,
        loading: false,
        videogames: results,
        prevPage,
        nextPage
      }
    }

    case FILTER_AND_ORDER: {
      const { data, filter, order } = payload
      return {
        ...state,
        loading: false,
        videogames: data.results,
        prevPage: data.prevPage,
        nextPage: data.nextPage,
        filter,
        order
      }
    }

    default:
      return { ...state }
  }
}

export default rootReducer
