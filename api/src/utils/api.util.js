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
async function getGamesFromApi(page, pageSize) {
  try {
    const response = await axios.get(
      `https://api.rawg.io/api/games?key=${API_KEY}&page=${page}&page_size=${pageSize}`
    );
    return response.data.results;
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = { getGenresFromApi, getGamesFromApi };
