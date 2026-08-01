"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RutaBarrio extends Model {
    static associate(models) {
      RutaBarrio.belongsTo(models.Ruta, {
        foreignKey: "rutaId",
        as: "ruta",
      });
      RutaBarrio.belongsTo(models.Barrio, {
        foreignKey: "barrioId",
        as: "barrio",
      });
    }
  }
  RutaBarrio.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      rutaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      barrioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      orden: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "RutaBarrio",
      tableName: "RutaBarrio",
      indexes: [
        { unique: true, fields: ["rutaId", "barrioId"] },
      ],
    },
  );
  return RutaBarrio;
};
