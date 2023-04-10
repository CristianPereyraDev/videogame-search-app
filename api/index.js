//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require("./src/app.js");
const { conn, Genre } = require("./src/db.js");
const { getGenresFromApi } = require("./src/utils/api.util");
const { removeFilesFromDir } = require("./src/utils/dir.util.js");

// Syncing all the models at once.
conn.sync({ force: true }).then(async () => {
  try {
    // Elimino las imagenes en caso de reiniciar toda la base de datos
    removeFilesFromDir(global.appRoot + "/images/");
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
