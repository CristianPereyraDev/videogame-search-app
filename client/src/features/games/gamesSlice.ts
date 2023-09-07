import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ApiFilter, filterQueryParams } from '../../utils/filters.util';
import { IGame, IGamePlatform } from './types';

const API_KEY = import.meta.env.VITE_RAWG_API_KEY;
const PAGE_SIZE = import.meta.env.VITE_PAGE_SIZE;

interface GamesState {
  count: number;
  page: number;
  search: string;
  loading: boolean;
  error: string | null;
  videogames: Array<IGame>;
  filter: Array<ApiFilter>;
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
  filter: [],
  order: { field: 'name', isReversed: false },
  nextPage: null,
  prevPage: null,
};

export const fetchPage = createAsyncThunk(
  'games/fetchPage',
  async (page: number, thunkAPI) => {
    const { games: gamesState } = thunkAPI.getState() as { games: GamesState };

    const search = gamesState.search ? `&search=${gamesState.search}` : '';
    const combinedFilters = filterQueryParams(gamesState.filter);

    const response = await fetch(
      `https://api.rawg.io/api/games?key=${API_KEY}${search}&page=${page}&page_size=${PAGE_SIZE}${combinedFilters}`
    );
    const jsonResponse = await response.json();

    return {
      count: jsonResponse.count,
      page,
      results: jsonResponse.results.map(
        (game: { background_image: string; platforms: [] }) => {
          return {
            ...game,
            image: game.background_image,
            platforms: game.platforms.map<IGamePlatform>(
              (p: { platform: IGamePlatform }) => {
                const platform: IGamePlatform = p.platform;
                return platform;
              }
            ),
          };
        }
      ),
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
    setFindedGames: (
      state,
      action: PayloadAction<{ search: string; videogames: IGame[] }>
    ) => {
      state.search = action.payload.search;
      state.videogames = action.payload.videogames;
    },
    clearError: (state) => {
      state.error = null;
    },
    updateFilter: (state, action: PayloadAction<ApiFilter>) => {
      const filterToUpdate = state.filter.find(
        (filter) => filter.name === action.payload.name
      );

      if (filterToUpdate) {
        filterToUpdate.values = action.payload.values;
      } else {
        state.filter.push(action.payload);
      }
    },
    clearFilters: (state) => {
      state.filter = [];
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
export const { clearError, updateFilter, clearFilters, setFindedGames } =
  gamesSlice.actions;

/** Slice's reducer */
export default gamesSlice.reducer;
