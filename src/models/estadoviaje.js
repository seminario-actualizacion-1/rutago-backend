"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class EstadoViaje extends Model {
    static associate(models) {
      EstadoViaje.hasMany(models.Viaje, { foreignKey: "estadoId", as: "viajes" });
    }
  }
  EstadoViaje.init(
    {
      nombre: { type: DataTypes.STRING(30), allowNull: false, unique: true },
      descripcion: DataTypes.STRING(100),
    },
    { sequelize, modelName: "EstadoViaje", tableName: "EstadosViaje", timestamps: true },
  );
  return EstadoViaje;
};
