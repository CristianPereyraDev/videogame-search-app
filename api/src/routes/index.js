const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

// Controllers
const { getGenres, getVideogames, postVideogames } = require("../controllers");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/genres", getGenres);
router.get("/videogames", getVideogames);
router.post("/videogames", postVideogames);

module.exports = router;
