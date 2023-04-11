const { Videogame, Genre } = require("../db");
const { getGameByIdFromApi } = require("../utils/api.util");

async function getVideogameById(req, res) {
  try {
    const { idVideogame } = req.params;
    const { fromDb } = req.query;
    let videogame = {};
    const baseUrl = `${req.protocol}://${req.get("host")}/`;
    // Buscar el juego en la base de datos?
    if (fromDb === "true" && idVideogame) {
      const gameInst = await Videogame.findByPk(idVideogame, {
        include: Genre,
      });
      videogame = {
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
      };
    } else {
      videogame = await getGameByIdFromApi(idVideogame);
    }
    if (videogame) res.status(200).json(videogame);
    else res.status(400).json({ message: "El videojuego no existe" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = getVideogameById;
