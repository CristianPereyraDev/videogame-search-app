const { Videogame, Genre } = require("../db");
const { Op } = require("sequelize");

async function postVideogames(req, res) {
  try {
    const videogame = req.body;
    const videogameInst = Videogame.build({
      name: videogame.name,
      description: videogame.description,
      platforms: videogame.platforms,
      image: videogame.image,
      released: videogame.released,
      rating: videogame.rating,
    });
    // Get associated genres
    const associatedGenres = await Genre.findAll({
      where: {
        id: { [Op.in]: videogame.genres },
      },
    });
    console.log("associatedGenres=", associatedGenres);
    // Set genres to Videogame instance before save
    videogameInst.setGenres(associatedGenres);
    // Save model in the db
    await videogameInst.save();
    res.status(200).json({ message: "videogames guardado en db" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = postVideogames;
