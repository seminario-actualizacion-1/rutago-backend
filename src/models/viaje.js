"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Viaje extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Viaje.belongsTo(models.Usuario, {
        foreignKey: "pasajeroId",
        as: "pasajero",
      });
      Viaje.belongsTo(models.Usuario, {
        foreignKey: "conductorId",
        as: "conductor",
      });
      Viaje.belongsTo(models.Barrio, {
        foreignKey: "barrioOrigenId",
        as: "barrioOrigen",
      });
      Viaje.belongsTo(models.Barrio, {
        foreignKey: "barrioDestinoId",
        as: "barrioDestino",
      });
    }
  }
  Viaje.init(
    {
      pasajeroId: DataTypes.INTEGER,
      conductorId: DataTypes.INTEGER,
      barrioOrigenId: DataTypes.INTEGER,
      barrioDestinoId: DataTypes.INTEGER,
      estado: DataTypes.STRING,
      precioEstimado: DataTypes.DECIMAL,
    },
    {
      sequelize,
      modelName: "Viaje",
      tableName: "Viajes",
    },
  );
  return Viaje;
};
