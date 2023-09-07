import { IGame } from '../features/games/types';

export type ApiFilter = {
  name: string;
  values: string[];
};

export type Order = {
  by: string;
  method: null;
};

export declare function gameOrder(gameA: IGame, gameB: IGame): number;

export function filterQueryParams(filters: ApiFilter[]) {
  let totalQuery: string = '';

  if (filters.length === 0) return '';

  filters.forEach((filter) => {
    const query =
      filter.values.length > 0
        ? `&${filter.name}=${filter.values.reduce(
            (prev, current) => prev + ',' + current,
            ''
          )}`
        : '';
    totalQuery += query;
  });

  return totalQuery;
}
