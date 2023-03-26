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

// Syncing all the models at once.
conn.sync({ force: true }).then(async () => {
  try {
    // Syncing database with api
    console.log("Searching genres from api...");
    const genresFromApi = await getGenresFromApi();
    console.log("Searching genres from database...");
    let genresFromDB = await Genre.findAll();
    if (genresFromApi.length !== genresFromDB.length) {
      const genresToBulk = genresFromApi.map((genre) => {
        return { id: genre.id, name: genre.name };
      });
      console.log("Updatating database...");
      await Genre.bulkCreate(genresToBulk);
    }
    server.listen(3001, () => {
      console.log("%s listening at 3001"); // eslint-disable-line no-console
    });
  } catch (error) {}
});
