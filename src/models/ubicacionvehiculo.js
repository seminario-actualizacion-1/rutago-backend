"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UbicacionVehiculo extends Model {
    static associate(models) {
      UbicacionVehiculo.belongsTo(models.Vehiculo, {
        foreignKey: "vehiculoId",
        as: "vehiculo",
      });
    }
  }
  UbicacionVehiculo.init(
    {
      vehiculoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      latitud: {
        type: DataTypes.DECIMAL(10, 8),
        allowNull: false,
      },
      longitud: {
        type: DataTypes.DECIMAL(11, 8),
        allowNull: false,
      },
      fechaHora: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "UbicacionVehiculo",
      tableName: "UbicacionesVehiculo",
    },
  );
  return UbicacionVehiculo;
};
