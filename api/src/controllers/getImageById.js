const { Image } = require("../db");

async function getImageById(req, res) {
  try {
    const { filename } = req.params;
    const fullFilePath = global.appRoot + "/images/" + filename;
    return res.sendFile(fullFilePath);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = getImageById;
