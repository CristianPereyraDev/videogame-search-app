export interface IGameGenre {
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background: string;
}

export interface IGamePlatform {
  id: number;
  name: string;
  slug: string;
  image: string | null;
  year_end: number | null;
  year_start: number | null;
  games_count: number;
  image_background: string;
}

export interface IGame {
  id: number;
  name: string;
  description: string | null;
  released: string;
  image: string;
  rating: number;
  genres: Array<IGameGenre>;
  platforms: Array<IGamePlatform>;
}
