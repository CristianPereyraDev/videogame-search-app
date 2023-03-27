const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

// Controllers
const {
  getVideogames,
  getVideogameById,
  getVideogamesByName,
  postVideogames,
  getGenres,
} = require("../controllers");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

/**
 * El orden de las rutas es importante. Si llega una request
 * de la forma .../videogames/name... express podria ejecutar
 * .../videogames/:idVideogame si estuviera antes.
 */
router.get("/videogames", getVideogames);
router.get("/videogames/name", getVideogamesByName);
router.get("/videogames/:idVideogame", getVideogameById);
router.post("/videogames", postVideogames);
router.get("/genres", getGenres);

module.exports = router;
