const getVideogames = require("./getVideogames");
const getVideogameById = require("./getVideogameById");
const getVideogamesByName = require("./getVideogamesByName");
const postVideogames = require("./postVideogames");
const getGenres = require("./getGenres");
const getPlatforms = require("./getPlatforms");

module.exports = {
  getVideogames,
  getVideogameById,
  getVideogamesByName,
  postVideogames,
  getGenres,
  getPlatforms,
};
