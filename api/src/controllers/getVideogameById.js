const { Videogame, Genre } = require("../db");
const { getGameByIdFromApi } = require("../utils/api.util");

async function getVideogameById(req, res) {
  try {
    const { idVideogame } = req.params;
    const { isdb } = req.query;
    console.log("isdb", isdb);
    let videogame = {};
    if (isdb === "true" && idVideogame) {
      videogame = await Videogame.findByPk(idVideogame);
    } else {
      let response = await getGameByIdFromApi(idVideogame);
      videogame = {
        id: response.id,
        name: response.name,
        description: response.description,
        platforms: response.platforms,
        image: response.background_image,
        released: response.released,
        rating: response.rating,
      };
    }
    if (videogame) res.status(200).json(videogame);
    else res.status(400).json({ message: "El videojuego no existe" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = getVideogameById;
