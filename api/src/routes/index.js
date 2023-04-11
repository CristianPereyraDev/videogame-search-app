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

/**
 * Multer - Middleware para subir archivos.
 *
 */
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `images/${file.fieldname}-${Date.now()}.${ext}`);
  },
});
const multerFilter = (req, file, cb) => {
  if (["jpg", "png", "webp"].includes(file.mimetype.split("/")[1])) {
    cb(null, true);
  } else {
    cb(new Error("El archivo no es un formato de imagen."), false);
  }
};
const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

/**
 * El orden de las rutas es importante. Si llega una request
 * de la forma .../videogames/name... express podria ejecutar
 * .../videogames/:idVideogame si estuviera antes.
 */
router.get("/videogames", getVideogames);
router.get("/videogames/name", getVideogamesByName);
router.get("/videogames/:idVideogame", getVideogameById);
// POST new videogame end point
router.post("/videogames", upload.single("image"), postVideogames);
router.get("/genres", getGenres);
router.get("/platforms", getPlatforms);

module.exports = router;
