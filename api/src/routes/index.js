const { Router } = require("express");
const multer = require("multer");

// Import the controllers
const {
  getVideogames,
  getVideogameById,
  getVideogamesByName,
  postVideogames,
  getGenres,
  getPlatforms,
  getImageById,
} = require("../controllers");

const router = Router();

const upload = multer({ dest: "/tmp/" });

/**
 * El orden de las rutas es importante. Si llega una request
 * de la forma .../videogames/name... express podria ejecutar
 * .../videogames/:idVideogame si estuviera antes.
 */
router.get("/videogames", getVideogames);
router.get("/videogames/name", getVideogamesByName);
router.get("/videogames/:idVideogame", getVideogameById);
// POST new videogame end point
router.get("/videogames/images/:filename", getImageById);
router.post("/videogames", upload.single("image"), postVideogames);
router.get("/genres", getGenres);
router.get("/platforms", getPlatforms);

module.exports = router;
