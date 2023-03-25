const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("Videogame", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
