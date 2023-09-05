import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ApiFilter } from '../../utils/filters.util';
import { IGame } from '../../components/Card/Card';

const API_KEY = import.meta.env.VITE_RAWG_API_KEY;
const PAGE_SIZE = import.meta.env.VITE_PAGE_SIZE;

interface GamesState {
  count: number;
  page: number;
  search: string;
  loading: boolean;
  error: string | null;
  videogames: Array<IGame>;
  filter: Array<ApiFilter> | null;
  order: { field: string; isReversed: boolean };
  nextPage: string | null;
  prevPage: string | null;
}

const initialState: GamesState = {
  count: 0,
  page: 0,
  search: '',
  loading: false,
  error: null,
  videogames: [],
  filter: null,
  order: { field: 'name', isReversed: false },
  nextPage: null,
  prevPage: null,
};

export const fetchPage = createAsyncThunk(
  'games/fetchPage',
  async (page: number, thunkAPI) => {
    const { games: gamesState } = thunkAPI.getState() as { games: GamesState };

    const search = gamesState.search ? `&search=${gamesState.search}` : '';

    const response = await fetch(
      `https://api.rawg.io/api/games?key=${API_KEY}${search}&page=${page}&page_size=${PAGE_SIZE}`
    );
    const jsonResponse = await response.json();

    return {
      count: jsonResponse.count,
      page,
      results: jsonResponse.results.map((game: any) => {
        return {
          ...game,
          image: game.background_image,
        };
      }),
      prevPage: jsonResponse.previous,
      nextPage: jsonResponse.next,
    } as {
      count: number;
      page: number;
      results: IGame[];
      prevPage: string | null;
      nextPage: string | null;
    };
  }
);

export const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPage.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchPage.fulfilled, (state, action) => {
      state.loading = false;

      if (action.payload) {
        state.count = action.payload.count;
        state.page = action.payload.page;
        state.videogames = action.payload.results;
        state.prevPage = action.payload.prevPage;
        state.nextPage = action.payload.nextPage;
      }
    });

    builder.addCase(fetchPage.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? 'Default error message';
    });
  },
});

/** Action creators for slice's reducer */
export const { clearError } = gamesSlice.actions;

/** Slice's reducer */
export default gamesSlice.reducer;
