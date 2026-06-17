"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comuna extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Comuna.hasMany(models.Barrio, { foreignKey: "comunaId" });
    }
  }
  Comuna.init(
    {
      nombre: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Comuna",
    },
  );
  return Comuna;
};
