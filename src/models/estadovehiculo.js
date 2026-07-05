"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class EstadoVehiculo extends Model {
    static associate(models) {
      EstadoVehiculo.hasMany(models.Vehiculo, { foreignKey: "estadoId", as: "vehiculos" });
    }
  }
  EstadoVehiculo.init(
    {
      nombre: { type: DataTypes.STRING(30), allowNull: false, unique: true },
    },
    { sequelize, modelName: "EstadoVehiculo", tableName: "EstadosVehiculo", timestamps: true },
  );
  return EstadoVehiculo;
};
