const fs = require("fs");

var folder = "./images/";

function removeFilesFromDir(folder) {
  fs.readdir(folder, (err, files) => {
    if (err) throw err;

    for (const file of files) {
      fs.unlinkSync(folder + file);
    }
    console.log("Files Deleted Successfully.");
  });
}

module.exports = { removeFilesFromDir };
