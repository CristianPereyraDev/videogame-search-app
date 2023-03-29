const axios = require("axios");
// Obtengo el apyKey que esta en el archivo .env
const { API_KEY } = process.env;
// Configuraciones
const { GAMES_PAGE_SIZE } = require("../configs/api.configs");

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
    // Por defecto la api me devuelve 20 videogames por página.
    for (
      let pageQuery = 1;
      pageQuery <= Math.ceil(pageSize / 20);
      pageQuery++
    ) {
      const response = await axios.get(
        `https://api.rawg.io/api/games?key=${API_KEY}&page=${pageQuery}${searchQuery}`
      );
      results = [...results, ...response.data.results];
    }
    return results;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getGameByIdFromApi(gameId) {
  try {
    const response = await axios.get(
      `https://api.rawg.io/api/games/${gameId}?key=${API_KEY}`
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = { getGenresFromApi, getGamesFromApi, getGameByIdFromApi };
