const server = require("./src/app.js");
const { conn, Genre } = require("./src/db.js");
const { getGenresFromApi } = require("./src/utils/api.util");
const { removeFilesFromDir } = require("./src/utils/dir.util.js");

// Syncing all the models at once.
conn.sync({ force: true }).then(async () => {
  try {
    // Elimino las imagenes creadas
    removeFilesFromDir(__dirname + "/public/images/");
    // Syncing database with api
    console.log("Searching genres from api...");
    const genresFromApi = await getGenresFromApi();
    const genresToBulk = genresFromApi.map((genre) => {
      return { id: genre.id, name: genre.name };
    });
    console.log("Saving genres in database...");
    await Genre.bulkCreate(genresToBulk);
    server.listen(3001, () => {
      console.log("%s listening at 3001"); // eslint-disable-line no-console
    });
  } catch (error) {
    console.log(error.message);
  }
});
