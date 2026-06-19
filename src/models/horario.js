"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Horario extends Model {
    static associate(models) {
      Horario.belongsTo(models.Vehiculo, { foreignKey: "vehiculoId", as: "vehiculo" });
      Horario.belongsTo(models.Ruta, { foreignKey: "rutaId", as: "ruta" });
    }
  }
  Horario.init(
    {
      vehiculoId: DataTypes.INTEGER,
      rutaId: DataTypes.INTEGER,
      horaSalida: DataTypes.TIME,
      frecuenciaMinutos: DataTypes.INTEGER,
      diasSemana: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Horario",
      tableName: "Horarios",
    }
  );
  return Horario;
};
