export type ApiFilter = {
  name: string;
  values: string[];
};

export type Order = {
  by: string;
  method: null;
};

export function filterQueryParams(filters: ApiFilter[]) {
  let totalQuery: string = '';

  if (filters.length === 0) return '';

  filters.forEach((filter) => {
    const query =
      filter.values.length > 0
        ? `&${filter.name}=${filter.values.reduce(
            (prev, current) => (prev ? prev + ',' + current : current),
            ''
          )}`
        : '';
    totalQuery += query;
  });

  return totalQuery;
}

export function findAndUpdateFilter(
  filtersList: ApiFilter[],
  newFilter: ApiFilter
) {
  const filterToUpdate = filtersList.find(
    (filter) => filter.name === newFilter.name
  );

  if (filterToUpdate) {
    filterToUpdate.values = newFilter.values;
  } else {
    filtersList.push(newFilter);
  }
}
