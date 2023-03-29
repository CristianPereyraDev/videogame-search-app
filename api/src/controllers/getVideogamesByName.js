const { Op } = require("sequelize");
const { Videogame, Genre } = require("../db");
const { getGamesFromApi } = require("../utils/api.util");

async function getVideogamesByName(req, res) {
  try {
    const { name, page, pageSize } = req.query;
    // Get from db with a limit.
    const gamesFromDB = await Videogame.findAll({
      where: { name: { [Op.like]: `%${name}%` } },
      limit: pageSize,
    });
    // Get from api the remainig instances.
    const gamesFromApi = await getGamesFromApi(
      null,
      Math.max(0, pageSize - gamesFromDB.length),
      name
    );
    const results = [...gamesFromDB, ...gamesFromApi];
    // Get next page
    const nextPage = `videogames/name?name=${name}`;
    if (result.length > 0)
      res.status(200).json({ nextPage: nextPage, results: results });
    else
      res
        .status(400)
        .json({ message: "No hay juegos que coincidan con esa palabra." });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

module.exports = getVideogamesByName;
