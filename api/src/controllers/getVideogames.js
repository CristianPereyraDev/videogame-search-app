const { Videogame } = require("../db");
const { getGamesFromApi } = require("../utils/api.util");
const { GAMES_PAGE_SIZE } = require("../configs/api.configs");
const { extractPlatformsFromVideogames } = require("../utils/controllers.util");
const { getFilterCb } = require("../utils/filters.util");

async function getVideogames(req, res) {
  try {
    const { page, pageSize, filterProp, filterValue, orderBy, orderMethod } =
      req.query;
    // Traigo los primeros 100 juegos de la api
    const gamesFromApi = await getGamesFromApi(GAMES_PAGE_SIZE);
    // Get platforms to add to response
    const platforms = extractPlatformsFromVideogames(gamesFromApi);
    // Traigo todos los juegos de la base de datos
    const gamesFromDB = await Videogame.findAll();
    // Uno los juegos de la api y la base de datos
    const gamesFromApiAndDB = [...gamesFromDB, ...gamesFromApi];
    // Aplico el filtro
    let filterCb = getFilterCb(filterProp, filterValue);
    const filtered = gamesFromApiAndDB.filter(filterCb);
    if (filtered.length === 0)
      return res.status(200).json({
        prevPage: null,
        nextPage: null,
        results: [],
        platforms: platforms,
      });
    // Pagination
    const maxPages = Math.ceil(filtered.length / pageSize);
    if (page >= 1 && page <= maxPages) {
      const startPage = pageSize * (page - 1);
      const endPage = pageSize * page;
      const paginatedVideogames = filtered.slice(startPage, endPage);
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
        platforms: platforms,
      });
    } else {
      res.status(400).json({ message: "Error de paginación." });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = getVideogames;
