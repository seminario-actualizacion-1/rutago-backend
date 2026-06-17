"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Barrio extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Barrio.belongsTo(models.Comuna, { foreignKey: "comunaId" });
      Barrio.hasMany(models.Viaje, {
        foreignKey: "barrioOrigenId",
        as: "viajesOrigen",
      });
      Barrio.hasMany(models.Viaje, {
        foreignKey: "barrioDestinoId",
        as: "viajesDestino",
      });
    }
  }
  Barrio.init(
    {
      nombre: DataTypes.STRING,
      comunaId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Barrio",
    },
  );
  return Barrio;
};
