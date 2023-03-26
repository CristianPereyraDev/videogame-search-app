const { Videogame } = require("../db");
const { getGamesFromApi } = require("../utils/api.util");

async function getVideogames(req, res) {
  try {
    const { page, pageSize } = req.query;
    const gamesFromApi = await getGamesFromApi(page, pageSize);
    const gamesFromDB = await Videogame.findAll();
    // Por ahora retorna la union
    res.status(200).json({ results: [...gamesFromApi, ...gamesFromDB] });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = getVideogames;
