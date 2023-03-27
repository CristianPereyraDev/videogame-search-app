const { Videogame, Genre } = require("../db");
const { getGameByIdFromApi } = require("../utils/api.util");

async function getVideogameById(req, res) {
  try {
    console.log("getVideogameById");
    const { idVideogame } = req.params;
    let game = await getGameByIdFromApi(idVideogame);
    res.status(200).json(game);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = getVideogameById;
