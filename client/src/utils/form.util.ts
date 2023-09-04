import { IGameGenre, IGamePlatform } from '../components/Card/Card';

function padTo2Digits(num: number) {
  return num.toString().padStart(2, '0');
}

export function formatDate(date: Date) {
  return [
    date.getFullYear(),
    padTo2Digits(date.getMonth() + 1),
    padTo2Digits(date.getDate()),
  ].join('-');
}

export const DefaultGameData = {
  name: '',
  description: '',
  platforms: [], // array of names
  image: { file: null, filename: '' },
  released: formatDate(new Date()),
  rating: '1',
  genres: [], // array of ids
};

export const DefaultErrors = {
  messages: {
    name: '',
    description: '',
    platforms: '',
    image: '',
    released: '',
    rating: '',
    genres: '',
  },
  isValidate: false,
};

export type PlatformCkeckboxMap = Map<
  string,
  { checked: boolean; data: IGamePlatform }
>;

/**
 *
 * @param {*} arrayOfPlatforms
 * @returns
 */
export function platformsToCheckboxMap(arrayOfPlatforms: IGamePlatform[]) {
  const result: PlatformCkeckboxMap = new Map();
  arrayOfPlatforms.forEach((platform) => {
    if (!Object.prototype.hasOwnProperty.call(result, platform.name)) {
      result.set(platform.name, { checked: false, data: platform });
    }
  });
  //console.log("makeUncheckedPlatforms", result);
  return result;
}

export type GenreCkeckboxMap = Map<
  string,
  { checked: boolean; data: IGameGenre }
>;

export function genresToCheckboxMap(arrayOfGenres: IGameGenre[]) {
  const result: GenreCkeckboxMap = new Map();
  arrayOfGenres.forEach((genre) => {
    if (!Object.prototype.hasOwnProperty.call(result, genre.id)) {
      result.set(genre.id, { checked: false, data: genre });
    }
  });
  //console.log("makeUncheckedGenres", result);
  return result;
}
