const { Op } = require("sequelize");
const { Videogame, Genre } = require("../db");
const { getGamesFromApi } = require("../utils/api.util");
const { SEARCH_PAGE_SIZE } = require("../configs/api.configs");

async function getVideogamesByName(req, res) {
  try {
    console.log("getVideogamesByName");
    const { name } = req.query;
    // Get from db with a limit.
    const gamesFromDB = await Videogame.findAll({
      where: { name: { [Op.like]: `%${name}%` } },
      limit: SEARCH_PAGE_SIZE,
    });
    // Get from api the remainig instances.
    const gamesFromApi = await getGamesFromApi(
      null,
      Math.max(0, SEARCH_PAGE_SIZE - gamesFromDB.length),
      name
    );
    const result = [...gamesFromDB, ...gamesFromApi];
    if (result.length > 0) res.status(200).json({ videogames: result });
    else
      res
        .status(400)
        .json({ message: "No hay juegos que coincidan con esa palabra." });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

module.exports = getVideogamesByName;
