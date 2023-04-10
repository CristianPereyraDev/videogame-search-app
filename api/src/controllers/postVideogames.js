const { Videogame, Genre } = require("../db");
const { Op } = require("sequelize");
const fs = require("fs");

async function postVideogames(req, res) {
  try {
    // Image path to save in the db
    const image = global.appRoot + "/images/" + req.file.filename;
    // Rename the image path
    fs.copyFile(req.file.path, image, async (error) => {
      if (error) {
        res.status(500).json({ message: error.message });
      } else {
        const { name, description, platforms, released, rating, genres } =
          req.body;
        // Busco los géneros que tengo que asociar con el nuevo videojuego
        const associatedGenres = await Genre.findAll({
          where: {
            id: { [Op.in]: genres },
          },
        });
        // Creo el videojuego
        const videogameInst = await Videogame.create({
          name: name,
          description: description,
          platforms: platforms,
          image: req.file.filename,
          released: released,
          rating: rating,
        });
        // Asociar los generos con el videojuego recién creado
        videogameInst.addGenres(associatedGenres);

        res.status(200).json({ message: "Videogame guardado en db." });
      }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = postVideogames;
