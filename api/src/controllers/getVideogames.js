const { Videogame } = require("../db");
const { getGamesFromApi } = require("../utils/api.util");
const { GAMES_PAGE_SIZE } = require("../configs/api.configs");

async function getVideogames(req, res) {
  try {
    const { page, pageSize } = req.query;
    // Traigo los primeros 100 juegos de la api
    const gamesFromApi = await getGamesFromApi(GAMES_PAGE_SIZE);
    // Traigo todos los juegos de la base de datos
    const gamesFromDB = await Videogame.findAll();
    // Uno todos los juegos
    const gamesFromApiAndDB = [...gamesFromDB, ...gamesFromApi];
    // Pagination
    const maxPages = Math.ceil(gamesFromApiAndDB.length / pageSize);
    if (page >= 1 && page <= maxPages) {
      const startPage = pageSize * (page - 1);
      const endPage = pageSize * page;
      const paginatedVideogames = gamesFromApiAndDB.slice(startPage, endPage);
      const nextPageUrl =
        page < maxPages
          ? `${req.protocol}://${req.get("host")}/videogames?page=${
              Number(page) + 1
            }&pageSize=${pageSize}`
          : null;
      const prevPageUrl =
        page > 1
          ? `${req.protocol}://${req.get("host")}/videogames?page=${
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
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = getVideogames;
