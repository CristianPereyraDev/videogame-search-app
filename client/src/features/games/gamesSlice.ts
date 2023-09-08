import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  ApiFilter,
  filterQueryParams,
  findAndUpdateFilter,
} from '../../utils/filters.util';
import { IGame, IGamePlatform } from './types';

const API_KEY = import.meta.env.VITE_RAWG_API_KEY;
const PAGE_SIZE = import.meta.env.VITE_PAGE_SIZE;

interface GamesState {
  count: number;
  search: string;
  loading: boolean;
  error: string | null;
  currentPage: string | null;
  nextPage: string | null;
  prevPage: string | null;
  videogames: Array<IGame>;
  filter: Array<ApiFilter>;
  order: { field: string; isReversed: boolean } | null;
}

const initialState: GamesState = {
  count: 0,
  search: '',
  loading: false,
  error: null,
  videogames: [],
  filter: [
    { name: 'genres', values: [] },
    { name: 'platforms', values: [] },
  ],
  order: null,
  currentPage: null,
  nextPage: null,
  prevPage: null,
};

export const fetchNextPage = createAsyncThunk(
  'games/fetchNextPage',
  async (_, thunkAPI) => {
    const { games: gamesState } = thunkAPI.getState() as { games: GamesState };

    if (!gamesState.nextPage) return thunkAPI.fulfillWithValue(null);

    const response = await fetch(gamesState.nextPage);
    // Check error response from api
    if (!response.ok) {
      throw new Error(`API error! status: ${response.status}`);
    }

    const jsonResponse = await response.json();

    return {
      count: jsonResponse.count,
      currentPage: gamesState.nextPage,
      prevPage: jsonResponse.previous,
      nextPage: jsonResponse.next,
      results: jsonResponse.results
        ? jsonResponse.results.map(
            (game: { background_image: string; platforms: [] }) => {
              return {
                ...game,
                image: game.background_image,
                platforms: game.platforms
                  ? game.platforms.map<IGamePlatform>(
                      (p: { platform: IGamePlatform }) => {
                        const platform: IGamePlatform = p.platform;
                        return platform;
                      }
                    )
                  : [],
              };
            }
          )
        : [],
    } as {
      count: number;
      results: IGame[];
      currentPage: string | null;
      prevPage: string | null;
      nextPage: string | null;
    };
  }
);

export const fetchGamesThunk = createAsyncThunk(
  'games/fetchGamesThunk',
  async (_, thunkAPI) => {
    const { games: gamesState } = thunkAPI.getState() as { games: GamesState };

    const filterParams = filterQueryParams(gamesState.filter);
    const orderingParam = gamesState.order
      ? `&ordering=${gamesState.order.isReversed ? '-' : ''}${
          gamesState.order.field
        }`
      : '';
    const searchParam = gamesState.search ? `&search=${gamesState.search}` : '';

    const URL = `https://api.rawg.io/api/games?key=${API_KEY}&page_size=${PAGE_SIZE}${searchParam}${filterParams}${orderingParam}`;

    const response = await fetch(URL);

    // Check error response from api
    if (!response.ok) {
      throw new Error(`API error! status: ${response.status}`);
    }

    const jsonResponse = await response.json();

    return {
      count: jsonResponse.count,
      results: jsonResponse.results ?? [],
      currentPage: URL,
      prevPage: jsonResponse.previous,
      nextPage: jsonResponse.next,
    } as {
      count: number;
      results: [];
      currentPage: string | null;
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
      action: PayloadAction<{
        count: number;
        videogames: IGame[];
        apiURL: string;
        nextPage: string | null;
        prevPage: string | null;
        search: string;
      }>
    ) => {
      state.search = action.payload.search;
      state.count = action.payload.count;
      state.currentPage = action.payload.apiURL;
      state.nextPage = action.payload.nextPage;
      state.prevPage = action.payload.prevPage;
      state.videogames = action.payload.videogames;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    updateFilter: (state, action: PayloadAction<ApiFilter>) => {
      findAndUpdateFilter(state.filter, action.payload);
    },
    clearFilters: (state) => {
      state.filter = [];
    },
    updateOrder: (
      state,
      action: PayloadAction<{ field: string; isReversed: boolean } | null>
    ) => {
      state.order = action.payload;
    },
  },
  extraReducers: (builder) => {
    //---
    builder.addCase(fetchNextPage.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchNextPage.fulfilled, (state, action) => {
      state.loading = false;

      if (action.payload) {
        state.count = action.payload.count;
        state.currentPage = action.payload.currentPage;
        state.prevPage = action.payload.prevPage;
        state.nextPage = action.payload.nextPage;
        state.videogames.push(...action.payload.results);
      }
    });

    builder.addCase(fetchNextPage.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? 'Default error message';
    });

    //---
    builder.addCase(fetchGamesThunk.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchGamesThunk.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.count = action.payload.count;
        state.currentPage = action.payload.currentPage;
        state.prevPage = action.payload.prevPage;
        state.nextPage = action.payload.nextPage;
        // Map games from api to IGame type
        state.videogames = action.payload.results.map<IGame>((apiGame: any) => {
          return {
            id: apiGame.id,
            name: apiGame.name,
            description: apiGame.description,
            released: apiGame.released,
            image: apiGame.background_image,
            rating: apiGame.rating,
            genres: apiGame.genres,
            platforms: apiGame.platforms.map((item: any) => item.platform),
          };
        });
      }
    });

    builder.addCase(fetchGamesThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? 'Default error message';
    });
  },
});

/** Action creators for slice's reducer */
export const {
  setError,
  clearError,
  updateFilter,
  clearFilters,
  setFindedGames,
  updateOrder,
} = gamesSlice.actions;

/** Slice's reducer */
export default gamesSlice.reducer;
