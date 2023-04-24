const { Op } = require("sequelize");
const { Videogame, Genre } = require("../db");
const { getGamesFromApi } = require("../utils/api.util");
const { API_PAGE_SIZE } = require("../configs/api.configs");

async function getVideogamesByName(req, res) {
  try {
    const { name, page, pageSize } = req.query;
    if (!name)
      return res
        .status(400)
        .json({ message: "La frase de busqueda no puede ser vacía." });
    // Traigo los primeros 100 juegos de la api que cumplan la condicion de busqueda
    const gamesFromApi = await getGamesFromApi(API_PAGE_SIZE, name);
    // Traigo todos los juegos de la base de datos que cumplan la condición
    const gamesFromDB = await Videogame.findAll({
      where: { name: { [Op.like]: `%${name}%` } },
    });
    // Uno todos los juegos
    const gamesFromApiAndDB = [...gamesFromDB, ...gamesFromApi];
    if (gamesFromApiAndDB.length > 0) {
      // Pagination
      const maxPages = Math.ceil(gamesFromApiAndDB.length / pageSize);
      if (page >= 1 && page <= maxPages) {
        const startPage = pageSize * (page - 1);
        const endPage = pageSize * page;
        const paginatedVideogames = gamesFromApiAndDB.slice(startPage, endPage);
        const nextPageUrl =
          page < maxPages
            ? `${req.protocol}://${req.get(
                "host"
              )}/videogames/name?name=${name}&page=${
                Number(page) + 1
              }&pageSize=${pageSize}`
            : null;
        const prevPageUrl =
          page > 1
            ? `${req.protocol}://${req.get(
                "host"
              )}/videogames/name?name=${name}&page=${
                page - 1
              }&pageSize=${pageSize}`
            : null;
        // Response
        res.status(200).json({
          prevPage: prevPageUrl,
          nextPage: nextPageUrl,
          results: paginatedVideogames,
        });
      } else {
        res.status(400).json({ message: "Error de paginación." });
      }
    } else
      res
        .status(400)
        .json({ message: "No hay juegos que coincidan con esa frase." });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

module.exports = getVideogamesByName;
