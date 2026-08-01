"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Horario extends Model {
    static associate(models) {
      Horario.belongsTo(models.Ruta, { foreignKey: "rutaId", as: "ruta" });
    }
  }
  Horario.init(
    {
      rutaId: { type: DataTypes.INTEGER, allowNull: false },
      horaSalida: { type: DataTypes.TIME, allowNull: false },
      frecuenciaMinutos: DataTypes.INTEGER,
      diasSemana: DataTypes.STRING,
      fechaInicio: DataTypes.DATEONLY,
      fechaFin: DataTypes.DATEONLY,
    },
    {
      sequelize,
      modelName: "Horario",
      tableName: "Horarios",
    },
  );
  return Horario;
};
