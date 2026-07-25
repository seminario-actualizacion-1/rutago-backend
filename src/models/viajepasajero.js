"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ViajePasajero extends Model {
    static associate(models) {
      ViajePasajero.belongsTo(models.Viaje, {
        foreignKey: "viajeId",
        as: "viaje",
      });
      ViajePasajero.belongsTo(models.Usuario, {
        foreignKey: "pasajeroId",
        as: "pasajero",
      });
    }
  }
  ViajePasajero.init(
    {
      viajeId: { type: DataTypes.INTEGER, allowNull: false },
      pasajeroId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: "ViajePasajero",
      tableName: "ViajePasajeros",
    },
  );
  return ViajePasajero;
};
