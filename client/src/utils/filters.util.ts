// /**
//  *
//  * @param {*} elem
//  * @param {*} filterBy
//  * @param {*} filterValues
//  * @returns
//  */
// export function filterElem(elem, filterBy, filterValues) {
//   if (filterValues && filterValues.length === 0) return true;
//   return (
//     elem &&
//     filterBy &&
//     filterValues &&
//     Object.prototype.hasOwnProperty.call(elem, filterBy) &&
//     filterValues.some((value) => value === elem[filterBy])
//   );
// }

import { IGame } from '../components/Card/Card';

// /**
//  *
//  * @param {*} data
//  * @param {*} filterBy
//  * @param {*} filterValue
//  * @returns
//  */
// export function filterArray(data, filterBy, filterValue) {
//   return data.filter((elem) => filterElem(elem, filterBy, filterValue));
// }

// /**
//  * Cada elemento de data se avalua con cada filtro del array filters,
//  * y si pasa todos los filtros se agrega al resultado.
//  * @param {*} data
//  * @param {*} filters objects de la forma {filterBy: '', filterValue: ''}
//  * @returns
//  */
// export function filterAND(data, filters) {
//   return data.filter((elem) =>
//     filters.every((filter) =>
//       filterElem(elem, filter.filterBy, filter.filterValues)
//     )
//   );
// }

// /**
//  * Filtra y ordena un array de objetos
//  * @param {*} data
//  * @param {*} filters
//  * @param {*} order
//  * @returns
//  */
// export function filterAndOrder(data, filters, order) {
//   console.log('filterAndOrder', order);
//   let result = data;
//   if (filters && filters.length > 0) {
//     console.log('filtrando por:', filters);
//     result = filterAND(result, filters);
//   }

//   if (order && order.orderBy !== 'none') {
//     console.log('ordenando por:', order.orderBy, order.orderAsc);
//     result = result.sort((p1, p2) => {
//       if (order.orderAsc)
//         return typeof p1[order.orderBy] === 'string'
//           ? p1[order.orderBy].localeCompare(p2[order.orderBy])
//           : p1[order.orderBy] - p2[order.orderBy];
//       else
//         return typeof p1[order.orderBy] === 'string'
//           ? p2[order.orderBy].localeCompare(p1[order.orderBy])
//           : p2[order.orderBy] - p1[order.orderBy];
//     });
//   }

//   return result;
// }

export type ApiFilter = {
  name: string;
  value: string;
};

export type Order = {
  by: string;
  method: null;
};

export declare function gameOrder(gameA: IGame, gameB: IGame): number;
