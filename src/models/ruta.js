"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Ruta extends Model {
    static associate(models) {
      Ruta.belongsTo(models.Comuna, { foreignKey: "origenId", as: "origen" });
      Ruta.belongsTo(models.Comuna, { foreignKey: "destinoId", as: "destino" });
      Ruta.belongsToMany(models.Barrio, { 
        through: "RutaBarrio", 
        foreignKey: "rutaId", 
        otherKey: "barrioId",
        as: "barrios"
      });
      Ruta.hasMany(models.Horario, { foreignKey: "rutaId", as: "horarios" });
    }
  }
  Ruta.init(
    {
      nombre: DataTypes.STRING,
      origenId: DataTypes.INTEGER,
      destinoId: DataTypes.INTEGER,
      descripcion: DataTypes.TEXT,
      distanciaKm: DataTypes.DECIMAL,
      tiempoEstimadoMinutos: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Ruta",
      tableName: "Rutas",
    }
  );
  return Ruta;
};
