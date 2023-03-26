const { Genre } = require("../db");

async function getGenres(req, res) {
  try {
    // Busco los genres en la base de datos
    let genres = await Genre.findAll();
    res.status(200).json(genres);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = getGenres;
