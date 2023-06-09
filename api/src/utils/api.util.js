const axios = require("axios");
// Obtengo el apyKey que esta en el archivo .env
const { API_KEY } = process.env;

/**
 *
 * @returns {Array} Array of genres
 */
async function getGenresFromApi() {
  try {
    const response = await axios.get(
      `https://api.rawg.io/api/genres?key=${API_KEY}`
    );
    return response.data.results;
  } catch (error) {
    throw new Error(error.message);
  }
}

/**
 *
 * @param {*} page Page number
 * @param {*} pageSize Page size
 * @returns Array of games
 */
async function getGamesFromApi(pageSize, search) {
  try {
    const searchQuery = search ? `&search=${search}` : "";
    let results = [];
    if (searchQuery) {
      const response = await axios.get(
        `https://api.rawg.io/api/games?key=${API_KEY}${searchQuery}`
      );
      results = response.data.results;
    } else {
      // Por defecto la api me devuelve 20 videogames por página, entonces hago un loop para obtener los 100
      for (
        let pageQuery = 1;
        pageQuery <= Math.ceil(pageSize / 20);
        pageQuery++
      ) {
        const response = await axios.get(
          `https://api.rawg.io/api/games?key=${API_KEY}&page=${pageQuery}`
        );
        results = [...results, ...response.data.results];
      }
    }

    return results.map((videogame) => {
      // De cada videogame devuelvo sólo lo que necesito.
      return {
        id: videogame.id,
        name: videogame.name,
        released: videogame.released,
        rating: videogame.rating,
        genres: videogame.genres,
        platforms: videogame.platforms.map(
          (platform) => platform.platform.name
        ),
        image: videogame.background_image,
      };
    });
  } catch (error) {
    throw new Error(error.message);
  }
}

/**
 *
 * @param {*} gameId
 * @returns
 */
async function getGameByIdFromApi(gameId) {
  try {
    const response = await axios.get(
      `https://api.rawg.io/api/games/${gameId}?key=${API_KEY}`
    );
    const videogame = response.data;
    return {
      id: videogame.id,
      name: videogame.name,
      description: videogame.description,
      platforms: videogame.platforms.map((platform) => platform.platform.name),
      image: videogame.background_image,
      released: videogame.released,
      rating: videogame.rating,
      genres: videogame.genres,
    };
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = { getGenresFromApi, getGamesFromApi, getGameByIdFromApi };
