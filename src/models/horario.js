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
      vehiculoId: { type: DataTypes.INTEGER, allowNull: false },
      rutaId: { type: DataTypes.INTEGER, allowNull: false },
      horaSalida: { type: DataTypes.TIME, allowNull: false },
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
