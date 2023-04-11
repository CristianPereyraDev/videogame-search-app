const { Videogame } = require("../db");
const { getGamesFromApi } = require("../utils/api.util");
const { API_PAGE_SIZE } = require("../configs/api.configs");
const { extractPlatformsFromVideogames } = require("../utils/controllers.util");

async function getPlatforms(req, res) {
  try {
    // Traigo los primeros 100 juegos de la api
    const gamesFromApi = await getGamesFromApi(API_PAGE_SIZE);
    // Get platforms to add to response
    const platforms = extractPlatformsFromVideogames(gamesFromApi);
    res.status(200).json(platforms);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = getPlatforms;
