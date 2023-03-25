const axios = require("axios");
// Obtengo el apyKey que esta en el archivo .env
const { API_KEY } = process.env;

/**
 *
 * @returns {Array} Array of genres
 */
async function getGenresFromApi() {
  try {
    const genres = await axios(`https://api.rawg.io/api/genres?key=${API_KEY}`);
    return genres;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getGenres(req, res) {
  try {
  } catch (error) {}
}

module.exports = getGenres;
