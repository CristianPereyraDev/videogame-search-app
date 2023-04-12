const { Videogame, Genre } = require("../db");
const { getGamesFromApi } = require("../utils/api.util");
const { API_PAGE_SIZE, DEFAULT_PAGE_SIZE } = require("../configs/api.configs");
const { filterAndSort } = require("../utils/filterAndSort.util");

async function getVideogames(req, res) {
  try {
    // Queries
    const { filterProp, filterValue, orderBy, orderMethod } = req.query;
    // Get pagination props
    const page = req.query.page ? req.query.page : 1;
    const pageSize = req.query.pageSize
      ? req.query.pageSize
      : DEFAULT_PAGE_SIZE;
    // Base URL
    const baseUrl = `${req.protocol}://${req.get("host")}/`;
    // Traigo los primeros 100 juegos de la api
    const gamesFromApi = await getGamesFromApi(API_PAGE_SIZE);
    // Traigo todos los juegos de la base de datos, incluyendo los géneros asociados
    let gamesFromDB = await Videogame.findAll({
      include: Genre,
    });
    // Le doy formato
    gamesFromDB = gamesFromDB.map((gameInst) => {
      return {
        id: gameInst.id,
        name: gameInst.name,
        description: gameInst.description,
        platforms: gameInst.platforms,
        image: baseUrl + gameInst.image,
        released: gameInst.released,
        rating: gameInst.rating,
        genres: gameInst.Genres.map((genreInst) => {
          return { id: genreInst.id, name: genreInst.name };
        }),
        fromDb: gameInst.fromDb,
      };
    });
    // Uno los juegos de la api y la base de datos
    const gamesFromApiAndDB = [...gamesFromDB, ...gamesFromApi];
    // Aplico el filtro y el ordenamiento
    const filteredAndSorted = filterAndSort(
      gamesFromApiAndDB,
      { prop: filterProp, value: filterValue }, // filter object
      { by: orderBy, method: orderMethod } // order object
    );
    // Si no hay juegos que retornar
    if (filteredAndSorted.length === 0)
      return res.status(200).json({
        prevPage: null,
        nextPage: null,
        results: [],
      });
    // Pagination. Se extrae una porción del arreglo que contiene todos los videojuegos.
    const maxPages = Math.ceil(filteredAndSorted.length / pageSize);
    if (page >= 1 && page <= maxPages) {
      const startPage = pageSize * (page - 1);
      const endPage = pageSize * page;
      const paginatedVideogames = filteredAndSorted.slice(startPage, endPage);
      const nextPageUrl =
        page < maxPages
          ? baseUrl + `videogames?page=${Number(page) + 1}&pageSize=${pageSize}`
          : null;
      const prevPageUrl =
        page > 1
          ? baseUrl + `videogames?page=${page - 1}&pageSize=${pageSize}`
          : null;
      // Response
      res.status(200).json({
        prevPage: prevPageUrl,
        nextPage: nextPageUrl,
        results: paginatedVideogames,
      });
    } else {
      res.status(404).json({ message: "Error de paginación." });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = getVideogames;
